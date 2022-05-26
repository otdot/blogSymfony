import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CreateBlog = () => {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    blogpost: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { author, title, blogpost } = formData;
    let postForm = new FormData();
    postForm.append("author", author);
    postForm.append("title", title);
    postForm.append("blogpost", blogpost);
    axios
      .post("/spa/blogs", postForm)
      .then((res) => console.log("form posted", res))
      .catch((err) => console.log("error occurred: ", err));
    setFormData({ author: "", title: "", blogpost: "" });
  };

  return (
    <form className="form">
      <div className="row">
        <div className="col">
          <label htmlFor="author">Author: </label>
          <input
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            name="author"
            id="author"
            type="text"
            value={formData.author}
          ></input>
        </div>
        <div className="col">
          <label htmlFor="title">Title: </label>
          <input
            className="form-control"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            name="title"
            id="title"
            type="text"
            value={formData.title}
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="blogpost">Blog: </label>
        <textarea
          rows="10"
          className="form-control"
          onChange={(e) =>
            setFormData({ ...formData, blogpost: e.target.value })
          }
          name="blogpost"
          id="blogpost"
          type="text"
          value={formData.blogpost}
        ></textarea>
        <p>{1500 - formData.blogpost.length} characters left</p>
      </div>
      <button
        className="btn btn-primary m-1 "
        onClick={handleSubmit}
        type="button"
      >
        Post blog
      </button>
    </form>
  );
};
