import { RouteObject } from "react-router-dom";
import AppLayout from "../components/layouts";
import NoLayout from "../components/layouts/no-layout";
import Error404 from "../pages/error/Error404";
import Error500 from "../pages/error/Error500";
import Home from "../pages/home";
import Signin from "../pages/signin";
import AddProduct from "../pages/addProduct";
import ListProduct from "../pages/listProductUser/index";
// import ListProduct from "../pages/addProduct/listProduct";
export const routerDefault: Array<RouteObject> = [
  {
    path: "/error",
    element: <NoLayout />,
    children: [
      { path: "/error/404", element: <Error404 /> },
      { path: "/error/500", element: <Error500 /> },
    ],
  },

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
        path: "/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/listproduct",
        element: <ListProduct />,
      },
    ],
  },
  { path: "*", element: <Error404 /> },
];
