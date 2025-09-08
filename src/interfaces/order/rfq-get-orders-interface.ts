export interface Pagination {
  startsAfter: string | null;
}

export interface GetOrdersRequestResponse {
  orderId: string;
  tradeTime: number;
  tradeSide: 'buy' | 'sell';
  tradeSize: number;
  strategy: string;
  symbol: string;
  fillPct: number;
  tradePriceAvg: string;
  tradeStatus:
    | 'CREATE'
    | 'AWAITING'
    | 'CANCEL_PENDING'
    | 'COMPLETE'
    | 'PARTIAL_COMPLETE'
    | 'EXPIRED'
    | 'CANCELLED'
    | 'ERROR';

  fillQtyQuote: number;
  fillQtyBase: number;
  expirationTime?: number;
  baseSymbol?: string;
  quoteSymbol?: string;
  remainingQtyBase?: number;
  remainingQtyQuote?: number;
  orderType?: string;
  message?: string;
  createdAt?: number;
  updatedAt?: number;
  tradeDuration?: number;
  commissionRate?: number;
  fillFeeQuoteAqua?: number;
  username?: string;
  usernameRef?: string;
  priceLimit?: number;
}

export interface OrdersV2Response {
  data: GetOrdersRequestResponse[];
  pagination: Pagination;
}
