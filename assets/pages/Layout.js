import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header handleChange={handleChange} />
      <Outlet context={[searchTerm, setSearchTerm]} />
    </>
  );
};
