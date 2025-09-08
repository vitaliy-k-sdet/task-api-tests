import { APIRequestContext, APIResponse } from '@playwright/test';
import apiUrlProvider from '../config/url-provider';
import { apiAuthRequest } from './api-auth-client';

import { CreateRfqQuoteRequest, CreateRfqQuoteResponse } from '../interfaces/quote/rfq-create-quote-interface';
import { ExecuteRfqQuoteRequest, ExecuteRfqQuoteResponse } from '../interfaces/quote/rfq-execute-quote-interface';
import { GetOrdersRequestResponse, OrdersV2Response} from '../interfaces/order/rfq-get-orders-interface';

/**
 * Sends a POST request to create an RFQ quote.
 *
 * @param body - The request payload containing quote creation parameters.
 * @returns A Promise resolving to the response containing quote details.
 * @throws Error if the API call fails or returns a non-2xx response.
 */
async function createQuote(body: CreateRfqQuoteRequest): Promise<CreateRfqQuoteResponse> {
  const path = apiUrlProvider.rfq.createQuoteV2();
  const context: APIRequestContext = await apiAuthRequest(path, 'POST');

  const response: APIResponse = await context.post(path, { data: body });

  const responseText = await response.text(); 
  await context.dispose();

  if (!response.ok()) throw new Error(`CreateQuote failed: ${response.status()} ${responseText}`);
  return JSON.parse(responseText) as CreateRfqQuoteResponse;
}


/**
 * Sends a POST request to execute a previously created RFQ quote.
 *
 * @param body - The request payload containing the quoteId to execute.
 * @returns A Promise resolving to the response containing execution acknowledgment.
 * @throws Error if the API call fails or returns a non-2xx response.
 */
async function executeQuote(body: ExecuteRfqQuoteRequest): Promise<ExecuteRfqQuoteResponse> {
  const path = apiUrlProvider.rfq.executeQuoteV2();
  const context: APIRequestContext = await apiAuthRequest(path, 'POST');

  const response: APIResponse = await context.post(path, { data: body });

  const responseText = await response.text();
  await context.dispose();

  if (!response.ok()) throw new Error(`ExecuteQuote failed: ${response.status()} ${responseText}`);
  return JSON.parse(responseText) as ExecuteRfqQuoteResponse;
}

/**
 * Sends a GET request to fetch the list of RFQ orders.
 *
 * @returns A Promise resolving to an array of order objects from the response.
 * @throws Error if the API call fails or returns a non-2xx response.
 */
async function getOrders(): Promise<GetOrdersRequestResponse[]> {
  const path = apiUrlProvider.orders.orderV2();
  const context: APIRequestContext = await apiAuthRequest(path, 'GET');

  const response: APIResponse = await context.get(path);

  const responseText = await response.text();
  await context.dispose();

  if (!response.ok()) throw new Error(`GetOrders failed: ${response.status()} ${responseText}`);
  const json: OrdersV2Response = JSON.parse(responseText);
  return json.data as GetOrdersRequestResponse[];
}

export const rfqApiOperations = {
  createQuote,
  executeQuote,
  getOrders,
};
