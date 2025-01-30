import { gql } from "@apollo/client";
 export const JOIN_QUERY = gql`
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
