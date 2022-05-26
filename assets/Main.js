import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blogs } from "./components/Blogs";
import { CreateBlog } from "./components/CreateBlog";
import { SingleBlog } from "./components/SingleBlog";
import { Layout } from "./pages/Layout";

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Blogs />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDom.createRoot(document.querySelector("#app"));
root.render(<Main />);
