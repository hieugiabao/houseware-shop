export interface TimeStamp {
  createdAt: string;
  updatedAt: string;
}
export interface CustomerInfomation {
  id: number;
  name: string;
  email: string;
  status: number;
  createdAt: string;
  updatedAt: string;

  [key: string]: unknown;
}

export interface Product extends TimeStamp {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
  thumb: string;
  status: number;
  weight: number;
  massUnit: string;
  slug: string;
  salePrice?: number;
  salePercentage?: number;
  productAttributes: ProductAttribute[];
  categories?: Category[];
  images?: ProductImage[];

  [key: string]: unknown;
}

export interface ProductImage {
  id: number;
  src: string;
}

export interface Attribute {
  id: number;
  name: string;
  values: AttributeValue[];

  [key: string]: unknown;
}

export interface AttributeValue extends TimeStamp {
  id: number;
  value: string;
  attribute: Attribute;

  [key: string]: unknown;
}

export interface ProductAttribute extends TimeStamp {
  id: number;
  quantity: number;
  price: number;
  salePrice: number;
  default: boolean;
  attributesValues: AttributeValue[];
}

export interface Category extends TimeStamp {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumb: string;
  status: number;
  parentId: number | null;
  products: Product[];

  [key: string]: unknown;
}

export interface CartItem {
  rowId: string;
  id: number;
  name: string;
  qty: number;
  price: number;
  tax: number;
  isSaved: boolean;
  thumb: string;
  subtotal: number;
  options: any[];

  [key: string]: unknown;
}

export interface Cart {
  cartItems: CartItem[];
  subTotal: number;
  tax: number;
  total: number;
}

export interface Address extends TimeStamp {
  id: string;
  alias: string;
  address_1: string;
  address_2: string;
  city: string;
  zip: string;
  provinceId: number;
  customerId: number;
  deletedAt: string;
}

export interface Province extends TimeStamp {
  id: number;
  name: string;
}
