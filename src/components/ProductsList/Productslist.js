import React from "react";
import { useState } from "react";
import { setproductdetails } from "../../Slices/productsslice";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import Item from "../item/item.js";
import { useEffect } from "react";

const GET_PRODUCTS_QUERY = gql`
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

export default function Productlist({ submittedValue }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

  const categories = useSelector((state) => state.categories?.filters);

  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  };
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_PRODUCTS_QUERY, {
    variables: {
      limit: itemsPerPage,
      offset: indexOfFirstItem,
      searchTerm: submittedValue ? `%${submittedValue}%` : "%%",
      categories:
        categories.length > 0
          ? categories
          : ["Electronics", "Accessories", "Home Appliances"],
    },
    context: {
      headers,
    },

    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data.products);
      dispatch(setproductdetails(data.products));
    },
  });

  const totalPages = Math.ceil(
    data?.products_aggregate_count?.length / itemsPerPage
  );

  const availableproducts = useSelector(
    (state) => state?.products?.availabaleproducts
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [submittedValue, categories]);

  if (loading)
    return (
      <div>
        <center>loading</center>
      </div>
    );

  if (error) return <div>{error?.message}</div>;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {availableproducts?.length > 0 ? (
          availableproducts?.map((item) => (
            <Item key={item.id} product={item} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {currentPage > 1 && (
          <button
            style={{
              backgroundColor: "yellowgreen",
              width: "100px",
              marginRight: "3px",
            }}
            onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
          >
            previous Page
          </button>
        )}
        {currentPage < totalPages && (
          <button
            style={{
              backgroundColor: "yellowgreen",
              width: "100px",
              marginLeft: "3px",
            }}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            next page
          </button>
        )}
      </div>
    </div>
  );
}
