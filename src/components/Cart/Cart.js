import React from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./cart.css";
import Head from "../Head/Head";
import { useDispatch, useSelector } from "react-redux";
import {
  removeitemfromcart,
  decItemtocart,
  incItemtocart,
} from "../../Slices/cartslice";

const DELETE_MUTATION = gql`
  mutation DeleteCartItem($product_id: Int!, $user_id: Int!) {
    update_cart(
      where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
      _set: { is_deleted: true }
    ) {
      returning {
        id
        product_id
        user_id
        quantity
        is_deleted
      }
    }
  }
`;

const UPDATE_CART = gql`
  mutation IncrementCartQuantity(
    $product_id: Int!
    $user_id: Int!
    $max_quantity: Int!
  ) {
    update_cart(
      where: {
        product_id: { _eq: $product_id }
        user_id: { _eq: $user_id }
        is_deleted: { _eq: false }
        quantity: { _lt: $max_quantity }
      }
      _inc: { quantity: 1 }
    ) {
      returning {
        id
        product_id
        user_id
        quantity
        is_deleted
      }
    }
  }
`;

const DEC_CART = gql`
  mutation DecreaseCartQuantity($product_id: Int!, $user_id: Int!) {
    update_cart(
      where: {
        product_id: { _eq: $product_id }
        user_id: { _eq: $user_id }
        is_deleted: { _eq: false }
        quantity: { _gt: 1 } # Decrease only if quantity > 1
      }
      _inc: { quantity: -1 } # Decrease quantity by 1
    ) {
      returning {
        id
        product_id
        user_id
        quantity
        is_deleted
      }
    }

    update_cart_set_deleted: update_cart(
      where: {
        product_id: { _eq: $product_id }
        user_id: { _eq: $user_id }
        is_deleted: { _eq: false }
        quantity: { _eq: 1 } # Set is_deleted if quantity == 1
      }
      _set: { is_deleted: true } # Mark as deleted
    ) {
      returning {
        id
        product_id
        user_id
        quantity
        is_deleted
      }
    }
  }
`;

const GET_MAX_QUANTITY = gql`
  query MyQuery($id: Int!) {
    products(where: { id: { _eq: $id } }) {
      quantity
    }
  }
`;

function Cart() {
  const getuserinfo = () => {
    const token = Cookies.get("jwt_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const user = decoded["userId"];
        const role =
          decoded["https://hasura.io/jwt/claims"]["x-hasura-default-role"];

        return { user, role };
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return {};
      }
    }
    return {};
  };
  const { user, role } = getuserinfo() || {};
  const [Deletefromcart] = useMutation(DELETE_MUTATION);
  const [IncrementCartQuantity] = useMutation(UPDATE_CART);
  const [DecreaseCartQuantity] = useMutation(DEC_CART);
  const [getproductquantity] = useLazyQuery(GET_MAX_QUANTITY);
  const dispatch = useDispatch();                               

  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  };

  async function decreasequantity(itemtodecrease) {
    dispatch(decItemtocart({ id: itemtodecrease.id }));
    try {
      await DecreaseCartQuantity({
        variables: {
          product_id: itemtodecrease?.id,
          user_id: user,
        },
        context: {
          headers,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function remove(producttodelete) {
    dispatch(removeitemfromcart({ id: producttodelete.id }));

    console.log(producttodelete);
    try {
      await Deletefromcart({
        variables: {
          product_id: producttodelete?.id,

          user_id: user,
        },
        context: {
          headers,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function increasequantity(itemtoincrease) {
    const { data: max } = await getproductquantity({
      variables: {
        id: itemtoincrease.id,
      },
      context: {
        headers,
      },
    });

    const max_quantity = max?.products[0]?.quantity;

    dispatch(incItemtocart({ id: itemtoincrease.id, max_quantity }));

    try {
      await IncrementCartQuantity({
        variables: {
          product_id: itemtoincrease?.id,

          user_id: user,

          max_quantity: max_quantity,
        },
        context: {
          headers,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const itemsInCart = useSelector((state) => state.cart.itemsincart);

  return (
    <div className="cart-component">
      <Head />
      <h2 className="head">Your Cart</h2>
      {itemsInCart.length === 0 ? (
        <p className="message">Your cart is empty.</p>
      ) : (
        itemsInCart.map((item, index) => (
          <div key={index} className="card">
            <img
              src={item?.image_url}
              alt={item?.name}
              style={{ maxWidth: "100px", marginTop: "5px" }}
              className="cart-image"
            />
            <div className="details">
              <p className="item-name">
                <strong>Product:</strong> {item?.name}
              </p>
              <p className="item-quantity">
                <strong>Quantity:</strong> {item?.quantity}
              </p>
              <button
                onClick={() => decreasequantity(item)}
                style={{ marginRight: "5px" }}
              >
                -
              </button>
              <button onClick={() => remove(item)} className="remove">
                Remove From Cart
              </button>
              <button
                onClick={() => increasequantity(item)}
                style={{ marginLeft: "5px" }}
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Cart;
