export interface IProduct {
  id?: number;
  name?: string;
  detail?: string;
  price?: number;
  img?: string;

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
