import React from "react";
import {screen,render,fireEvent} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import Productdetails from "./Productdetails";
import {  useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import { store } from "../../Reduxstore/store";
import { ApolloProvider } from "@apollo/client";
import {client} from '../../index'

jest.mock("@apollo/client", () => ({
    ...jest.requireActual("@apollo/client"),
  useQuery: jest.fn(),

}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
  }));

describe("test for product details component", ()=>{
    test("verifying loading ",async()=>{

        useParams.mockReturnValue({ id: "1" });
        useQuery.mockReturnValue({
            data: null,
            loading: true,
            error: null,
          });
  
    render(<Productdetails/>)
    expect( screen.getByText(/loading/i)).toBeInTheDocument();

    })  
   
    test("verifying error ",async()=>{

        useParams.mockReturnValue({ id: "1" });
        useQuery.mockReturnValue({
            data: null,
            loading: false,
            error: new Error("error"),
          });
  
    
          render(<Productdetails/>)
    
    expect( screen.getByText(/error/i)).toBeInTheDocument();
    })  
   
    test("verifying data ",async()=>{
        const mockData = {
            products_by_pk: {
              id: 1,
              name: "laptop",
              price: 100,
              description: "nice",
              image_url: "https://via.placeholder.com/150",
            },
          };
        useParams.mockReturnValue({ id: "1" });
        useQuery.mockReturnValue({
            data: mockData,
            loading: false,
            error: null
          });

        render(
          <ApolloProvider client={client}>
            <Provider store={store}>
              <BrowserRouter>
                <Productdetails/>
              </BrowserRouter>
            </Provider>
          </ApolloProvider>
        )
      
          await waitFor(() => screen.getByText(/laptop/i));

          // Assertions
          expect(screen.getByText(/laptop/i)).toBeInTheDocument();
          expect(screen.getByText(/nice/i)).toBeInTheDocument();
          expect(screen.getByText(/\$100/i)).toBeInTheDocument();


    })  












})


