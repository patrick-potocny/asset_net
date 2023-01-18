import { render, screen } from "@testing-library/react";
import React from "react";
import SearchResults from "../components/SearchResults";
import { AssetDataCtx } from "../AssetDataCtx";
import { DarkModeCtx } from "../DarkModeCtx";
import { getSearchResults } from "../lib/apiHandler";

const onCloseMock = jest.fn();
const setAssetDataMock = jest.fn();

jest.mock("../lib/apiHandler", () => ({
  getSearchResults: jest.fn(() =>
    Promise.resolve([
      { id: "mockId", symbol: "BTC", name: "Bitcoin" },
      { id: "mockId2", symbol: "ETH", name: "Etherium" },
    ])
  ),
}));

describe("SearchResults component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render search results when value is passed", async () => {
    render(
      <DarkModeCtx.Provider value={{ darkMode: false }}>
        <AssetDataCtx.Provider value={{ setAssetData: setAssetDataMock }}>
          <SearchResults
            value="test"
            assetType="crypto"
            onClose={onCloseMock}
          ></SearchResults>
        </AssetDataCtx.Provider>
      </DarkModeCtx.Provider>
    );

    // check if api call was made with correct params
    expect(getSearchResults).toHaveBeenCalledWith("test", "crypto");

    await screen.findByText("BTC");
    await screen.findByText("ETH");
  });

  test("should render error message", async () => {
    getSearchResults.mockRejectedValueOnce(new Error("Async error message"));

    render(
      <DarkModeCtx.Provider value={{ darkMode: false }}>
        <AssetDataCtx.Provider value={{ setAssetData: setAssetDataMock }}>
          <SearchResults
            value="test"
            assetType="crypto"
            onClose={onCloseMock}
          ></SearchResults>
        </AssetDataCtx.Provider>
      </DarkModeCtx.Provider>
    );

    await screen.findByText("Oops, something went wrong Please try again");
  });

  test("should render loading spinner animation", async () => {
    getSearchResults.mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: "mockId", symbol: "BTC", name: "Bitcoin" },
            { id: "mockId2", symbol: "ETH", name: "Etherium" },
          ]);
        }, 9000);
      });
    });

    render(
      <DarkModeCtx.Provider value={{ darkMode: false }}>
        <AssetDataCtx.Provider value={{ setAssetData: setAssetDataMock }}>
          <SearchResults
            value="test"
            assetType="crypto"
            onClose={onCloseMock}
          ></SearchResults>
        </AssetDataCtx.Provider>
      </DarkModeCtx.Provider>
    );

    await screen.findByTestId("spinner");
  });
});
