import React, { useState } from "react";
import "./filter.css";       
import { useDispatch } from "react-redux";
import {
  addtocategories,
  removefromcategories,
} from "../../Slices/categoryslice";
import { GET_CATEGORIES } from "./filter.graphql";
import { useQuery } from "@apollo/client";
 

export default function Filter() {

 const {data,loading,error}=useQuery( GET_CATEGORIES)

  const dispatch = useDispatch();
   
  let Allcategories=[]

  const [checkedcategories, setCheckedcategories] = useState({
    Electronics: false,
    Accessories: false,
    Home_Applicances: false,
  });

  const handle = (cat) => {
    setCheckedcategories((prev) => {
      const isChecked = !prev[cat];

      if (isChecked) {
        dispatch(addtocategories(cat));
      } else {
        dispatch(removefromcategories(cat));
      }

      return { ...prev, [cat]: isChecked };
    });
  };
 
  if(loading) return <div>loading</div> 
 if(error) return <div>{error}</div> 
 if (error) return <p>Error: {error.message}</p>;
 if (data) {
  Allcategories=data?.categories
 }

  return (
    <form className="formclass">
      <div className="filterItems">
        {Allcategories.map((item) => (
          <div className="category">
            <input
              className={`item1`}
              type="checkbox"
              name={item}
              id={item}
              onChange={() => handle(item?.name)}
            />
            <label htmlFor={item?.name}>{item?.name}</label>
          </div>
        ))}
      </div>
    </form>
  );
}
