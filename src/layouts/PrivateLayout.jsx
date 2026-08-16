import React from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <>
      <PrivateNavbar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
