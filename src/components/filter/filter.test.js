import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./Filter.js";
import { useDispatch } from "react-redux";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Filter Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  test("renders all checkbox options with correct labels", () => {
    render(<Filter />);

    const electronicsCheckbox = screen.getByLabelText(/electronics/i);
    const accessoriesCheckbox = screen.getByLabelText(/accessories/i);
    const homeAppliancesCheckbox = screen.getByLabelText(/home applicances/i);

    expect(electronicsCheckbox).toBeInTheDocument();
    expect(accessoriesCheckbox).toBeInTheDocument();
    expect(homeAppliancesCheckbox).toBeInTheDocument();
  });

  test("dispatches addtocategories action when 'Electronics' checkbox is checked", () => {
    render(<Filter />);

    const electronicsCheckbox = screen.getByLabelText(/electronics/i);
    fireEvent.click(electronicsCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "categories/addtocategories",
      payload: "Electronics",
    });
  });

  test("dispatches removefromcategories action when 'Electronics' checkbox is unchecked", () => {
    render(<Filter />);

    const electronicsCheckbox = screen.getByLabelText(/electronics/i);
    fireEvent.click(electronicsCheckbox); // Check
    fireEvent.click(electronicsCheckbox); // Uncheck

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "categories/removefromcategories",
      payload: "Electronics",
    });
  });

  test("dispatches addtocategories action for 'Accessories' checkbox", () => {
    render(<Filter />);

    const accessoriesCheckbox = screen.getByLabelText(/accessories/i);
    fireEvent.click(accessoriesCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "categories/addtocategories",
      payload: "Accessories",
    });
  });

  test("dispatches removefromcategories action for 'Accessories' checkbox", () => {
    render(<Filter />);

    const accessoriesCheckbox = screen.getByLabelText(/accessories/i);
    fireEvent.click(accessoriesCheckbox);
    fireEvent.click(accessoriesCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "categories/removefromcategories",
      payload: "Accessories",
    });
  });

  test("dispatches addtocategories action for 'Home Applicances' checkbox", () => {
    render(<Filter />);

    const homeAppliancesCheckbox = screen.getByLabelText(/home applicances/i);
    fireEvent.click(homeAppliancesCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "categories/addtocategories",
      payload: "Home Applicances",
    });
  });

  test("dispatches removefromcategories action for 'Home Applicances' checkbox", () => {
    render(<Filter />);

    const homeAppliancesCheckbox = screen.getByLabelText(/home applicances/i);
    fireEvent.click(homeAppliancesCheckbox);
    fireEvent.click(homeAppliancesCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "categories/removefromcategories",
      payload: "Home Applicances",
    });
  });

  test("toggles checkbox state correctly", () => {
    render(<Filter />);

    const electronicsCheckbox = screen.getByLabelText(/electronics/i);

    // Initially unchecked
    expect(electronicsCheckbox.checked).toBe(false);

    fireEvent.click(electronicsCheckbox); // Check
    expect(electronicsCheckbox.checked).toBe(true);

    fireEvent.click(electronicsCheckbox); // Uncheck
    expect(electronicsCheckbox.checked).toBe(false);
  });
});
