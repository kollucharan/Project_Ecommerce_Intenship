import { gql } from "@apollo/client";


 export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $price: Int!
    $image_url: String!
    $category_id: Int!
    $description: String
    $quantity: Int!
  ) {
    insert_products_one(
      object: {
        name: $name
        price: $price
        image_url: $image_url
        category_id: $category_id
        description: $description
        is_deleted: false
        quantity: $quantity
      }
    ) {
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