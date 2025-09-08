export interface ExpireRfqQuoteRequest {
  quoteId: string; 
}

export interface ExpireRfqQuoteResponse {
  type: 'rfqExpireQuoteAck';
  payload: {
    quoteId: string;
  };
}
