/* eslint-disable */
import React from "react";
import { render, screen } from "@testing-library/react";
import { AssetDataCtx } from "../AssetDataCtx";
import Assets from "../components/Assets";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../components/AssetCard", () => ({ asset }) => (
  <div data-testid="asset-card">{asset.name}</div>
));

jest.mock("../components/Modal", () => ({ isOpen, onClose }) => (
  <div data-testid="mock-modal">isOpen is {isOpen.toString()}</div>
));

const mockAssetData = [
  { name: "BTC", assetType: "crypto" },
  { name: "AAPL", assetType: "stocks" },
  { name: "MSFT", assetType: "stocks" },
];

describe("Assets component", () => {
  test('should render properly', () => {
    const { container } = render(
      <AssetDataCtx.Provider value={{ assetData: mockAssetData }}>
        <Assets assetType="stocks" />
      </AssetDataCtx.Provider>
    );

    expect(container).toMatchSnapshot()
  });

  test("should render assets based on assetType", () => {
    render(
      <AssetDataCtx.Provider value={{ assetData: mockAssetData }}>
        <Assets assetType="stocks" />
      </AssetDataCtx.Provider>
    );

    expect(screen.queryAllByTestId("asset-card").length).toBe(2);
    expect(screen.getByText("AAPL")).toBeInTheDocument();
  });

  test("should display all assets", () => {
    render(
      <AssetDataCtx.Provider value={{ assetData: mockAssetData }}>
        <Assets assetType="all_assets" />
      </AssetDataCtx.Provider>
    );

    expect(screen.queryAllByTestId("asset-card").length).toBe(3);
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("AAPL")).toBeInTheDocument();
  });

  test("should change modals prop after clicking on add button", () => {
    render(
      <AssetDataCtx.Provider value={{ assetData: mockAssetData }}>
        <Assets assetType="stocks" />
      </AssetDataCtx.Provider>
    );

    expect(screen.queryByText('isOpen is false')).toBeInTheDocument()

    userEvent.click(screen.getByAltText('Add'))

    expect(screen.queryByText('isOpen is true')).toBeInTheDocument()
  });
});
