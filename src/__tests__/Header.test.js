import React from "react";
import { render } from "@testing-library/react";
import { DarkModeCtx } from "../DarkModeCtx";
import Header from "../components/Header";
import {screen} from '@testing-library/dom'
import userEvent from "@testing-library/user-event";

describe('Header component', () => {
  test('should match snapshot', () => {
    const { container } = render(
      <DarkModeCtx.Provider value={{ darkMode: false, setDarkMode: jest.fn() }}>
        <Header />
      </DarkModeCtx.Provider>
    );
    
    expect(container).toMatchSnapshot();
  });

  test("call context with true when toggle is clicked", () => {
    const setDarkMode = jest.fn()
  
    render(
      <DarkModeCtx.Provider value={{ darkMode: false, setDarkMode }}>
        <Header />
      </DarkModeCtx.Provider>
    );
  
    const toggle = screen.getByTestId("dark-mode-toggle");
    expect(toggle.checked).toEqual(false);
  
    userEvent.click(toggle)
    expect(setDarkMode).toHaveBeenCalledWith(true)
  });
});