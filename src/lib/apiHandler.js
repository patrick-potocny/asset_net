import {
  processCryptoData,
  processCryptoSearch,
  cryptoTimeFrames,
  stocksTimeFrames,
  processStocksData,
  processStocksSearch,
  sortAssetData,
} from "./utlis";
import axios from "axios";
// import { createKeyIterator } from "./utlis";

// const keyIterator = createKeyIterator()

async function makeApiCall(options) {
  try {
    const response = await axios.request(options);
    return response;
  } catch (e) {
    if (e.response.status === 429) {
      alert(
        "Too many requests\nThis app uses free APIs that limits the requests per minute.\nTry again in a minute"
      );
    }
    return {};
  }
}

async function getAssetsData() {
  const assetList = JSON.parse(localStorage.getItem("assetList"));
  let assetData = [];

  await Promise.all(
    assetList.map(async (asset) => {
      const data = await getAssetData(asset);
      assetData.push(data);
    })
  );

  sortAssetData(assetData);
  return assetData;
}

async function getAssetData(asset) {
  let assetData = {};
  switch (asset.assetType) {
    case "crypto": {
      const options = {
        method: "GET",
        url: `https://coinranking1.p.rapidapi.com/coin/${asset.id}`,
        params: { timePeriod: cryptoTimeFrames[asset.timeFrame] },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      const data = await makeApiCall(options);
      assetData = processCryptoData(data.data, asset);
      break;
    }
    case "stocks": {
      const options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          function: stocksTimeFrames[asset.timeFrame],
          symbol: asset.id,
          datatype: "json",
          output_size: "compact",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
        },
      };

      if (options.params.function === "TIME_SERIES_INTRADAY")
        options.params.interval = "60min";

      const data = await makeApiCall(options);
      assetData = processStocksData(data.data, asset);
      break;
    }
  }
  return assetData;
}

async function  getSearchResults(query, assetType) {
  switch (assetType) {
    case "crypto": {
      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/search-suggestions",
        params: { query: query },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      const response = await makeApiCall(options);
      return processCryptoSearch(response.data);
    }
    case "stocks": {
      const options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          keywords: query,
          function: "SYMBOL_SEARCH",
          datatype: "json",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
        },
      };

      const response = await makeApiCall(options);
      return processStocksSearch(response.data);
    }
  }
}

export { getAssetsData, getAssetData, getSearchResults };
