import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useOutletContext();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("/spa/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }
  console.log(blogs);

  return (
    <div className="cards">
      {blogs
        .filter((blog) => {
          if (searchTerm === "") {
            return blog;
          } else if (
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return blog;
          }
        })
        .map((blog, i) => {
          return (
            <div className="card" key={i}>
              <div className="card-body">
                <h1 className="card-title">
                  <b>{blog.title}</b>
                </h1>
                <b className="card-subtitle">by: {blog.author}</b>
                <em className="card-text">{blog.blogpost.slice(0, 100)}...</em>
                <p>{blog.blogDate.date.slice(0, 11)}</p>
                <Link className="card-link" to={`/blogs/${blog.id}`}>
                  read more
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};
