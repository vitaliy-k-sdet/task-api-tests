export interface ExecuteRfqQuoteRequest {
  quoteId: string;  
}

export interface ExecuteRfqQuoteResponse {
  type: 'rfqExecuteQuoteAck';
  data: RfqExecuteQuoteData;
}

export interface RfqExecuteQuoteData {
  accountId: string;
  quoteId: string;
  tradeDate: string;
  valueDate: string; 
}
