export interface CreateFokOrderRequest {
  strategy: 'FOK';            
  accountId: string;          
  ticker: string;            
  tradeSide: 'buy' | 'sell';  
  receiveQuantity: string;   // NOTE: specify either receiveQuantity or deliverQuantity. 
  deliverQuantity: string;   // NOTE: specify either receiveQuantity or deliverQuantity.
  tradePrice: string;        
  usernameRef?: string;       
}

export interface CreateFokOrderResponse {
  type: 'parentOrderSubmitAck';
  data: FokOrderData;
}

export interface FokOrderData {
  accountId: string;
  orderId: string;
  receiveCurrency: string;
  receiveQuantity: string;
  deliverCurrency: string;
  deliverQuantity: string;
  fee: string;
  tradeTime: number;       
  symbol: string;          
  tradeStatus: string;     
  price: string;           
  tradeDate: string;       
  valueDate: string;       
}
