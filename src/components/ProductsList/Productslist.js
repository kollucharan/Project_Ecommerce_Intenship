import React from "react";
import { useState } from "react";
import { setproductdetails } from "../../Slices/productsslice";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";       
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import Item from "../item/item.js";
import { useEffect } from "react";
import "./productslist.css";

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
  // const itemsPerPage = 4;
  // const itemsPerPage = 1;
  const itemsPerPage =3;
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
      // console.log(data.products);
      dispatch(setproductdetails(data?.products));
    },
  });

  const totalPages = Math.ceil(
    data?.products_aggregate_count?.length / itemsPerPage
  );

  const handleprev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handlenext = () => {
    setCurrentPage(currentPage + 1);
  };

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
            <Item
              key={item.id}
              product={item}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="temp">
          {/* added */}
          {currentPage > 1 && (
            <button className="buttonsforpagination" onClick={handleprev}>
              prev
            </button>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <div>
                <button
                  className="buttonsforpagination"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    backgroundColor:
                      currentPage === page ? "#007bff" : "#f8f9fa",
                    color: currentPage === page ? "white" : "black",
                    marginRight: "5px",
                  }}
                >
                  {page}
                </button>
              </div>
            )
          )}
          {/* added */}

          {currentPage < totalPages && (
            <button className="buttonsforpagination" onClick={handlenext}>
              {" "}
              next{" "}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
