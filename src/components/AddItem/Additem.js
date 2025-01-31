import React from "react";
import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { setproductdetails } from "../../Slices/productsslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";         
import "./Additem.css";
import Head from "../Head/Head";
import { ADD_PRODUCT } from "./Additem.graphql";

function AddProduct() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    message: "",
    productname: "",
    productprice: 0,
    quantity: 0,
    imageurl: "",
    categoryid: 0,
    productdescription: "",
  });

  const availableproducts = useSelector(
    (state) => state.products.availabaleproducts
  );

  const priceInputRef = useRef(null);
  const quantityInputRef = useRef(null);

  const dispatch = useDispatch();

  const [addproduct, { loading,error }] = useMutation(ADD_PRODUCT);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const add = async (e) => {
    e.preventDefault();
    const {
      productprice,
      quantity,
      productname,
      productdescription,
      imageurl,
      categoryid,
    } = formData;

    if (productprice <= 0 && quantity <= 0) {
      setMessage("Price and Quantity both should be greater than 0");
      priceInputRef?.current?.focus();
      return;
    }

    if (productprice <= 0) {
      setMessage("Price should be greater than 0");
      priceInputRef?.current?.focus();
      return;
    }

    if (quantity <= 0) {
      setMessage("Quantity should be greater than 0");
      quantityInputRef?.current?.focus();
      return;
    }

    if (quantity > 0 && productprice > 0) {
      setMessage("");
    }
    try {
      const { data } = await addproduct({
        variables: {
          name: productname,
          image_url: imageurl,
          price: productprice,
          category_id: categoryid,
          description: productdescription,
          quantity: quantity,
        },
      });

      if (data) {
        dispatch(
          setproductdetails([data.insert_products_one, ...availableproducts])
        );

        setMessage("Product added successfully");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {   
      console.error("GraphQL Error:", err);
      setMessage("Failed to add product. Please try again.");
    }
  };

  return (
    <div>
      <Head />
      <h1>Add The Product</h1>
      <div className="styleproductpage">
        <form onSubmit={add}>
          <label for="id1">Product Name:</label>
          <input
            type="text"
            name="productname"
            id="id1"
            required
            onChange={handleInputChange}
            value={formData.productname}
          ></input>

          <label for ='id2'>Product Description:</label>
          <input
            type="text"
            name="productdescription"
            required
            id='id2'
            onChange={handleInputChange}
            value={formData.productdescription}
          ></input>

          <label for ='id3'>Product Price:</label>
          <input
            type="number"
            name="productprice"
            required
            id='id3'
            ref={priceInputRef}
            onChange={handleInputChange}
            value={formData.productprice === 0 ? "" : formData.productprice}
          ></input>

          <label>Category:</label>
          <select name="categoryid" required onChange={handleInputChange}  value={formData.categoryid}>
            <option value="">Select a category</option>
            <option value="1">Electronics</option>
            <option value="2">Accessories</option>
            <option value="3">Home Applicances</option>
          </select>
          <label for = "id4">Image Url :</label>
          <input
            type="text"
            name="imageurl"
            id="id4"
            required
            onChange={handleInputChange}
            value={formData.imageurl} 
          ></input>

          <label for ="id5">Quantity:</label>
          <input
            type="number"
            name="quantity"
            ref={quantityInputRef}
            required
            id="id5"
            onChange={handleInputChange}
            value={formData.quantity === 0 ? "" : formData.quantity}
          ></input>

          {message === "Product added successfully" ? (
            <p>{message}</p>
          ) : (
            <p style={{ color: "Red" }}>{message}</p>
          )} 

       {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

          {!loading ? (
            <button type="submit"> Add Product </button>
          ) : (
            <p>Adding Product...</p>
          )}
        </form>
      </div>
    </div>
  );
}
export default AddProduct;
