import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import  { useQuery, gql, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { store } from "../../Reduxstore/store";
import Productdetails from "./Productdetails";
// import { client } from "../../index";
import client from '@apollo/client'

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useQuery: jest.fn(),
  gql: jest.fn(),
}));


describe("testing of product details component", () => {
  test("test for loading", () => {
   useQuery.mockReturnValue({
        data: null,
        loading: true,
        error: null,
      });


    render(

         <ApolloProvider client={client}>
           <Provider store={store}>
             <BrowserRouter>
               <Productdetails/>
             </BrowserRouter>
           </Provider>
         </ApolloProvider>
       );

       expect(screen.getByText(/loading/i)).toBeInTheDocument();

  });

  test("test for error handling",()=>{

    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error ("unknown error"),
    });

    render(

      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Productdetails/>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );
  
    expect(screen.getByText(/unknown error/i)).toBeInTheDocument();

  })

  test("test for data is rendering correctly or not",()=>{

     


  })



});
