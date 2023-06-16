import projectConfig from "../../config/project.config";

export const endpoints = {
  product: {
    getSizeAll: `${projectConfig.baseURL}/size-all`,
    getSuitabilityAll: `${projectConfig.baseURL}/suitability-all`,
    getProducttypeAll: `${projectConfig.baseURL}/producttype-all`,
    getColorAll: `${projectConfig.baseURL}/color-all`,
    getProducrtAll: `${projectConfig.baseURL}/product/find-all`,
    addProduct: `${projectConfig.baseURL}/product/add-product`,
    getProductAll: `${projectConfig.baseURL}/product/find-all`,
    getDeleteProduct: `${projectConfig.baseURL}`,
  },

  user: {
    login: `${projectConfig.baseURL}/authentication/siginin`,
    register: `${projectConfig.baseURL}/user/register`,
    profile: `${projectConfig.baseURL}/authentication/profile`,
    updateUser: `${projectConfig.baseURL}/user/update`,
    updatePssword: `${projectConfig.baseURL}/user/update-password`,
  },

  cart: {
    addToCart: `${projectConfig.baseURL}/add-to-cart`,
    getCartByUser: `${projectConfig.baseURL}/cart`,
    deleteCart: `${projectConfig.baseURL}/delete-from-cart`,
  },
};

export default endpoints;
