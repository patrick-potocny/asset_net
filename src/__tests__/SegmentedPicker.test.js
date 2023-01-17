import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import SegmentedPicker from "../components/SegmentedPicker";
import "@testing-library/jest-dom"

describe('SegmentedPicker component', () => {
  const options = [
    { value: "option1", label: "Option 1", ref: { current: null } },
    { value: "option2", label: "Option 2", ref: { current: null } },
    { value: "option3", label: "Option 3", ref: { current: null } }
  ];
  const controlRef = { current: null };

  test('should properly render SegmentedPicker', () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <SegmentedPicker
        name="test-picker"
        options={options}
        callback={mockCallback}
        controlRef={controlRef}
        defaultOption='option1'
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("should call callback function with correct value and index on input change", () => {
    const mockCallback = jest.fn();

    render(
      <SegmentedPicker
        name="test-picker"
        options={options}
        callback={mockCallback}
        controlRef={controlRef}
        defaultOption='option1'
      />
    );
  
    fireEvent.click(screen.getByLabelText("Option 2"));
    expect(mockCallback).toHaveBeenCalledWith("option2", 1);
  });
});
