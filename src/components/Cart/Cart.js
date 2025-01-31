import React from "react";
import {  useMutation, useLazyQuery } from "@apollo/client";
import "./cart.css";
import Head from "../Head/Head";
import { useDispatch, useSelector } from "react-redux";
import {
  removeitemfromcart,
  decItemtocart,
  incItemtocart,
} from "../../Slices/cartslice";
import userdetails from "../userdetails";
import { DELETE_MUTATION,UPDATE_CART,DEC_CART,GET_MAX_QUANTITY } from "./cart.graphql";

function Cart() {
 
  const { user } = userdetails() || {};
  const [Deletefromcart,{error:err}] = useMutation(DELETE_MUTATION);
  const [IncrementCartQuantity,{error:err2}] = useMutation(UPDATE_CART);
  const [DecreaseCartQuantity,{error:err3}] = useMutation(DEC_CART);
  const [getproductquantity,{error:err4}] = useLazyQuery(GET_MAX_QUANTITY);
  const dispatch = useDispatch();                               



  async function decreasequantity(itemtodecrease) {
    dispatch(decItemtocart({ id: itemtodecrease.id }));
    try {
      await DecreaseCartQuantity({
        variables: {
          product_id: itemtodecrease?.id,
          user_id: user,
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
        
      });
    } catch (error) {
      console.log(error);
    }
  }

  const itemsInCart = useSelector((state) => state.cart.itemsincart);

   if(err){
    return <div>Error :{err.message}</div>
   } 
   if(err2){
    return <div>Error :{err2.message}</div>
   } 
   if(err3){
    return <div>Error :{err3.message}</div>
   } 
   if(err4){
    return <div>Error :{err4.message}</div>
   } 

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
