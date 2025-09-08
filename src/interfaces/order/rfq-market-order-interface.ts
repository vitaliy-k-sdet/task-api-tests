export interface CreateMarketOrderRequest {
  ticker: string;              
  tradeSide: 'buy' | 'sell';   
  accountId: string;          
  deliverQuantity: string;     //NOTE: specify either deliverQuantity or receiveQuantity.
  receiveQuantity: string;     //NOTE: specify either deliverQuantity or receiveQuantity.
  usernameRef?: string;      
}

export interface CreateMarketOrderResponse {
  type: 'marketOrderSubmitAck';
  data: MarketOrderData;
}

export interface MarketOrderData {
  accountId: string;
  orderId: string;
  receiveCurrency: string;
  receiveQuantity: string;
  deliverCurrency: string;
  deliverQuantity: string;
  fee: string;
  tradeDate: string;           
  valueDate: string;          
  tradePriceAvg: string;
}
