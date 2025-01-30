import { gql } from "@apollo/client";
 
 export const GET_PRODUCTS_QUERY = gql`
  query GetProducts(
    $limit: Int!
    $offset: Int!
    $searchTerm: String!
    $categories: [String!]!
  ) {
    products(
      where: {
        is_deleted: { _eq: false }
        name: { _ilike: $searchTerm }
        _and: [{ category: { name: { _in: $categories } } }]
      }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      price
      image_url
      category {
        name
      }
    }

    products_aggregate_count: products(
      where: {
        is_deleted: { _eq: false }
        name: { _ilike: $searchTerm }
        _and: [{ category: { name: { _in: $categories } } }]
      }
    ) {
      id
    }
  }
`;