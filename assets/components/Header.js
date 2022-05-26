import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Header = ({ handleChange, handleSearch }) => {
  return (
    <header>
      <div>
        <Link to="/">
          <h1>Blogs</h1>
        </Link>
      </div>
      <div className="links">
        <div>
          <input
            className="m-1"
            onChange={(e) => handleChange(e)}
            name="searchTerm"
            type="text"
          ></input>
          <button
            className="btn btn-primary mb-1 ml-2"
            onClick={handleSearch}
            type="button"
          >
            search
          </button>
        </div>
        <nav>
          <ul>
            <Link to="/">All blogs</Link>
            <Link to="/createblog">Create Blog</Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};
