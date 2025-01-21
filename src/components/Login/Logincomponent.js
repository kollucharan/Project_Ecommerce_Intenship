import React , { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [invalid, SetInvalid] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      navigate("/");
    }
  }, []);

  async function login() {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch("http://localhost:3000/login", options);
    if (response.status === 200) {
      const data = await response.json();
      // const { token, user } = data;
      const {token}=data;
     
      Cookies.set("jwt_token", token);
    //  Cookies.set("user", JSON.stringify(user));
     
      navigate("/");
      return;
    } else if (response.status === 400) {
      SetInvalid("user not found");
    } else if (response.status === 401) {
      SetInvalid("password is incorrect");
    }
    else{
      SetInvalid("something went wrong please try again");
    }
  }
  return (
    <div className="login-container">
      <form className="login-form">
        {/* <input type=""/> */}
        <label htmlFor="email" className="label">
          Email id:
        </label>
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => Setemail(e.target.value)}
        />

        <label htmlFor="password" className="label">
          Password:
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          onChange={(e) => Setpassword(e.target.value)}
          required
        />
        <p className="error">{invalid}</p>
        <button type="button" onClick={login} className="login-button">
          Submit
        </button>
      </form>
    </div>
  );
}


