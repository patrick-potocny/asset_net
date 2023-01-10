function processCryptoData(data, asset) {
  let processedData = {
    symbol: data.data.coin.symbol,
    name: data.data.coin.name,
    price: parseFloat(data.data.coin.price).toFixed(2),
    change: data.data.coin.change,
    id: asset.id,
    assetType: asset.assetType,
    timeFrame: asset.timeFrame,
    sparkline: {
      labels: generateCryptoLabels(asset.timeFrame),
      data: Object.values(data.data.coin.sparkline)
    }
  }

  return processedData
}

function generateCryptoLabels(timeFrame) {
  let labels = []
  const currentTime = new Date();

  switch (timeFrame) {
    case '1D':
      for (let i = 0; i < 24; i++) {
        const timestamp = new Date(currentTime);
        timestamp.setHours(timestamp.getHours() - (1 * i));
        timestamp.setMinutes(0);
        timestamp.setSeconds(0);
        labels.push(`${timestamp.getHours()}:00`);
      }
      break;
    
    case '1W':
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleString('default', { weekday: 'short' });
        for (let i = 0; i < 3; i++) {
          labels.push(dayName.slice(0, 3))
        }
      }
      for (let i = 0; i < 3; i++) {
        labels.push(labels[labels.length - 1])
      }
      break;

    case '1M':
      for (let i = 0; i < 24; i++) {
        const pastDate = new Date(currentTime.getTime() - i * 24 * 60 * 60 * 1000);
        const pastDateString = pastDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit'});
        labels.push(pastDateString);
      }
      break;

    case "6M":
      for (let i = 0; i < 6; i++) {
        const date = new Date();
        date.setMonth(currentTime.getMonth() - i);
        const month = date.toLocaleString('default', { month: 'long' });
        for (let i = 0; i < 4; i++) {
          labels.push(month.slice(0, 3))
        }
      }
      break;
    
    case "1Y":
      for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setMonth(currentTime.getMonth() - i);
        const month = date.toLocaleString('default', { month: 'long' });
        for (let i = 0; i < 2; i++) {
          labels.push(month.slice(0, 3))
        }
      }
      break;

    case "3Y":
      for (let i = 0; i < 3; i++) {
        const date = new Date();
        date.setFullYear(currentTime.getFullYear() - i);
        const year = date.getFullYear()
        for (let i = 0; i < 8; i++) {
          labels.push(year)
        }
      }
      break;
  }

  labels.reverse().unshift("")
  return labels
}

function processCryptoSearch(data) {
  const results = []

  for (const coin of data.data.coins) {
    results.push({
      id: coin.uuid,
      symbol: coin.symbol,
      name: coin.name
    })
  }

  return results.slice(0, 4)
}

export {processCryptoData, processCryptoSearch}