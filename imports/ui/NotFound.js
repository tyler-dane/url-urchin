import React from "react";
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Oops!</h1>
        <p>Page not found</p>
        <Link to="/" className="button button--link">Home page</Link>
      </div>
    </div>
  );
};
