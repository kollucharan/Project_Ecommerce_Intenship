import { gql } from "@apollo/client";
 export const CHECKING_ITEM_INCART = gql`
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

 export const ADD_ITEM_TOCART = gql`
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

 export const GET_MAX_QUANTITY = gql`
  query MyQuery($id: Int!) {
    products(where: { id: { _eq: $id } }) {
      quantity
    }
  }
`;

 export const UPDATE_CART = gql`
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