import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddProduct from "./Additem";
import { ApolloProvider, useMutation } from "@apollo/client";
import client from "@apollo/client";
import { store } from "../../Reduxstore/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useMutation: jest
    .fn()
    .mockReturnValue([jest.fn(), { data: null, loading: false, error: null }]),
}));

describe("testing Add item Component", () => {
  test("test 1 for add item component", () => {
    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <AddProduct />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );

    expect(screen.getByText(/Product Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Description:/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Description:/i)).toBeInTheDocument();
    expect(screen.getByText(/Category:/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantity:/i)).toBeInTheDocument();
  });
  test ("test 2 for add item comonent",()=>{
 
   
  
   
  });
  })
