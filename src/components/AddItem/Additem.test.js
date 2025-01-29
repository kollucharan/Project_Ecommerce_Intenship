import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import client from "@apollo/client";
import { ApolloProvider, useMutation } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import AddProduct from "./Additem";
import { Provider } from "react-redux";
import { store } from "../../Reduxstore/store";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useMutation: jest.fn(),
  gql: jest.fn(),
}));

describe("testing of AddProduct Component", () => {
  test("basic test to check rendering", () => {

     useMutation.





    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <AddProduct />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );

    expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Description:/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Price:/i)).toBeInTheDocument();
    expect(screen.getByText(/Category:/i)).toBeInTheDocument();
    expect(screen.getByText(/Image Url :/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
  });
  


});
