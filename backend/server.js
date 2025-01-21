import jwt from "jsonwebtoken";
import cors from "cors";
const secret = "mySuperSecretKey1234567890abcdefg";
import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());
app.use(cors());
const HASURA_ADMIN_SECRET =
  "mPCN2znKe29oVkgGUzMTNMxzLY5bxwuaJYgo1pZ6M8JaQHmCAD72uJTC9IW53Vjf";

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      "https://coherent-skink-69.hasura.app/v1/graphql",
      {
        query: `
          query GetUserByEmail($email: String!) {
            users(where: {email: {_eq: $email}}) {
              id
              email
              password
              is_admin
             
            }
          }
        `,
        variables: { email },
      },
      {
        headers: {
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET, // Authentication header for Hasura
          "Content-Type": "application/json",
        },
      }
    );

    const user = response.data.data.users[0];

    if (!user) {
      res.status(400).send("user");
      return;
    }

    const isPasswordValid = password === user.password;
    const isadmin = user.is_admin;

    if (!isPasswordValid) {
      res.status(401).send("Password");
      return;
    }

    const claims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": isadmin ? "admin" : "customer",
        "x-hasura-allowed-roles": ["customer", "admin","anonymous"],
        "x-hasura-user-id": `${user.id}`,
        "x-hasura-user-name": user.name,
       
      },
    };

    const token = jwt.sign(
      {
        userId: user.id,
        ...claims,
      },
      secret // Secret key for signing the JWT token,
    );
   
   // res.status(200).json({ token, user: { id: user.id, is_admin: user.is_admin } });
   res.status(200).json({ token});
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Server error" });
  }
});
app.listen(3000, () => {
  console.log("Back end server started");
});