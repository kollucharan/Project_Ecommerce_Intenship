// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import Cookies from "js-cookie";
// import { useMutation } from "@apollo/client";
// import Item from "./item.js";
// import configureStore from "../../store"; 
// import { removeproduct } from "../../Slices/productsslice";


// jest.mock("js-cookie", () => ({
//   get: jest.fn(),
// }));


// jest.mock("@apollo/client", () => ({
//   gql: jest.fn(),
//   useMutation: jest.fn(),
// }));


// jest.mock("react-redux", () => ({
//   useDispatch: jest.fn(),
// }));

// describe("Item Component", () => {
//   let mockDispatch;
//   let mockRemoveProductMutation;

//   beforeEach(() => {
    
//     mockDispatch = jest.fn();
//     jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);

   
//     Cookies.get.mockImplementation((key) => {
//       if (key === "jwt_token") return "test-jwt-token";
//       if (key === "user") return JSON.stringify({ id: 1, is_admin: false });
//       return null;
//     });

   
//     mockRemoveProductMutation = jest.fn();
//     useMutation.mockReturnValue([mockRemoveProductMutation, {}]);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("renders product details", () => {
//     const product = {
//       id: 1,
//       image_url: "product-image.jpg",
//       price: 100,
//       name: "Product 1",
//     };

//     render(
//       <Provider store={configureStore()}>
//         <Item product={product} />
//       </Provider>
//     );

    
//     expect(screen.getByAltText("Product 1")).toBeInTheDocument();
//     expect(screen.getByText("$100")).toBeInTheDocument();
//     expect(screen.getByText("Product 1")).toBeInTheDocument();
//   });

//   test("does not show delete button for non-admin users", () => {
//     const product = {
//       id: 1,
//       image_url: "product-image.jpg",
//       price: 100,
//       name: "Product 1",
//     };

//     render(
//       <Provider store={configureStore()}>
//         <Item product={product} />
//       </Provider>
//     );

    
//     expect(screen.queryByText("Delete Product")).toBeNull();
//   });

//   test("shows delete button for admin users", () => {
    
//     Cookies.get.mockImplementationOnce((key) => {
//       if (key === "jwt_token") return "test-jwt-token";
//       if (key === "user") return JSON.stringify({ id: 1, is_admin: true });
//       return null;
//     });

//     const product = {
//       id: 1,
//       image_url: "product-image.jpg",
//       price: 100,
//       name: "Product 1",
//     };

//     render(
//       <Provider store={configureStore()}>
//         <Item product={product} />
//       </Provider>
//     );

  
//     expect(screen.getByText("Delete Product")).toBeInTheDocument();
//   });

//   test("calls removeProduct mutation and dispatches removeproduct action on delete", async () => {
//     const product = {
//       id: 1,
//       image_url: "product-image.jpg",
//       price: 100,
//       name: "Product 1",
//     };

//     render(
//       <Provider store={configureStore()}>
//         <Item product={product} />
//       </Provider>
//     );

   
//     fireEvent.click(screen.getByText("Delete Product"));

    
//     expect(mockRemoveProductMutation).toHaveBeenCalledWith({
//       variables: { id: 1 },
//       context: { headers: { Authorization: "Bearer test-jwt-token" } },
//     });

   
//     expect(mockDispatch).toHaveBeenCalledWith(removeproduct({ id: 1 }));
//   });
// });
