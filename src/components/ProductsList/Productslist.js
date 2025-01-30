import React from "react";
import { useState } from "react";
import { setproductdetails } from "../../Slices/productsslice";
import { useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";       
import { useDispatch } from "react-redux";
import Item from "../item/item.js";
import { useEffect } from "react";
import "./productslist.css";
import Pagination from "../Pagination/Pagination.js";
import { GET_PRODUCTS_QUERY } from "./Productslist.graphql.js";

export default function Productlist({ submittedValue }) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =3;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

  const categories = useSelector((state) => state.categories?.filters);


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
   

    fetchPolicy: "network-only",
    onCompleted: (data) => {
      dispatch(setproductdetails(data?.products));
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
    <div >
      <div style={{ display: "flex", justifyContent: "center" ,marginBottom:'12px'}}>
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
      <div>
       <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
       </div>
    </div>
  );
}
