import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";
import '@testing-library/jest-dom/extend-expect';

describe("Header component", () => {
  test("renders the correct logo based on dark mode state", () => {
    render(<Header />);

    // Check that the logoDark is rendered
    expect(screen.getByAltText("AssetNet")).toHaveAttribute("src", "logoDark.svg");
    // Check that the icon is rendered
    expect(screen.getByAltText("mode-icon")).toBeInTheDocument();

    // Toggle dark mode
    fireEvent.click(screen.getByAltText("mode-icon").closest("label"));

    // Check that the logoDark is rendered
    expect(screen.getByAltText("AssetNet")).toHaveAttribute("src", "logoLight.svg");
  });

  test("toggles dark mode when the toggle is clicked", () => {
    render(<Header />);

    // Check that light mode is enabled
    expect(screen.getByTestId("dark-mode-toggle")).not.toBeChecked();

    // Toggle dark mode
    fireEvent.click(screen.getByAltText("mode-icon").closest("label"));

    // Check that dark mode is now enabled
    expect(screen.getByTestId('dark-mode-toggle')).toBeChecked();
  });

  test("saves the mode in local storage", () => {
    render(<Header />);
    
    expect(localStorage.getItem("darkMode")).toBe("false");
  });
});
