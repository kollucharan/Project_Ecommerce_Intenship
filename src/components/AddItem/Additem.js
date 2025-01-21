
import React from "react";
import { useState } from "react";
import { gql,useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { setproductdetails } from "../../Slices/productsslice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
   import './Additem.css';
   import Head from "../Head/Head";

const ADD_PRODUCT = gql` 

    mutation AddProduct($name: String!, $price: Int!, $image_url: String!, $category_id: Int!,$description :String,$quantity:Int!) {
    insert_products_one(object: {
      name: $name,
      price: $price,
      image_url: $image_url,
      category_id: $category_id,
        description:$description,
      is_deleted: false,
      quantity:$quantity
    }) {
      id
      name
      price
      quantity
    }
  }
  `
   function AddProduct() {
    const navigate =useNavigate();
    const [message,setMessage]=useState('');
    const [productname,setProductname]=useState('');
    const [productdescription,setProductdescription]=useState('');
    const [productprice,setProductprice]=useState(0);
    const [quantity,setQuantity]=useState(0);
    const [imageurl,setImageUrl]=useState('');
    const [categoryid,setCategoryid]=useState('');
const availableproducts = useSelector((state) => state.products. availabaleproducts);

   
    const dispatch=useDispatch();
    
    const [addproduct,{loading}] =useMutation(ADD_PRODUCT);
     const headers = {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      };

   const add= async (e) =>{
     
    e.preventDefault();
   
 const  { data } = await addproduct({

        variables:{
            name:productname,
            image_url:imageurl,
            price:productprice,
            category_id:categoryid,
            description:productdescription,
            quantity:quantity
        },
        context:{headers},
    })  

    // dispatch(SetHasRunFalse());
     
  
      if(data) {
      dispatch(setproductdetails([data.insert_products_one, ...availableproducts]));

      setMessage("Product added successfully");

      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    }
  
  
  }
    return (
          <div>
                <Head/>
            <h1>Add Product</h1>
             <div  className ="styleproductpage">
               < form onSubmit={add}>

                    <label>Product Name:</label>
                    <input type="text" name="productname" required  onChange={(e)=>{setProductname(e.target.value)}}></input>

                    <label>Product Description:</label>
                    <input type="text" name="productdescription" required  onChange={(e)=>{setProductdescription(e.target.value)}}></input>

                    <label>Product Price:</label>
                    <input type="text" name="productprice" required  onChange={(e)=>{setProductprice(e.target.value)}}></input>

{/* 
                    <label>Category id:</label>
                    <input type="number" name="categoryid" required onChange={(e)=>{setCategoryid(e.target.value)}}></input> */}

                    <label>Category:</label>
                  <select
                  name="categoryid"
                 required
                   value={categoryid}  
                  onChange={(e) => setCategoryid(e.target.value)}  
                 >
                <option value="">Select a category</option>
                <option value="1">Electronics</option>
                <option value="2">Accessories</option>
                <option value="3">Home Applicances</option>
            
               </select>
                    <label>Image Url :</label>
                    <input type="text" name="imageurl" required onChange={(e)=>{setImageUrl(e.target.value)}}></input> 
                   
                    <label>Quantity:</label>
                    <input type="text" name="Quantity" required onChange={(e)=>{setQuantity(e.target.value)}}></input> 

                    {message && <p>{message}</p>}

                   { !loading ? <button type="submit"> Add Product </button>  :  <p>Adding Product...</p>}
               </form>
              
               </div>

          </div>
    )

   } 
   export default AddProduct;