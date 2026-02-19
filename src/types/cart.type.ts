import { Product } from "./product.type";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

export interface CheckoutFormValues {
  address: string;
  phone: string;
}

export interface OrderData {
  customerId: string;
  shippingAddress: string;
  phone: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    selectedSize: string;
  }[];
  totalAmount: number;
  transactionId?: string;
}