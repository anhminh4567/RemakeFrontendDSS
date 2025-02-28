export interface BillingDetail {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  providence: string;
  district: string;
  ward: string;
  address: string;
  note?: string;
}

export interface OrderRequest {
  paymentType: number;
  paymentId: string;
  paymentName: string;
  promotionId?: string;
  isTransfer: boolean;
  isAtShop?: boolean;
}

export interface OrderItemRequest {
  jewelryId?: string;
  diamondId?: string;
  engravedText?: string;
  engravedFont?: string;
  warrantyCode: string;
  warrantyType: number;
}

export interface CreateOrderInfo {
  orderRequestDto: OrderRequest;
  orderItemRequestDtos: OrderItemRequest[];
}

export interface CheckoutRequest {
  billingDetail: BillingDetail;
  createOrderInfo: CreateOrderInfo;
}
