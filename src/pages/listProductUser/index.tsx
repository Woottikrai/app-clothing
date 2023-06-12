import React, { FC } from "react";
import { IProduct } from "../../interface/IProduct";
import { useNavigate } from "react-router-dom";
import { initParams } from "../../config/axios/interface";
import { useGetProductAll } from "../../services/auth/product/product.axios";
import OptionalLayout from "../../components/layouts/optionalLayout";

export default function CardProduct(product: IProduct) {
  const navigate = useNavigate();
  const [params, setParams] = React.useState<any>(initParams);
  const { data: getProductAll } = useGetProductAll(params);

  interface cardProductUser extends IProduct {}

  const CardProductUser: FC<{
    product?: cardProductUser;
    onClick: () => void;
  }> = ({ product }) => {
    return (
      <React.Fragment>
        <div key={product?.id}>
          <div className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
              <img
                src={product?.img}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative mt-4">
              <h3 className="text-sm font-medium text-gray-900">
                {product?.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                สี{product?.color?.color_name}
              </p>
            </div>
            <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
              />
              <p className="relative text-lg font-semibold text-white">
                {product?.price}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <a
              href={product?.img}
              className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
            >
              Add to bag<span className="sr-only">, {product?.name}</span>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">
          Customers also bought
        </h2>

        <OptionalLayout
          items={getProductAll}
          className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          renderItem={({
            item,
            key,
          }: {
            item: IProduct;
            key: string | number;
          }) => (
            <CardProductUser
              product={item}
              key={key}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          )}
        />
      </div>
    </div>
  );
}
