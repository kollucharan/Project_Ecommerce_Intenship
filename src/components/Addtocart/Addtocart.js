import { useMutation,  useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { additemtocart, incItemtocart } from "../../Slices/cartslice";
import "./Addtocart.css";
import { useState } from "react";
import userdetails from "../userdetails";
import {
  CHECKING_ITEM_INCART,
  ADD_ITEM_TOCART,
  GET_MAX_QUANTITY,
  UPDATE_CART,
} from "./Addtocart.graphql";

function AddToCart({ product }) {
  let is_admin = false;
  const { user, role } = userdetails();
  if (role === "admin") {
    is_admin = true;
  } else {
    is_admin = false;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inHome, setInHome] = useState(false);
  const [fetchCart] = useLazyQuery(CHECKING_ITEM_INCART);
  const [getmaxquantity,{error}] = useLazyQuery(GET_MAX_QUANTITY);
  const [addItemToCart,{error:err2}] = useMutation(ADD_ITEM_TOCART);
  const [updateCart,{error:err3}] = useMutation(UPDATE_CART);

  const handleClick = async () => {
    if (!inHome) {
      setInHome(true);

      const { data: max } = await getmaxquantity({
        variables: { id: product.id },
      });

      const max_quantity = max?.products?.[0]?.quantity;

      try {
        const { data, error } = await fetchCart({
          variables: { product_id: product.id, user_id: user },
          fetchPolicy: "network-only",
        });

        if (error) {
          console.error("Error fetching cart data:", error);
          return;
        }
        const existingItems = data?.cart || [];

        const activeItem = existingItems.find((item) => !item.is_deleted);
        const deletedItem = existingItems.find((item) => item.is_deleted);

        if (activeItem) {
          console.log("Active Item Found. Incrementing quantity.");

          await updateCart({
            variables: {
              product_id: product.id,
              max_quantity: max_quantity,
              user_id: user,
            },
          });
          dispatch(incItemtocart({ id: product.id, max_quantity }));
        } else if (deletedItem) {
          console.log("Deleted Item Found. Re-adding to cart.");

          await addItemToCart({
            variables: {
              product_id: product.id,
              user_id: user,
            },
          });
          dispatch(additemtocart({ ...product, quantity: 1 }));
        } else {
          console.log("No Cart Item Found. Adding new item.");
          await addItemToCart({
            variables: {
              product_id: product.id,
              user_id: user,
            },
          });

          dispatch(additemtocart({ ...product, quantity: 1 }));
        }
      } catch (error) {
        console.error("Error while adding/updating cart:", error.message);
      }
    } else {
      navigate("/cart");
    }
  };


   if(error) {
    return <div>error:{error.message}</div>
   }
   
   if(err2){
    return <div>Error is {err2.message}</div>
   }
   if(err3) {
    return <div>Error :{err3.message}</div>
   }

  return (
    <div>
      <button onClick={handleClick}>
        {!inHome ? "Add to Cart" : "Go To Cart"}
      </button>
    </div>
  );
}
export default AddToCart;
