export type OrderStrategy = 'LIMIT' | 'GTC' | 'GTD';

export interface CreateLimitOrderRequest {
  strategy: OrderStrategy;           
  accountId: string;
  ticker: string;                   
  tradeSide: 'buy' | 'sell';
  priceLimit: string;                
  deliverQuantity?: string;          
  receiveQuantity?: string;
  expirationTime?: number;          
  usernameRef?: string;             
}

export interface CreateLimitOrderResponse {
  type: 'limitOrderAck';
  data: LimitOrderData;
}

export interface LimitOrderData {
  accountId: string;
  quoteId: string;
  quoteTime: number;               
  expireTime: number;              
  ticker: string;
  tradeSide: 'buy' | 'sell';
  receiveCurrency: string;
  receiveQuantity: string;
  deliverCurrency: string;
  deliverQuantity: string;
  price: string;                  
}
