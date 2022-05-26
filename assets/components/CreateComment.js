import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CreateComment = () => {
  const [comments, setComments] = useState({
    author: "",
    comment: "",
  });
  const id = useParams().id;

  const handleSubmit = () => {
    const { author, comment } = comments;
    let postForm = new FormData();
    postForm.append("author", author);
    postForm.append("comment", comment);
    axios
      .post(`/spa/comments/${id}`, postForm)
      .then((res) => console.log("form posted", res))
      .catch((err) => console.log("error occurred: ", err));
    setComments({ author: "", comment: "" });
  };

  return (
    <form className="commentform">
      <div className="row">
        <div className="col">
          <input
            className="form-control"
            placeholder="nickname"
            onChange={(e) =>
              setComments({ ...comments, author: e.target.value })
            }
            name="author"
            id="author"
            type="text"
          ></input>
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="add comment"
            onChange={(e) =>
              setComments({ ...comments, comment: e.target.value })
            }
            name="comment"
            id="comment"
            type="text"
          ></input>
        </div>
        <div className="col">
          <button className="btn btn-secondary" onClick={handleSubmit}>
            comment
          </button>
        </div>
      </div>
    </form>
  );
};
