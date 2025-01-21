import React from 'react'
import {render, screen,fireEvent} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import Searchbar from './searchbar.js'
import '@testing-library/jest-dom';
 describe("test",()=>{

  test ("test for rendering of search button  ",()=>{
      
    render(<Searchbar/>)
   
       const submitcheck= screen.getByText(/Search/i);
     
       expect (submitcheck).toBeInTheDocument();

    })

    test ("test for search button working ",()=>{
      
    const setSubmittedValue = jest.fn(); 
    render(<Searchbar setSubmittedValue={setSubmittedValue} />); 
       
        const clickcheck= screen.getByText(/Search/i);

        fireEvent.click(clickcheck); 
        expect(setSubmittedValue).toHaveBeenCalled();

        })


  test ("test for search bar  working ",()=>{
    
   //const setSearchTerm = jest.fn(); 

   render(<Searchbar/>)

   const inputElement = screen.getByPlaceholderText("Search by product name");

  
   expect(inputElement).toBeInTheDocument();

   
   fireEvent.change(inputElement, { target: { value: "Laptop" } });

   
   expect(inputElement.value).toBe("Laptop");
        
      })




  })