const baseUrl = process.env.BASE_URL;

const apiUrlProvider = {
  baseUrl,

  rfq: {
    getQuoteV2: () => '/trades/v2/getQuote',
    createQuoteV2: () => '/trades/v2/createQuote',
    executeQuoteV2: () => '/trades/v2/executeQuote',
    expireQuoteV2: () => '/trades/v1/expireQuote',
  },

  orders: {
    marketV2: () => '/trades/v2/market',
    orderV2: () => '/trades/v2/order', 
  },

  user: {
    userBalanceV1: () => '/users/v1/userbalance', 
  },
};

export default apiUrlProvider;
