import moment from "moment-timezone";
import { updateAsset } from "./localStorageHandler";
import { getAssetData } from "./apiHandler";

// Rolling api keys to avoid too much requests error(429)
function createKeyIterator() {
  const apiKeys = [
    process.env.REACT_APP_API_KEY_1,
    process.env.REACT_APP_API_KEY_2,
    process.env.REACT_APP_API_KEY_3,
    process.env.REACT_APP_API_KEY_4
  ]
  let currentIndex = 0;

  return function() {
    const nextValue = apiKeys[currentIndex];
    currentIndex = (currentIndex + 1) % apiKeys.length;
    return nextValue;
  }
}
// Sorts assetData Ctx based on localstorage
function sortAssetData(assetData) {
  const sortBy = JSON.parse(localStorage.getItem("assetList"));
  assetData.sort(function (a, b) {
    return (
      sortBy.findIndex((item) => item.id === a.id) -
      sortBy.findIndex((item) => item.id === b.id)
    );
  });
}

function calculateChange(latestPrice, earliestPrice) {
  if (earliestPrice === 0) return 0;
  const change = ((latestPrice - earliestPrice) / earliestPrice) * 100;
  return parseFloat(change).toFixed(2);
}

function tickCallback(val) {
  if (val === 0) {
    val;
  } else if (val < 0.0001) {
    val = parseFloat(val).toFixed(7);
  } else if (!Number.isInteger(val)) {
    // rounds float to last 3 decimals and removes trainling 0s
    val = parseFloat(parseFloat(val).toFixed(3));
  }
  return val + "$";
}

async function updateTf(id, newTf, assetData, setAssetData) {
  // Updates localStorage
  const updatedAsset = updateAsset(id, newTf);
  // Updates assetData
  let updatedData = await getAssetData(updatedAsset);
  const updatedAssetData = assetData.map((item) =>
    item.id === id ? updatedData : item
  );
  setAssetData(updatedAssetData);
}

// CRYPTO
const cryptoTimeFrames = {
  "1D": "24h",
  "1W": "7d",
  "1M": "30d",
  "3M": "3m",
  "1Y": "1y",
  "3Y": "3y",
};

function processCryptoData(data, asset) {
  let processedData = {
    symbol: data.data.coin.symbol,
    name: data.data.coin.name,
    price:
      parseFloat(data.data.coin.price) > 100
        ? parseFloat(data.data.coin.price).toFixed(2)
        : parseFloat(data.data.coin.price).toFixed(7),
    change: data.data.coin.change,
    rising: true,
    id: asset.id,
    assetType: asset.assetType,
    timeFrame: asset.timeFrame,
    sparkline: {
      labels: generateCryptoLabels(asset.timeFrame),
      data: Object.values(data.data.coin.sparkline),
    },
  };

  // checks if price is not null or zero meaning the coin is deprecated
  if (data.data.coin.price && data.data.coin.change) {
    if (processedData.change.includes("-")) {
      processedData.rising = false;
      processedData.change = processedData.change.substring(1);
    }
  } else {
    processedData.name = "Not avalible";
    processedData.price = 0;
    processedData.sparkline = {};
  }

  return processedData;
}

function generateCryptoLabels(timeFrame) {
  let labels = [];
  const currentTime = new Date();

  switch (timeFrame) {
    case "1D":
      for (let i = 0; i < 24; i++) {
        const timestamp = new Date(currentTime);
        timestamp.setHours(timestamp.getHours() - 1 * i);
        timestamp.setMinutes(0);
        timestamp.setSeconds(0);
        labels.push(`${timestamp.getHours()}:00`);
      }
      break;

    case "1W":
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleString("default", { weekday: "short" });
        for (let i = 0; i < 3; i++) {
          labels.push(dayName.slice(0, 3));
        }
      }
      for (let i = 0; i < 3; i++) {
        labels.push(labels[labels.length - 1]);
      }
      break;

    case "1M":
      for (let i = 0; i < 24; i++) {
        const pastDate = new Date(
          currentTime.getTime() - i * 24 * 60 * 60 * 1000
        );
        const pastDateString = pastDate.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
        });
        labels.push(pastDateString);
      }
      break;

    case "3M":
      for (let i = 0; i < 3; i++) {
        const date = new Date();
        date.setMonth(currentTime.getMonth() - i);
        const month = date.toLocaleString("default", { month: "long" });
        for (let i = 0; i < 8; i++) {
          labels.push(month.slice(0, 3));
        }
      }
      break;

    case "1Y":
      for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setMonth(currentTime.getMonth() - i);
        const month = date.toLocaleString("default", { month: "long" });
        for (let i = 0; i < 2; i++) {
          labels.push(month.slice(0, 3));
        }
      }
      break;

    case "3Y":
      for (let i = 0; i < 3; i++) {
        const date = new Date();
        date.setFullYear(currentTime.getFullYear() - i);
        const year = date.getFullYear();
        for (let i = 0; i < 8; i++) {
          labels.push(year);
        }
      }
      break;
  }

  labels.reverse().unshift("");
  return labels;
}

