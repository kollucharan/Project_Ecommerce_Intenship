
import React from "react";
import {render, screen} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import HeadforCart from "./Headforcart.js";
import '@testing-library/jest-dom';


test("checking Head for cart", () => {
  render(
    <BrowserRouter>
      <HeadforCart />
      </BrowserRouter>
  );
  const tempdata = screen.getByText(/Home/i);
  expect(tempdata).toBeInTheDocument();
});
