import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice/categorySlice";
import orderSlice from "./orderSlice/OrderSlice";
import productSlice from "./productSlice/ProductSlice";
import usersSlice from "./userSlice/usersSlice";
export default configureStore({
  reducer: {
    order: orderSlice,
    product: productSlice,
    users: usersSlice,
    category: categorySlice,
  },
});
