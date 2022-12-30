export interface CustomerInfomation {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes: string;
  created: string;
  modified: string;

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
