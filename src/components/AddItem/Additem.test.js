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
    useQuery:jest.fn().mockReturnValue([jest.fn(), { data: null, loading: false, error: null }])
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

  test("test 2 for form submission", async () => {
    const add = jest.fn();
    const mockAddProduct = jest.fn().mockResolvedValue({
      data: { insert_products_one: { id: 1, name: "Test Product" } },
    });
    
   
    require("@apollo/client").useMutation.mockReturnValue([mockAddProduct, { data: null, loading: false, error: null }]);

    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <AddProduct />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );

    const productNameInput = screen.getByLabelText(/Product Name:/i);
    const productDescriptionInput =
      screen.getByLabelText(/Product Description:/i);
    const productPriceInput = screen.getByLabelText(/Product Price:/i);
    const quantityInput = screen.getByLabelText(/Quantity:/i);
    const submitButton = screen.getByText(/Add Product/i);

    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    fireEvent.change(productDescriptionInput, {
      target: { value: "Test product description" },
    });
    fireEvent.change(productPriceInput, { target: { value: 100 } });
    fireEvent.change(quantityInput, { target: { value: 10 } });

    fireEvent.click(submitButton);
    expect(mockAddProduct).toHaveBeenCalledTimes(1);
  });
});
