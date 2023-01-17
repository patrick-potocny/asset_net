/* eslint-disable */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AssetCard from "../components/AssetCard";
import { AssetDataCtx } from "../AssetDataCtx";
import userEvent from "@testing-library/user-event";
import { updateTf } from "../lib/utlis";

jest.mock("../components/LineChart", () =>
  jest.fn(() => <div>Line Chart</div>)
);
jest.mock("../components/Modal", () => ({ isOpen, onClose }) => (
  <div data-testid="mock-modal">isOpen is {isOpen.toString()}</div>
));
jest.mock("../lib/utlis", () => {
  return {
    updateTf: jest.fn(),
  };
});

const asset = {
  symbol: "BTC",
  name: "Bitcoin",
  price: "21088.66",
  change: "1.15",
  rising: true,
  id: "Qwsogvtv82FCd",
  assetType: "crypto",
  timeFrame: "1D",
  sparkline: {
    labels: [],
    data: [],
  },
};

describe("AssetCard component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <AssetDataCtx.Provider value={{ assetData: [], setAssetData: jest.fn() }}>
        <AssetCard asset={asset} />
      </AssetDataCtx.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test("should render modal when remove icon is clicked", () => {
    render(
      <AssetDataCtx.Provider value={{ assetData: [], setAssetData: jest.fn() }}>
        <AssetCard asset={asset} />
      </AssetDataCtx.Provider>
    );
    expect(screen.getByText("isOpen is false")).toBeInTheDocument();

    userEvent.click(screen.getByAltText("remove"));

    expect(screen.getByText("isOpen is true")).toBeInTheDocument();
  });

  test("should call updateTf function when button is clicked", () => {
    render(
      <AssetDataCtx.Provider value={{ assetData: [], setAssetData: jest.fn() }}>
        <AssetCard asset={asset} />
      </AssetDataCtx.Provider>
    );

    userEvent.click(screen.getByText("1M"));

    expect(updateTf).toHaveBeenCalled();
  });
});
