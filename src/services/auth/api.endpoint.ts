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
    deleteProduct: `${projectConfig.baseURL}/product/delete`,
    updateProduct: `${projectConfig.baseURL}/product/update`,
    getProducrOne: `${projectConfig.baseURL}/product/find-one`,
  },

  user: {
    login: `${projectConfig.baseURL}/authentication/siginin`,
    register: `${projectConfig.baseURL}/user/register`,
    profile: `${projectConfig.baseURL}/authentication/profile`,
    updateUser: `${projectConfig.baseURL}/user/update`,
    updatePssword: `${projectConfig.baseURL}/user/update-password`,
    getUserOne: `${projectConfig.baseURL}/user/fine-one`,
  },

  cart: {
    addToCart: `${projectConfig.baseURL}/add-to-cart`,
    getCartByUser: `${projectConfig.baseURL}/cart`,
    deleteCart: `${projectConfig.baseURL}/delete-from-cart`,
    cartConfirm: `${projectConfig.baseURL}/cart-confirm`, //user กดสั่งซื้อจาก cart patch
    cartSuccess: `${projectConfig.baseURL}/cart-success`, //admin กดยืนยันการสั่งซื้อ
    orderHistory: `${projectConfig.baseURL}/orderhistory`, //คำสั่งซื้อ user
    OrderAdmin: `${projectConfig.baseURL}/cart-for-admin`,
    orderAdmin: `${projectConfig.baseURL}/user/Order-list`,
    oderHistoryAdmin: `${projectConfig.baseURL}/order-history-admin`,
    deleteOrder: `${projectConfig.baseURL}/delete-order`, //ลบคำสั่งซื่อ statusid2
    uploadSlip: `${projectConfig.baseURL}/upload-slip`,
  },
};

export default endpoints;
