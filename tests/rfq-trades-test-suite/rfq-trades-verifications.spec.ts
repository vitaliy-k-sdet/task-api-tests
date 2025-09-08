import { test, expect } from '@playwright/test';
import { rfqApiOperations } from '../../src/helpers/api-rfq-operations';

test.describe.parallel('RFQ Trades API:', () => {
  test('Create quote, execute quote, verify order appears', async () => {
    const symbol = 'BTC-USD';
    const accountId = 'CA1001366C';
    const tradeSide = 'buy';
    const deliverQuantity = '100';
    const usernameRef = `${accountId}-testUser`;

    const quoteResponse = await rfqApiOperations.createQuote({
      ticker: symbol,
      accountId,
      tradeSide,
      deliverQuantity,
      usernameRef,
    });

    const quoteData = quoteResponse.data;

    expect.soft(quoteData.quoteId).toBeDefined();
    expect.soft(quoteData.symbol).toBe(symbol);
    expect.soft(quoteData.side).toBe(tradeSide);
    expect.soft(quoteData.deliverCurrency).toBe('USD');
    expect.soft(quoteData.deliverQuantity).toBe('100.00');
    expect.soft(quoteData.receiveCurrency).toBe('BTC');

    const executedQuote = await rfqApiOperations.executeQuote({ quoteId: quoteData.quoteId });

    expect.soft(executedQuote).toHaveProperty('type', 'rfqExecuteQuoteAck');
    expect.soft(executedQuote.data.quoteId).toBe(quoteData.quoteId);

    const orders = await rfqApiOperations.getOrders();

    expect.soft(orders.length).toBeGreaterThan(0);
    expect.soft(orders[0].orderId).toBeDefined();
    expect.soft(orders[0].username).toBe('qa_take_home') //There is no quoteId in order's response, so checking for username
  });

  test('Creating quote with invalid tradeSide should fail', async () => {
    await expect.soft(async () => {
      await rfqApiOperations.createQuote({
        ticker: 'BTC-USD',
        accountId: 'CA1001366C',
        tradeSide: 'sell', // Wrong tradeSide value
        deliverQuantity: '100',
        usernameRef: 'testUser',
      });
    }).rejects.toThrow(/CreateQuote failed/);
  });

  test('Executing quote after expiration timeout should return expiration error', async () => {
    test.fail(true, 'This test is expected to fail due to quote expiration handling might be broken?');
  const quote = await rfqApiOperations.createQuote({
    ticker: 'BTC-USD',
    accountId: 'CA1001366C',
    tradeSide: 'buy',
    deliverQuantity: '50',
    usernameRef: 'testUser',
  });

  const quoteId = quote.data.quoteId;
  
  await new Promise(r => setTimeout(r, 10_000)); // TO-DO: Wrap with asyncRetry instead of arbitrary timeout! Just for Demo purpose.
  
  const response = await rfqApiOperations.executeQuote({ quoteId });
  
  expect.soft(response, "Quote didn't expire after 8 sec timeout!!!").toContain('The quote has already expired');
});


  test('Executing with invalid quoteId should fail', async () => {
    await expect.soft(async () => {
      await rfqApiOperations.executeQuote({ quoteId: 'invalid-id-123' });
    }).rejects.toThrow(/ExecuteQuote failed/);
  });

  test('Executing same quote twice', async () => {
    const quote = await rfqApiOperations.createQuote({
      ticker: 'BTC-USD',
      accountId: 'CA1001366C',
      tradeSide: 'buy',
      deliverQuantity: '200',
      usernameRef: 'testUser',
    });
    const quoteId = quote.data.quoteId;

    // Run two executeQuote calls concurrently
    const [res1, res2] = await Promise.allSettled([
      rfqApiOperations.executeQuote({ quoteId }),
      rfqApiOperations.executeQuote({ quoteId }),
    ]);

    // Expect 1st to succeed
    const oneSucceeded = [res1, res2].some(r => r.status === 'fulfilled');
    expect.soft(oneSucceeded).toBeTruthy();

    // Expect 2nd to fail
    const oneFailed = [res1, res2].some(r => r.status === 'rejected');
    expect.soft(oneFailed).toBeTruthy();
  });
});
