import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { IProfile } from "../../interface/IUser";
import { getProfile, useGetProfile } from "../../services/auth/authen/authen";
type AuthContextProps = {
  profile?: IProfile;
};

type AuthProps = {
  children?: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider: FC<AuthProps> = ({ children }) => {
  const token = getToken();
  const { pathname } = useLocation();
  const [profile, setProfile] = React.useState<Partial<IProfile>>({});
  const isPublic = pathname === "/login";
  React.useEffect(() => {
    (async () => {
      const res = await getProfile().then((res) => {
        setProfile({
          ...res,
        });
      });
    })();
  }, []);

  if (!token && !isPublic && pathname !== "/register") {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthContext.Provider value={{ profile }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
