import React from "react";
import {render, screen} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import Headfor from "./Headfor.js";
import '@testing-library/jest-dom';

 test ("checking Headfor",()=>{
    render(
        <BrowserRouter>
          <Headfor />
          </BrowserRouter>

      );
      const text= screen.getByText(/Home/i)
      expect (text).toBeInTheDocument();
})

