import React, { useState } from "react";
import "./filter.css";
import { useDispatch } from "react-redux";
import {
  addtocategories,
  removefromcategories,
} from "../../Slices/categoryslice";

export default function Filter() {
  const dispatch = useDispatch();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const handle1 = () => {
    if (!checked1) dispatch(addtocategories("Electronics"));
    else {
      dispatch(removefromcategories("Electronics"));
    }
    setChecked1((prev) => (prev = !prev));
  };

  const handle2 = () => {
    if (!checked2) dispatch(addtocategories("Accessories"));
    else {
      dispatch(removefromcategories("Accessories"));
    }
    setChecked2((prev) => (prev = !prev));
  };
  const handle3 = () => {
    if (!checked3) dispatch(addtocategories("Home Applicances"));
    else {
      dispatch(removefromcategories("Home Applicances"));
    }
    setChecked3((prev) => (prev = !prev));
  };

  return (
    <form className="formclass">
      <div className="div1" style={{ display: "flex" }}>
        <input
          className="item1"
          type="checkbox"
          name="Electronics"
          id="Electronics"
          onChange={handle1}
        />
        <label htmlFor="Electronics">Electronics</label>
      </div>
      <div className="div1" style={{ display: "flex" }}>
        <input
          className="item1"
          type="checkbox"
          name="Accessories"
          id="Accessories"
          onChange={handle2}
        />
        <label htmlFor="Accessories">Accessories</label>
      </div>
      <div className="div1" style={{ display: "flex" }}>
        <input
          className="item1"
          type="checkbox"
          name="Home Applicances"
          id="Home Applicances"
          onChange={handle3}
        />
        <label htmlFor="Home Applicances">Home Applicances</label>
      </div>
    </form>
  );
}
