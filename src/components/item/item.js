import React from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import "./item.css";
import { jwtDecode } from "jwt-decode";
import { removeproduct } from "../../Slices/productsslice";
import AddToCart from "../Addtocart/Addtocart";

const DELETE_PRODUCT = gql`
  mutation MyMutation($id: Int!) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: { is_deleted: true, quantity: 0 }
    ) {
      id
      is_deleted
    }
  }
`;
export default function Item({ product,setCurrentPage ,currentPage}) {
  const dispatch = useDispatch();
  const [removeProduct, { loading, error }] = useMutation(DELETE_PRODUCT);
  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  };

  const getuserinfo = () => {
    const token = Cookies.get("jwt_token");

    if (token) {
      const decoded = jwtDecode(token);

      const user = decoded["userId"];
      const role =
        decoded["https://hasura.io/jwt/claims"]["x-hasura-default-role"];

      return { user, role };
    }
    return null;
  };
  let is_admin = false;
  const { user, role } = getuserinfo();
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
      context: {
        headers,
      },
    });
    dispatch(removeproduct({ id: product.id }));
    setCurrentPage(1);
  // refetch();
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
