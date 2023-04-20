import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { SharedLayout } from "../components/layouts/primary-layout/header/SharedLayout";
import { Home } from "../pages/home/Home";
import { ProductDetail } from "../pages/home/product-detail/ProductDetail";
import { BasketShopping } from "../pages/basket-shopping/BasketShopping";
import { Sidebar } from "../pages/home/sidebar/Sidebar";
import { FormFinalize } from "../pages/basket-shopping/FormFinalize/FormFinalize";
import { Bank } from "../components/fishing/Bank";
import { AdminAuth } from "../pages/adminLogin/AdminAuth";
import { ContentOrders } from "../pages/admin/ContentOrders";
import { ContentProducts } from "../pages/admin/ContentProducts";
import { ContentStock } from "../pages/admin/ContentStock";
import { AdminLayout } from "../pages/admin/AdminLayout";
import { Error } from "../pages/error/Error";
import { WlcAdmin } from "../pages/admin/WlcAdmin";
import { Provider } from "react-redux";
import store from "../redux/Store";
import { injectStore } from "../api/http";
injectStore(store);

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Provider store={store}>
      <AnimatePresence>
        <Routes
          location={location}
          key={location.pathname}
          className="elements"
        >
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="ProductDetail" element={<ProductDetail />}>
              <Route path=":userId" />
            </Route>
            <Route path="basket" element={<BasketShopping />} />
            <Route path="*" element={<Error />} />
            <Route path="sidebar" element={<Sidebar />}>
              <Route path=":userId" />
            </Route>
            <Route path="formFinalize" element={<FormFinalize />} />
            <Route path="bank" element={<Bank />} />
          </Route>
          <Route element={<AdminAuth />}>
            <Route path="login" element={<AdminAuth />} />
          </Route>

          <Route path="panel" element={<AdminLayout />}>
            <Route index element={<WlcAdmin />} />
            <Route path="order" element={<ContentOrders />} />
            <Route path="stocks" element={<ContentStock />} />
            <Route path="products" element={<ContentProducts />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Provider>
  );
};
