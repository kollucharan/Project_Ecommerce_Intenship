import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function userdetails(){
    const token = Cookies.get("jwt_token");

    if (token) {
      const decoded = jwtDecode(token);

      const user = decoded["userId"];
      const role =
        decoded["https://hasura.io/jwt/claims"]["x-hasura-default-role"];

      return { user, role };
    }
    return {};

  };



