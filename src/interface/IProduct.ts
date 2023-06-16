export interface IProduct {
  id?: number;
  name?: string;
  detail?: string;
  price: number;
  img?: string;
  idx?: number | string;
  sizeId?: number;
  size?: ISize;

  producttype?: IProducttype;
  producttypeId?: number;

  suitability?: ISuitability;
  suitabilityId?: number;

  color?: IColor;
  colorId?: number;

  stockId?: number;
  stock?: IStock;

  cartId?: number;
}

export interface ISize {
  id: number;
  size_name: string;
}

export interface IProducttype {
  id: number;
  producttype_name: string;
}

export interface ISuitability {
  id: number;
  suitability_name: string;
}

export interface IColor {
  id: number;
  color_name: string;
}

export enum Color {
  red = "red",
  orange = "orange",
  yellow = "yellow",
}

export const useColor = [
  { id: 1, color: Color.red },
  { id: 2, color: Color.orange },
  { id: 3, color: Color.yellow },
];

export interface IStock {
  id: number;
  stock_name: string;
}

export interface IProductResult {
  data: IProduct[];
  count: number;
  page: number;
  limit: number;
  pageCount: number;
}
