 
 import {render, screen,fireEvent} from '@testing-library/react'
 import Productlist from './Productslist'
 import { BrowserRouter } from 'react-router-dom'
 import { ApolloProvider,useQuery } from '@apollo/client'
 import client from '@apollo/client'
 import {store }from '../../Reduxstore'
 import { Provider } from 'react-redux'


jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
useQuery: jest.fn(),
gql: jest.fn(),
}));


 describe('testing productslist component',()=>{
  
 test ("test 1 for products",()=>{ 
  useQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });  

    render( <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
        <Productlist />
        </BrowserRouter>
      </Provider>
    </ApolloProvider> ) 

  
    // expect(screen.getAllByText(/loading/i)[0]).toBeInTheDocument();

     expect(screen.getByText(/loading/i)).toBeInTheDocument();
      
       })

   
  })
