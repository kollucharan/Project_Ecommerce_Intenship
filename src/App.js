import { Routes,Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Cart from "./components/Cart/Cart.js";
import Contactus from "./components/Contactus/Contactus.js";
import Protectedroutes from "./components/protectedroutes/protected.js";
import Login from "./components/Login/Logincomponent.js";
import Productdetails from "./components/Productdetails/Productdetails.js";
import AddProduct from './components/AddItem/Additem.js'
function App() {
  return (
    <div>
      <Routes>
        <Route element={<Protectedroutes />}>
          <Route path="/" element={<Home  />} />
          <Route path="/cart" element={<Cart  />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/addproduct" element={<AddProduct/>} />       
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
