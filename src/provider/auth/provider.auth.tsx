import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
type AuthContextProps = {};

type AuthProps = {
  children?: React.ReactNode;
};

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider: FC<AuthProps> = ({ children }) => {
  const token = getToken();
  const { pathname } = useLocation();
  const isPublic = pathname === "/login";

  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
