import { processCryptoData, processCryptoSearch, cryptoTimeFrames } from "./utlis";
import axios from "axios";

async function getAssetsData() {
  const assetList = JSON.parse(localStorage.getItem("assetList"));
  let assetData = [];

  await Promise.all(
    assetList.map(async (asset) => {
      const data = await getAssetData(asset)
      assetData.push(data)
    })
  )
  
  return assetData;
}

async function getAssetData(asset) {
  console.log('fetchin data');
  let assetData = {};

  if (asset.assetType === "crypto") {
    const options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${asset.id}`,
      params: { timePeriod: cryptoTimeFrames[asset.timeFrame]},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_API_KEY,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    const data = await axios.request(options)
    assetData = processCryptoData(data.data, asset);
  } else if (asset.assetType === "stocks") {
    console.log("Getting stocks");
  }
  return assetData;
}

async function getSearchResults(query, assetType) {
  if (assetType === "crypto") {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/search-suggestions",
      params: { query: query },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_CRYPTO_API_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options)
    return processCryptoSearch(response.data)      
  } else if (assetType === "stocks") {
    console.log("searching for stocks");
  }
}

export { getAssetsData, getAssetData, getSearchResults };
