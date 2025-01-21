import React from "react";
import { render, screen } from "@testing-library/react";
import Contactus from "./Contactus.js";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';
test("checking cart component", () => {
  render(
    <Router>
      <Contactus />
    </Router>
  );

  const contactText = screen.getByText(/Contact us at : Dummy@gmail.com/i);
  expect(contactText).toBeInTheDocument();
});
