import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./productdetails.css";
import Head from "../Head/Head";

import { jwtDecode } from "jwt-decode";

import AddToCart from "../Addtocart/Addtocart";

const QUERY_TO_GET_PRODUCT = gql`
  query MyQuery($id: Int!) {
    products_by_pk(id: $id) {
      id
      name
      price
      description
      image_url
    }
  }
`;

export default function Productdetails() {

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

  const { id } = useParams();
  const { data, loading, error } = useQuery(QUERY_TO_GET_PRODUCT, {
    variables: { id: parseInt(id) },
    fetchPolicy: "network-only",
    context: {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    },
  });
  if (loading) {
    return (
      <div className="loading-container">
        <center>loading</center>
      </div>
    );
  }
  if (error) return <div>{error.message}</div>;

  const product = {
    id: data?.products_by_pk?.id,
    name: data?.products_by_pk?.name,
    description: data?.products_by_pk?.description,
    image_url: data?.products_by_pk?.image_url,
    price: data?.products_by_pk?.price,
  };

  console.log(data);
  return (
    <div>
      
      <Head />

      <div className="productdetailsdiv">
        <img
          className="imgproductdetails"
          src={data?.products_by_pk?.image_url}
          style={{ width: 200, height: 200 }}
          alt="Network issue"
        />
        <p className="pproductdetails">{data?.products_by_pk?.name}</p>
        <p className="pproductdetails">${data?.products_by_pk?.price}</p>
        <p className="pproductdetails">{data?.products_by_pk?.description}</p>
        <div>
          {!is_admin && <AddToCart product={product} />}
          
        </div>
      </div>
    </div>
  );
}
