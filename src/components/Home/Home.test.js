import React from "react";
import { render, screen } from "@testing-library/react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Home from "./Home.js"; 
import { setproductdetails, SetHasRun } from "../../Slices/productsslice";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock("react-redux", () => ({
    ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector:jest.fn(),
}));

jest.mock("@apollo/client", () => ({
    ...jest.requireActual("@apollo/client"),
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));
describe("Home", () => {
  test("renders loading state correctly", () => {
    useQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
   render(
        <BrowserRouter>
       <Home  />
      </BrowserRouter>
      );
    expect(screen.getAllByText(/loading/i)[0]).toBeInTheDocument();
  });
;   

test("renders error state correctly", () => {
    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error("network issue"),
    });
   render(
        <BrowserRouter>
       <Home  />
      </BrowserRouter>
      );
      expect(screen.getAllByText(/network issue/i)[0]).toBeInTheDocument();
  });


      
           
        });


   
       










