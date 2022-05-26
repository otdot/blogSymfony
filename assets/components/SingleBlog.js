import React, { useEffect, useState } from "react";
import { CreateComment } from "./CreateComment";
import axios from "axios";
import { useParams } from "react-router-dom";

export const SingleBlog = () => {
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/spa/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setComments(res.data.comments);
      })
      .catch((err) => console.log("an error occurred: ", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="container">
      <div>
        <div className="blog">
          <article className="article">
            <h1 className="article-title">{blog.title}</h1>
            <p className="article-subtitle">
              by: {blog.author} {blog.blogDate?.date.slice(0, 11)}
            </p>
            <p className="article-content">{blog.blogpost}</p>
          </article>
        </div>
        <CreateComment />
      </div>

      <div>
        {comments.map((comment, i) => {
          return (
            <div className="row">
              <div className="col-8">
                <div className="post-heading">
                  <div className="float-left meta">
                    <div className="title h5">
                      <b>{comment.author} commented: </b>
                    </div>
                    <h6 className="text-muted time">
                      {blog.blogDate.date.slice(0, 11)}
                    </h6>
                  </div>
                </div>
                <div className="post-description">
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
