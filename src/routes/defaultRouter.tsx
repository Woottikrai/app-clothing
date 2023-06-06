import { RouteObject } from "react-router-dom";
import DefaultLayout from "../components/layouts";
import NoLayout from "../components/layouts/no-layout";
import Error404 from "../pages/error/Error404";
import Error500 from "../pages/error/Error500";
import Home from "../pages/home";
import Signin from "../pages/signin";

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
  { path: "/", element: <DefaultLayout /> },
  { path: "/home", element: <Home /> },
  { path: "*", element: <Error404 /> },
];
