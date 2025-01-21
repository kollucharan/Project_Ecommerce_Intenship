import React from "react";
import { Link } from "react-router-dom";
import "./Headforcart.css";
function HeadforCart() {
  return (
    <div className="headForCart">
      <Link to="/" className="link">
        Home
      </Link>
    </div>
  );
}
export default HeadforCart;
