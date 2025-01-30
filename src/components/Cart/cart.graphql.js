
import { gql  } from "@apollo/client";
 export const DELETE_MUTATION = gql`
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

 export const DEC_CART = gql`
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

 export const GET_MAX_QUANTITY = gql`
  query MyQuery($id: Int!) {
    products(where: { id: { _eq: $id } }) {
      quantity
    }
  }
`;
