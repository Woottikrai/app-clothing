import "./assets/css/app.css";
import "./assets/css/index.css";
import { ConfigProvider } from "antd";
import routes from "./routes/_routes";
import { StyleProvider } from "@ant-design/cssinjs";
import { useRoutes, HashRouter } from "react-router-dom";
import { AuthProvider } from "./provider/auth/provider.auth";
import { QueryClient, QueryClientProvider } from "react-query";

const AppRoute = () => {
  const appRoute = useRoutes(routes);
  return appRoute;
};

const client = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 0 },
  },
});
function App() {
  return (
    <QueryClientProvider client={client}>
      <HashRouter>
        <ConfigProvider
          theme={{
            token: { colorPrimary: "#E7C98D" },
          }}
        >
          <StyleProvider hashPriority="high">
            <AuthProvider>
              <AppRoute />
            </AuthProvider>
          </StyleProvider>
        </ConfigProvider>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
