import React from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import "./item.css";
import { removeproduct } from "../../Slices/productsslice";
import AddToCart from "../Addtocart/Addtocart";
import userdetails from "../userdetails";
import { DELETE_PRODUCT } from "./item.graphql";

export default function Item({ product,setCurrentPage ,currentPage}) {
  const dispatch = useDispatch();

  const [removeProduct, { loading, error }] = useMutation(DELETE_PRODUCT);
   const { role } = userdetails() || {};
  let is_admin = false;
  if (role === "admin") {
    is_admin = true;
  } else {
    is_admin = false;
  }

  const isAdmin = is_admin;

  const deleteProduct = async () => {
    await removeProduct({
      variables: {
        id: product.id,
      },
    
    });
    dispatch(removeproduct({ id: product.id }));
    setCurrentPage(1);
  
  };

  return (
    <div className="card-item">
      <Link to={`/product/${product.id}`}>
        <div>
          <img
            className="image"
            src={product.image_url}
            style={{ width: 100, height: 100 }}
            alt={product.name}
          />
        </div>
      </Link>
      <p className="price">${product.price}</p>
      <p className="name">{product.name}</p>
      <div>
        {!isAdmin && <AddToCart product={product} />}

        {isAdmin &&
          (loading ? (
            <p>Deleting...</p>
          ) : (
            <button onClick={deleteProduct} className="button">
              Delete Product
            </button>
          ))}
      </div>
    </div>
  );
}
