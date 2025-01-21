import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Searchbar from "../searchbar/searchbar";
import Cookies from "js-cookie";
import { useState } from "react";
import './header.css'

export default function Head({ setSubmittedValue }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 
   const incart = location.pathname === "/cart" ? true : false;
   const inHome = location.pathname === "/" ? true : false;
    const inContactus = location.pathname === "/contactus" ? true : false;
      
  const navigate = useNavigate();
  function logout() {
    Cookies.remove("jwt_token");
    navigate("/login");
   window.location.reload();
  }

  return (

    <div className="navbar">
      <div className="nav-items desc">
       
        <div
          style={{ display: "flex", justifyContent: "flex-start", flexGrow: 1,paddingLeft:"40px"}} >
          <Link to="/" className="nav-item">
           Home
          </Link>
          
        </div>
     <div className="nav-links" style={{ flexGrow: 2, margin: "0 20px" , visibility: inHome ? "visible" : "hidden" }}> */}
          <Searchbar className="searchbar" setSubmittedValue={setSubmittedValue} />
       </div>    

      
        <div style={{ display: "flex", alignItems: "center"}}>

     <Link to="/contactus" className="nav-item">
            Contact us   
          </Link>  


        <Link to="/cart">
            <div className="nav-item">
              <img
                src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
                style={{ height: 35, width: 35,visibility: !incart ? "visible" : "hidden" }}
                alt=""
              />
             
            </div>
          </Link> 
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }} >
          <div className="nav-item">
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-item">
          Home
        </Link>
        
           <div className="" style={{ flexGrow: 2, margin: "0 10px", visibility: inHome ? "visible" : "hidden" }}>
          <Searchbar setSubmittedValue={setSubmittedValue} />
        </div> 
        &&<Link to="/cart">
            <div className="nav-item">
              <img
                src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
                style={{ height: 35, width: 35 ,visibility: !incart ? "visible" : "hidden"}}
                alt=""
              />
            
            </div>
          </Link> 


     <Link to="/contactus">
          <div  className="nav-item">Contact us</div>
        </Link>
   
        <div className="nav-item">
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>

      </div>

    </div>
  );
}
