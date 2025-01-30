import { gql } from "@apollo/client";

 export const DELETE_PRODUCT = gql`
  mutation MyMutation($id: Int!) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: { is_deleted: true, quantity: 0 }
    ) {
      id
      is_deleted
    }
  }
`;