import React from "react";
import { gql, useQuery } from "@apollo/client";
import Head from "../Head/Head.js";
import Filter from "../filter/Filter.js";
import { useState } from "react";
import "./Home.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setRunn } from "../../Slices/runnslice.js";
import { setcartdetails } from "../../Slices/cartslice.js";
import Productlist from "../ProductsList/Productslist.js";

const JOIN_QUERY = gql`
  query GetCartWithProductDetails($user_id: Int!) {
    cart(
      where: {
        user_id: { _eq: $user_id }
        is_deleted: { _eq: false }
        product: { is_deleted: { _eq: false } }
      }
    ) {
      id
      product_id
      quantity
      product {
        id
        name
        price
        image_url
      }
    }
  }
`;

export default function Home() {
  const [submittedValue, setSubmittedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const navigate = useNavigate();

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
  const runn = useSelector((state) => state.runn.runn);
  const dispatch = useDispatch();

  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  };

  const { cartData, load, err } = useQuery(JOIN_QUERY, {
    variables: { user_id: user },

    context: {
      headers,
    },
    skip: runn,
    onCompleted: (cartData) => {
      if (!runn) {
        const productsData = cartData?.cart.map((item) => ({
          name: item?.product.name,
          price: item?.product.price,
          id: item?.product.id,
          image_url: item?.product.image_url,
          quantity: item?.quantity,
        }));

        dispatch(setcartdetails(productsData));
        dispatch(setRunn());
      }
    },
    fetchPolicy: "network-only",
  });

  function addproduct() {
    navigate("/addproduct");
  }

  if (load)
    return (
      <div>
        <center>loading</center>
      </div>
    );

  return (
    <div>
      <div>
        <Head setSubmittedValue={setSubmittedValue} />
      </div>
      <div style={{ display: "flex" }}>
        <div className="filter-container">
          <Filter />
        </div>
        <div style={{ width: "calc(100% - 50px)", height: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {is_admin && <button onClick={addproduct}>Add Product</button>}
          </div>
          <Productlist submittedValue={submittedValue} />
        </div>
      </div>
    </div>
  );
}
