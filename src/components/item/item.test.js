
import React from "react";
import client, { useMutation } from "@apollo/client";
import {screen,render,fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import Item from "./item"; 

jest.mock("@apollo/client", () => ({
    ...jest.requireActual("@apollo/client"),
    useMutation: jest.fn().mockReturnValue([jest.fn()])
     

 }));

 describe("testing item component",()=>{
  

    
 


 })
