export interface CustomerInfomation {
  id: number;
  name: string;
  email: string;
  status: number;
  createdAt: string;
  updatedAt: string;

  [key: string]: unknown;
}

export interface ProductInfomation {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
  created: string;
  modified: string;

  [key: string]: unknown;
}
