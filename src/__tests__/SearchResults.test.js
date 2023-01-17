import { render, screen } from "@testing-library/react";
import React from "react";
import SearchResults from "../components/SearchResults";
import { AssetDataCtx } from "../AssetDataCtx";
import { DarkModeCtx } from "../DarkModeCtx";
import { getSearchResults } from "../lib/apiHandler";

const onCloseMock = jest.fn();
const setAssetDataMock = jest.fn();

jest.mock("../lib/apiHandler", () => ({
  getSearchResults: jest.fn(() => [
    { id: "mockId", symbol: "BTC", name: "Bitcoin" },
    { id: "mockId2", symbol: "ETH", name: "Etherium" },
  ]),
  getAssetData: jest.fn(() => Promise.resolve({ id: 1, name: "asset1" })),
}));
jest.mock("../lib/localStorageHandler", () => ({
  addAsset: jest.fn(() => ({ id: 1, name: "asset1", type: "mockType" })),
}));

describe("SearchResults component", () => {
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
});
