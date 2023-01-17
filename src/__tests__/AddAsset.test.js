/* eslint-disable */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DarkModeCtx } from "../DarkModeCtx";
import AddAsset from "../components/AddAsset";
import userEvent from "@testing-library/user-event";

jest.mock("../components/SegmentedPicker", () => () => (
  <div>Segmented Picker</div>
));
jest.mock("../components/SearchResults", () => () => <div>Search results</div>);
const onClose = jest.fn();

describe("AddAsset component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <DarkModeCtx.Provider value={{ darkMode: false }}>
        <AddAsset onClose={onClose} />
      </DarkModeCtx.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test("should change icon when darkMode is true", () => {
    render(
      <DarkModeCtx.Provider value={{ darkMode: true }}>
        <AddAsset onClose={onClose} />
      </DarkModeCtx.Provider>
    );

    expect(screen.getByAltText("Magnifying glass")).toHaveAttribute(
      "src",
      "searchDarkMode.svg"
    );
  });

  test("should call onClose when back button is clicked", () => {
    render(
      <DarkModeCtx.Provider value={{ darkMode: false }}>
        <AddAsset onClose={onClose} />
      </DarkModeCtx.Provider>
    );

    userEvent.click(screen.getByText("Back"));

    expect(onClose).toHaveBeenCalled();
  });

  test("should display search results when input changes and search button is clicked", () => {
    render(
      <DarkModeCtx.Provider value={{ darkMode: false }}>
        <AddAsset onClose={onClose} />
      </DarkModeCtx.Provider>
    );

    userEvent.type(screen.getByPlaceholderText("Search"), "tsla");
    userEvent.click(screen.getByText("Search"));

    expect(screen.getByText("Search results")).toBeInTheDocument();
  });
});
