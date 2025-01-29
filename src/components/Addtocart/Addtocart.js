import { useMutation, gql, useLazyQuery, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { additemtocart, incItemtocart } from "../../Slices/cartslice";
import "./Addtocart.css";
import { useState } from "react";

const CHECKING_ITEM_INCART = gql`
  query GetCartByProductId($product_id: Int!, $user_id: Int!) {
    cart(
      where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
    ) {
      id
      quantity
      is_deleted
    }
  }
`;

const ADD_ITEM_TOCART = gql`
  mutation AddItemToCart($product_id: Int!, $user_id: Int!) {
    insert_cart_one(
      object: {
        product_id: $product_id
        user_id: $user_id
        quantity: 1
        is_deleted: false
      }
    ) {
      id
      product_id
      user_id
      quantity
      is_deleted
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

function AddToCart({ product }) {

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inHome, setInHome] = useState(false);
  const [fetchCart] = useLazyQuery(CHECKING_ITEM_INCART);
  const [getmaxquantity, { loading, error }] = useLazyQuery(GET_MAX_QUANTITY);
  const [addItemToCart] = useMutation(ADD_ITEM_TOCART);
  const [updateCart] = useMutation(UPDATE_CART);
  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  };

  const handleClick = async () => {
    if (!inHome) {
      setInHome(true);

      const {
        data: max,
        loading,
        error,
      } = await getmaxquantity({
        variables: { id: product.id },
        context: {
          headers,
        },
      });

      const max_quantity = max?.products?.[0]?.quantity;

      try {
        const { data, loading, error } = await fetchCart({
          variables: { product_id: product.id, user_id: user },
          fetchPolicy: "network-only",
          context: { headers },
        });

        if (error) {
          console.error("Error fetching cart data:", error);
          return;
        }
        const existingItems = data?.cart || [];

        const activeItem = existingItems.find((item) => !item.is_deleted);
        const deletedItem = existingItems.find((item) => item.is_deleted);
        //  console.log(product);

        if (activeItem) {
          console.log("Active Item Found. Incrementing quantity.");

          await updateCart({
            variables: {
              product_id: product.id,
              max_quantity: max_quantity,
              user_id: user,
            },
            context: { headers },
          });
          dispatch(incItemtocart({ id: product.id, max_quantity }));
        } else if (deletedItem) {
          console.log("Deleted Item Found. Re-adding to cart.");

          await addItemToCart({
            variables: {
              product_id: product.id,
              user_id: user,
            },
            context: { headers },
          });
          dispatch(additemtocart({ ...product, quantity: 1 }));
        } else {
          console.log("No Cart Item Found. Adding new item.");
          await addItemToCart({
            variables: {
              product_id: product.id,
              user_id: user,
            },
            context: { headers },
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

  return (
    <div>
      <button onClick={handleClick}>
        {!inHome ? "Add to Cart" : "Go To Cart"}
      </button>
    </div>
  );
}
export default AddToCart;