function processCryptoSearch(data) {
  const results = [];
  for (const coin of data.data.coins) {
    results.push({
      id: coin.uuid,
      symbol: coin.symbol,
      name: coin.name,
    });
  }

  return results.slice(0, 4);
}

// STOCKS
const stocksTimeFrames = {
  "1D": "TIME_SERIES_INTRADAY",
  "1W": "TIME_SERIES_DAILY",
  "1M": "TIME_SERIES_DAILY",
  "3M": "TIME_SERIES_WEEKLY",
  "1Y": "TIME_SERIES_MONTHLY",
  "3Y": "TIME_SERIES_MONTHLY",
};

const stocksDateFormating = {
  "1D": [16, "HH:mm"],
  "1W": [7, "ddd"],
  "1M": [24, "D/M"],
  "3M": [15, "MMM"],
  "1Y": [13, "MMM"],
  "3Y": [37, "YYYY"],
};

function processStocksData(data, asset) {
  const prices = processStocksPrices(
    data[Object.keys(data)[1]],
    asset.timeFrame
  );
  const latestPrice = prices[Object.keys(prices)[0]];
  const earliestPrice =
    prices[Object.keys(prices)[Object.keys(prices).length - 1]];
  const labels = Object.keys(prices).reverse();
  labels[0] = "";
  const sparklineData = Object.values(prices).reverse();

  let processedData = {
    symbol: asset.id,
    name: asset.name,
    price:
      parseFloat(latestPrice) > 100
        ? parseFloat(latestPrice).toFixed(2)
        : parseFloat(latestPrice).toFixed(7),
    change: calculateChange(latestPrice, earliestPrice),
    id: asset.id,
    assetType: asset.assetType,
    timeFrame: asset.timeFrame,
    sparkline: {
      labels: labels,
      data: sparklineData,
    },
  };
  processedData.rising = processedData.change > 0 ? true : false;
  return processedData;
}

function processStocksPrices(pricesObj, timeFrame) {
  const processedPrices = {};

  function getFirstNprices(n) {
    const array = Object.entries(pricesObj);
    const firstNprices = array.slice(0, n);
    const newObj = Object.fromEntries(firstNprices);
    return newObj;
  }

  // Converts datetime to users TZ because API outputs in NewYork TZ
  function convertToCurrentTZ(prices, format) {
    for (const key in prices) {
      const easternDate = moment.tz(key, "America/New_York");
      const newDate = easternDate.clone().tz(moment.tz.guess());
      processedPrices[newDate.format(format)] = prices[key]["4. close"];
    }
  }

  const prices = getFirstNprices(stocksDateFormating[timeFrame][0]);
  convertToCurrentTZ(prices, stocksDateFormating[timeFrame][1]);

  return processedPrices;
}

function processStocksSearch(data) {
  const results = [];
  for (const stock of data.bestMatches) {
    // Other regions are not supported
    if (stock["4. region"] === "United States" && stock['3. type'] === "Equity") {
      results.push({
        id: stock["1. symbol"],
        symbol: stock["1. symbol"],
        name: stock["2. name"],
      });
    }
  }
  return results.slice(0, 4);
}

export {
  processCryptoData,
  processCryptoSearch,
  cryptoTimeFrames,
  sortAssetData,
  stocksTimeFrames,
  processStocksData,
  processStocksSearch,
  tickCallback,
  createKeyIterator,
  updateTf
};
