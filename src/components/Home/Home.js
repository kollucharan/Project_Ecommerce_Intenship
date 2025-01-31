import React from "react";
import { gql, useQuery } from "@apollo/client";
import Head from "../Head/Head.js";
import Filter from "../filter/Filter.js";
import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRunn } from "../../Slices/runnslice.js";
import { setcartdetails } from "../../Slices/cartslice.js";
import Productlist from "../ProductsList/Productslist.js";
import userdetails from "../userdetails.js";
import { JOIN_QUERY } from "./Home.graphql.js";


export default function Home() {
  const [submittedValue, setSubmittedValue] = useState("");
  const navigate = useNavigate();

  let is_admin = false;
  const { user, role } = userdetails();
  if (role === "admin") {
    is_admin = true;
  } else {
    is_admin = false;
  }
  const runn = useSelector((state) => state.runn.runn);
  const dispatch = useDispatch();

 

  const { cartData, load, err } = useQuery(JOIN_QUERY, {
    variables: { user_id: user },

    
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

    if(err) 
      return (<div>Err :{err.meaasage}</div>)

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
