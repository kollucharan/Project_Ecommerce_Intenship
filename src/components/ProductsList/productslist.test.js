import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Productlist from "./Productslist";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "@apollo/client";
import { store } from "../../Reduxstore/store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

describe("testing productslist component", () => {

//  test ("Expect to not log errors in console",()=>{
   
//   const spy = jest.spyOn(global.console, 'error');
   
//   render(
//     <ApolloProvider client={client}>
//       <Provider store={store}>
//         <BrowserRouter> 
//           <Productlist />
//         </BrowserRouter>
//       </Provider>
//     </ApolloProvider>
//   );
   
//   expect(spy).not.toHaveBeenCalled();

//  })


//  test('Should render and match the snapshot', () => {
//   const { container }= render(
//     <ApolloProvider client={client}>
//       <Provider store={store}>
//         <BrowserRouter>
//           <Productlist />
//         </BrowserRouter>
//       </Provider>
//     </ApolloProvider>
//   );
//     expect(container).toMatchSnapshot();
//   });

  test("test 1 for products", () => {
    useQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Productlist />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test ("test2 for error handling",()=>{

    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('temp'),
    });
    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Productlist />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );
    expect(screen.getByText(/temp/i)).toBeInTheDocument();


  })

test ('test for rendering of data ',()=>{

  const mockData = {
    
     
  }

  
})


})