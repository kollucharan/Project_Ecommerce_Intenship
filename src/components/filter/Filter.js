import React from "react";
import "./filter.css";
import { useState } from "react";
import {
  addtocategories,
  removefromcategories,
} from "../../Slices/categoryslice";
import { useDispatch } from "react-redux";

export default function Filter() {
  const dispatch = useDispatch();
  // const categories=[]
  const [checked1, SetChecked1] = useState(false);
  const [checked2, SetChecked2] = useState(false);
  const [checked3, SetChecked3] = useState(false);

  const handle1 = () => {
    if (!checked1) {
      dispatch(addtocategories("Electronics"));
    } else {
      dispatch(removefromcategories("Electronics"));
    }
    SetChecked1((prev) => !prev);
  };
  const handle2 = () => {
    if (!checked2) {
      dispatch(addtocategories("Accessories"));
    } else {
      dispatch(removefromcategories("Accessories"));
    }
    SetChecked2((prev) => !prev);
  };
  const handle3 = () => {
   
    if (!checked3) {
      dispatch(addtocategories("Home Applicances"));
    } else {
      dispatch(removefromcategories("Home Applicances"));
    }
    SetChecked3((prev) => !prev);
  };

  return (
    <div className="filterComponent">
      <form className="formclass" action="" on check>
        <div className="div1" style={{ display: "flex" }}>
          <input
            className="item1"
            type="checkbox"
            name="Electronics"
            id="Electronics"
            onClick={handle1}
          />
          <label htmlFor="Electronics">Electronics</label>
        </div>
        <div className="div1" style={{ display: "flex" }}>
          <input
            className="item1"
            type="checkbox"
            name="Accessories"
            id="Accessories"
            onClick={handle2}
          />
          <label htmlFor="Accessories">Accessories</label>
        </div>
        <div className="div1" style={{ display: "flex" }}>
          <input
            className="item1"
            type="checkbox"
            name="Home Applicances"
            id="Home Applicances"
            onClick={handle3}
          />
          <label htmlFor="Home Applicances">Home Applicances</label>
        </div>
      </form>
    </div>
  );
}
