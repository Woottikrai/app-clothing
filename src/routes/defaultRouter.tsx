import { RouteObject } from "react-router-dom";
import AppLayout from "../components/layouts";
import NoLayout from "../components/layouts/no-layout";
import Error404 from "../pages/error/Error404";
import Error500 from "../pages/error/Error500";
import Home from "../pages/home";
import Signin from "../pages/signin";
import AddProduct from "../pages/addProduct";
import Cart from "../pages/cart";
import ListProduct from "../pages/listProductUser";
import Register from "../pages/register"
import ListProdcutAdmin from "../pages/listProductAdmin"
import EditProduct from "../pages/editproduct";
import OrderAdmin from "../pages/orderadmin";
import OrderHistory from "../pages/orderlist";
import OrderList from "../pages/orderlist";
import OrderHistoryAdmin from "../pages/orderHistoryAdmin";
export const routerDefault: Array<RouteObject> = [
  {
    path: "/error",
    element: <NoLayout />,
    children: [
      { path: "/error/404", element: <Error404 /> },
      { path: "/error/500", element: <Error500 /> },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Signin /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/orderlist",
        element: <OrderList />
      },
      {
        path: "/listproduct",
        element: <ListProduct />,
      },
      {
        path: "/cartproduct",
        element: <Cart />,
      },
    ],
  },


  //admin
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/listproductadmin",
        element: <ListProdcutAdmin />
      },
      {
        path: "/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/listorderadmin",
        element: <OrderAdmin />
      },
      {
        path: "/editproduct/:id",
        element: <EditProduct />
      },
      {
        path: "/cartproduct",
        element: <Cart />,
      },
      {
        path: "/orderhistoryadmin",
        element: <OrderHistoryAdmin />,
      },
    ],
  },
  { path: "*", element: <Error404 /> },



  // { path: "/listproductadmin", element: <ListProdcutAdmin /> },
  // { path: "/editproduct/:id", element: <EditProduct /> },

  // { path: "/listorderadmin", element: <OrderAdmin /> },
  // { path: "/orderhistory", element: <OrderHistory /> }
];
