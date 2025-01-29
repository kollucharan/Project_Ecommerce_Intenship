
import React from "react";
import {screen,render,fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import { useMutation,gql,useLazyQuery,ApolloProvider} from "@apollo/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import client from '@apollo/client'
import { BrowserRouter } from "react-router-dom";
import { store } from "../../Reduxstore/store";
 import Cart from "./Cart";

//  const getProductfn = jest.fn()


 jest.mock("@apollo/client", () => ({
    ...jest.requireActual("@apollo/client"),

    useLazyQuery: jest.fn().mockReturnValue([jest.fn()]),
    useMutation: jest.fn().mockReturnValue([jest.fn()])
     

 }));
 

 jest.mock('react-redux',()=>({
    ...jest.requireActual("react-redux"),
    useDispatch :jest.fn(),
    useSelector:jest.fn()
    
 }))

 describe("checking cart component",()=>{
  
   test('test 1 for cart component',()=>{
   
    // useSelector.mockReturnValue([{name:"smartphone",quantity:4,image_url:'dummyurl.png'}])
    useSelector.mockReturnValue([]);
    render(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
            <Cart />
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      );
   
      expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();

   }) 

   test ('test 2 for cart component',()=>{

       useSelector.mockReturnValue([{name:"smartphone",quantity:4,image_url:'dummyurl.png'}])
       render(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
            <Cart />
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      ); 

      expect(screen.getByText('smartphone')).toBeInTheDocument();
      expect(screen.getByText(4)).toBeInTheDocument();
      expect(screen.getByText('-')).toBeInTheDocument();
      expect(screen.getByText('+')).toBeInTheDocument();


   }) 
   
   test (' test 3 for cart component',()=>{

    
   })








 })
