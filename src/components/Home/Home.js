import React from "react";
import { gql, useQuery } from "@apollo/client";
import Head from "../Head/Head.js";
import Filter from "../filter/Filter.js";
import Item from "../item/item.js";
import { useState } from "react";
import "./Home.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setproductdetails } from "../../Slices/productsslice.js";
import { SetHasRun } from "../../Slices/hasRunslice.js";
import { setRunn } from "../../Slices/runnslice.js";
import { setcartdetails } from "../../Slices/cartslice.js";
// const QUERY_TO_GET_PRODUCTS = gql`
//   query {
//     products {
//       id
//       name
//       price
//       image_url
//       category {
//         name
//       }
//     }
//   }
// `;

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
const QUERY_TO_GET_PRODUCTS = gql`
  query {
    products(where: { is_deleted: { _eq: false } }) {
      id
      name
      price
      quantity
      image_url
      category {
        name
      }
    }
  }
`;
export default function Home() {
  const [submittedValue, setSubmittedValue] = useState("");
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
  const hasRun = useSelector((state) => state.hasRun.hasRun);
  const dispatch = useDispatch();

  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  };

  const { data, loading, error, refetch } = useQuery(QUERY_TO_GET_PRODUCTS, {
    context: {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    },
    skip: hasRun,
    onCompleted: (data) => {
      if (!hasRun) {
        dispatch(setproductdetails(data.products));
        dispatch(SetHasRun());
      }
    },
    fetchPolicy: "network-only",
  });

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
        //console.log(cartData);
        dispatch(setcartdetails(productsData));
        dispatch(setRunn());
      }
    },
    fetchPolicy: "network-only",
  });

  const categories = useSelector((state) => state.categories?.filters);
  const availableproducts = useSelector(
    (state) => state.products?.availabaleproducts
  );

  //state should be used before loading and error

  function addproduct() {
    navigate("/addproduct");
  }

  if (loading) return <div><center>loading</center></div>;
 
  if (error) return <div>{error?.message}</div>;

  const searchName =
    typeof submittedValue === "string" ? submittedValue.toLowerCase() : "";

  const productsToDisplay = availableproducts?.filter((item) =>
    searchName ? item.name.toLowerCase().includes(searchName) : true
  );

  const finalProducts = productsToDisplay.filter((item) => {
    if (categories.length === 0) {
      return true;
    }
    return categories.find((category) => category === item?.category?.name);
  });

  return (
    <div>
      <div>
        <Head setSubmittedValue={setSubmittedValue} />
        
      </div>
      <div style={{ display: "flex" }}>
        <div className="filter-container">
          <Filter />
        </div>

        <div style={{ width: 'calc(100% - 50px)', height: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", marginTop:"20px" }}>
            {is_admin && <button onClick={addproduct}>Add Product</button>}
          </div>
          <div className="card-container">
            {finalProducts.length > 0 ? (
              finalProducts.map((item) => <Item key={item.id} product={item} />)
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
