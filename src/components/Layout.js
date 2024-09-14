// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header className="fixed w-full top-0 z-10" />
      <div className="flex-grow mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
