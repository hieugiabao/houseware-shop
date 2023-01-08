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
  categories: Category[];

  [key: string]: unknown;
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
