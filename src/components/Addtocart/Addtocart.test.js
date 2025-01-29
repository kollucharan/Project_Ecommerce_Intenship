
import React from 'react'
import {screen,render,fireEvent} from '@testing-library/react'
import {ApolloProvider,useLazyQuery} from '@apollo/client'
import { Provider } from 'react-redux' 
import { BrowserRouter } from 'react-router-dom' 
import client from '@apollo/client' 
import { store } from '../../Reduxstore/store'
import "@testing-library/jest-dom";
import AddToCart from './Addtocart'

jest.mock("@apollo/client",()=>({
    useLazyQuery:jest.fn()

}))

describe("tests for Add to cart component",()=>{
 
 test('checking Add to cart',()=>{

  const mock_data_to_test ={
  
    id:16,
    name:"smart",
    description:"good looking",
    price:18

  }

    render(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
             <AddToCart />
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      );
   
    
    })





})