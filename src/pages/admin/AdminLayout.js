import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderSecond } from "../../components/layouts/secondary-layout/header/HeaderSecond";

export const AdminLayout = () => {
  return (
    <div>
      <HeaderSecond />
     
      <Outlet />
    </div>
  );
};
