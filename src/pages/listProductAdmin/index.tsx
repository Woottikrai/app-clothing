import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Container from '../../components/container'
import productApi, { getProductAll, useDeleteProduct, useGetProductAll, } from '../../services/auth/product/product.axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import authenApi from '../../services/auth/authen/authen';
import { QueryClient, useQueryClient } from 'react-query';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';




export default function ListProductAdmin() {
  const qClient = useQueryClient();
  const { data: products } = useGetProductAll();
  const navigate = useNavigate()

  const deleteProduct = useDeleteProduct()
  const onDelete = (id?: number) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        qClient.invalidateQueries(["get-all"]);
      }
    })
  }


  return (
    <Container>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.data?.map((product) => (
          <li
            key={product.name}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={product.img} alt="" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{product.name}</h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{product.detail}</dd>
                <dd className="text-sm text-gray-500"> สี {product.color?.color_name}</dd>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    <p>ไซต์ {product.size?.size_name}</p>
                  </span>
                </dd>
              </dl>
            </div>

            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1" onClick={() => navigate(`/editproduct/${product.id}`)}>
                  <a

                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <EditOutlined className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    แก้ไขสินค้า
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1" onClick={() => onDelete(product?.id)}>

                  <a
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >

                    <DeleteOutlined className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    ลบสินค้า

                  </a>


                </div>
              </div>
            </div>
          </li>
        ))}
      </ul></Container>

  )
}
