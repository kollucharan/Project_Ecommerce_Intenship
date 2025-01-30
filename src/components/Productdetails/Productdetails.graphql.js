import { gql } from "@apollo/client";

 export const QUERY_TO_GET_PRODUCT = gql`
  query MyQuery($id: Int!) {
    products_by_pk(id: $id) {
      id
      name
      price
      description
      image_url
    }
  }
`;
