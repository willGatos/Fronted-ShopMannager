import React from "react";
import { useLocation } from "react-router-dom";
import HeaderLogged from "components/Header/HeaderLogged";
import Header from "components/Header/Header";

const SiteHeader = ({ logo }) => {
  let location = useLocation();

  return location.pathname === "/home2" ? (
    <Header />
  ) : (
    <HeaderLogged logo={logo} />
  );
};

export default SiteHeader;
