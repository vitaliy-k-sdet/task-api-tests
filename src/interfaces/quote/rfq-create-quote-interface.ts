export interface CreateRfqQuoteRequest {
  ticker: string;              
  accountId: string;           
  tradeSide: 'buy' | 'sell';    
  deliverQuantity?: string;  //NOTE: specify either deliverQuantity or receiveQuantity.   
  receiveQuantity?: string;  //NOTE: specify either deliverQuantity or receiveQuantity.
  usernameRef?: string;         
}

export interface CreateRfqQuoteResponse {
  type: 'rfqCreateQuoteAck';
  data: RfqCreateQuoteData;
}

export interface RfqCreateQuoteData {
  accountId: string;
  quoteId: string;
  symbol: string;              
  side: 'buy' | 'sell';
  receiveCurrency: string;
  deliverCurrency: string;
  quoteTime: number;           
  expireTime: number;          
  price: string;               
  deliverQuantity: string;
  receiveQuantity: string;
}
