export interface GetRfqQuoteRequest {
  ticker: string;
  accountId: string;
  tradeSide: 'buy' | 'sell';
  deliverQuantity: string; // NOTE: specify either deliverQuantity or receiveQuantity.
  receiveQuantity: string; // NOTE: specify either deliverQuantity or receiveQuantity.
}

export interface GetRfqQuoteResponse {
  type: 'rfqGetQuoteAck';
  data: RfqQuoteData;
}

export interface RfqQuoteData {
  accountId: string;
  quoteId: string;
  symbol: string;
  side: 'buy' | 'sell';
  receiveCurrency: string;
  deliverCurrency: string;
  quoteTime: number; 
  expireTime: number; 
  deliverQuantity: string;
  receiveQuantity: string;
  price: string;
}
