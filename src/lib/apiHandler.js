import { processCryptoData, processCryptoSearch } from "./utlis";

function getAssetsData() {
  const assetList = JSON.parse(localStorage.getItem('assetList'))
  let assetData = []

  assetList.forEach(asset => {
    assetData.push(getAssetData(asset))
  });

  return assetData
}

function getAssetData(asset) {
  let assetData = {}

  if (asset.assetType === 'crypto') {
    const data = {
      "status": "success",
      "data": {
        "coin": {
          "uuid": "Qwsogvtv82FCd",
          "symbol": "BTC",
          "name": "Bitcoin",
          "description": "<p>Bitcoin is the first digital currency that allows users to send and receive money, without the interference of a central bank or government. Instead, a network of thousands of peers is controlling the transactions; a decentralized system.</p>\n\n<h3>Why does bitcoin have value?</h3>\n\n<p>Bitcoin&rsquo;s useful qualities (decentralized, borderless, secure) aren&rsquo;t the only reason the coin is worth so much. Due to its scarcity (and it&rsquo;s hard to produce), Bitcoin is often nicknamed &lsquo;Digital Gold&rsquo;, in reference to &lsquo;classic&rsquo; physical gold. Like gold, Bitcoin also has a finite supply of coins available; there will only ever be 21 million bitcoin. And now you know why the creation of new bitcoins is also called mining.</p>\n\n<h3>No inflation in bitcoin</h3>\n\n<p>Bitcoin was invented in response to a few concerns the inventor(s) had, such as inflation. Its supply is limited, so one cannot just devalue the currency by printing more, as governments often do with fiat currencies (USD, EUR, etc.).</p>\n\n<p>As people look for alternative places to keep their money rather than losing value in a negative interest rate account, Bitcoin becomes more appealing. Big global companies, such as Tesla and MicroStrategy already purchased serious amounts of Bitcoin. And it&#39;s only a matter of time that other companies will follow. This also ensures that the value remains or continues to increase.</p>\n\n<h3>Who built Bitcoin</h3>\n\n<p>In 2008, Bitcoin was invented by an anonymous person or group named Satoshi Nakamoto. In 2009, Bitcoin was released as open-source software. Nakamoto&rsquo;s real identity is still unknown, although there are many theories about who it might be. Decentralization is one of Bitcoin&rsquo;s most important principles, and that&rsquo;s why this anonymity is perfectly in line.</p>\n\n<h3>The technology of Bitcoin</h3>\n\n<p>The Bitcoin blockchain is a database, the so-called &lsquo;ledger&rsquo;, that consists of bitcoin transaction records. For new transactions to be added to the ledger, the nodes must agree that the transaction is real and valid. The blockchain is public and contains records of all the transactions taking place.</p>\n\n<h3>How to buy bitcoin?</h3>\n\n<p>Continue reading <a href=\"https://coinranking.com/blog/how-to-buy-your-first-bitcoin/\" rel=\"nofollow noopener\" target=\"_blank\">this blog article</a> on how to buy your first bitcoin.</p>\n",
          "color": "#f7931A",
          "iconUrl": "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
          "websiteUrl": "https://bitcoin.org",
          "links": [
            {
              "name": "bitcoin.org",
              "type": "website",
              "url": "https://bitcoin.org"
            },
            {
              "name": "bitcoinmagazine.com",
              "url": "https://bitcoinmagazine.com/",
              "type": "website"
            },
            {
              "name": "bitcointalk.org",
              "url": "https://bitcointalk.org/",
              "type": "bitcointalk"
            },
            {
              "name": "blockchain.com",
              "url": "https://www.blockchain.com/explorer",
              "type": "explorer"
            },
            {
              "name": "bitcoin/bitcoin",
              "url": "https://github.com/bitcoin/bitcoin",
              "type": "github"
            },
            {
              "name": "r/bitcoin",
              "url": "https://www.reddit.com/r/bitcoin/",
              "type": "reddit"
            },
            {
              "name": "Bitcoin_Magazine",
              "url": "https://t.me/Bitcoin_Magazine",
              "type": "telegram"
            },
            {
              "name": "bitcoin",
              "url": "https://t.me/bitcoin",
              "type": "telegram"
            },
            {
              "name": "Bitcoin Whitepaper",
              "url": "https://bitcoin.org/bitcoin.pdf",
              "type": "whitepaper"
            }
          ],
          "supply": {
            "confirmed": true,
            "supplyAt": 1669711321,
            "max": "21000000",
            "total": "19219662",
            "circulating": "19219662"
          },
          "numberOfMarkets": 3798,
          "numberOfExchanges": 136,
          "24hVolume": "10483825413",
          "marketCap": "321086694328",
          "fullyDilutedMarketCap": "350829300790",
          "price": "16706.16579823919",
          "btcPrice": "1",
          "priceAt": 1672669020,
          "change": "0.92",
          "rank": 1,
          "sparkline": [
            "16549.25",
            "16548.16",
            "16562.08",
            "16575.16",
            "16588.55",
            "16602.66",
            "16604.55",
            "16600.25",
            "16600.21",
            "16609.99",
            "16592.63",
            "16577.05",
            "16580.98",
            "16605.09",
            "16627.78",
            "16628.46",
            "16636.92",
            "16667.64",
            "16700.48",
            "16711.57",
            "16716.77",
            "16720.32",
            "16724.63",
            "16721.93",
            "16707.05"
          ],
          "allTimeHigh": {
            "price": "68763.41083248306",
            "timestamp": 1636502400
          },
          "coinrankingUrl": "https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc",
          "tier": 1,
          "lowVolume": false,
          "listedAt": 1330214400,
          "notices": null,
          "tags": [
            "layer-1",
            "proof-of-work"
          ]
        }
      }
    }
    assetData = processCryptoData(data, asset);
  } else if(asset.assetType === 'stocks') {
    console.log('Getting stocks');      
  }

  return assetData
}

function getSearchResults(query, assetType) {
  let searchResults = {}
  if (assetType === 'crypto') {
    const data = {
      "status": "success",
      "data": {
        "coins": [
          {
            "uuid": "Qwsogvtv82FCd",
            "iconUrl": "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
            "name": "Bitcoin",
            "symbol": "BTC",
            "price": "17205.175647409844"
          },
          {
            "uuid": "x4WXHge-vvFY",
            "iconUrl": "https://cdn.coinranking.com/o3-8cvCHu/wbtc[1].svg",
            "name": "Wrapped BTC",
            "symbol": "WBTC",
            "price": "17233.280887140325"
          },
          {
            "uuid": "upmyKdAQ",
            "iconUrl": "https://cdn.coinranking.com/-7gU0iIDk/hbtc.svg",
            "name": "Huobi BTC",
            "symbol": "HBTC",
            "price": "17222.330237392434"
          },
          {
            "uuid": "h0XuVJXY",
            "iconUrl": "https://cdn.coinranking.com/0Ss-HT19O/btcv.svg",
            "name": "Bitcoin Vault",
            "symbol": "BTCV",
            "price": "2.4953321381769067"
          },
          {
            "uuid": "bS_59f03V",
            "iconUrl": "https://cdn.coinranking.com/mR6e9rFPH/btsssss.png",
            "name": "Bitcoin Standard Hashrate Token",
            "symbol": "BTCST",
            "price": "0.8031654110588106"
          },
          {
            "uuid": "urDJYnxOF",
            "iconUrl": "https://cdn.coinranking.com/txiJjZI3Z/swbtc.png",
            "name": "Compound Wrapped BTC",
            "symbol": "CWBTC",
            "price": "348.0966935061858"
          },
          {
            "uuid": "h-3RuRkxHtpby",
            "iconUrl": "https://cdn.coinranking.com/XejvJsgah/btcz.png",
            "name": "BitcoinZ",
            "symbol": "BTCZ",
            "price": "0.000146280641182795"
          },
          {
            "uuid": "sFRQRYxj4XZ",
            "iconUrl": "https://cdn.coinranking.com/82djZtfJ8/photo_2021-05-11_22.png",
            "name": "BTC 2x Flexible Leverage Index",
            "symbol": "BTC2XFLI",
            "price": "3.217772337912152"
          }
        ],
        "exchanges": [
          {
            "uuid": "337ZWGygG",
            "iconUrl": "https://cdn.coinranking.com/N2iVODQap/btcex.png",
            "name": "BTCEX",
            "recommended": false
          },
          {
            "uuid": "BT5Shdx9aM",
            "iconUrl": "https://cdn.coinranking.com/GhvYoBzhy/btcturk.svg",
            "name": "BTCTurk",
            "recommended": false
          },
          {
            "uuid": "WuZx40XcSms",
            "iconUrl": "https://cdn.coinranking.com/EuB2BwcGd/btcalpha.svg",
            "name": "BTCAlpha",
            "recommended": false
          }
        ],
        "markets": [
          {
            "uuid": "MP77r-vKf4",
            "baseSymbol": "BTC",
            "quoteSymbol": "USDT",
            "baseUuid": "Qwsogvtv82FCd",
            "quoteUuid": "HIVsRcGKkPFtW",
            "exchangeIconUrl": "https://cdn.coinranking.com/mDTK5qrmq/binance.svg",
            "exchangeName": "Binance",
            "exchangeUuid": "-zdvbieRdZ",
            "recommended": true
          },
          {
            "uuid": "ifeyn_cix4",
            "baseSymbol": "BTC",
            "quoteSymbol": "BUSD",
            "baseUuid": "Qwsogvtv82FCd",
            "quoteUuid": "vSo2fu9iE1s0Y",
            "exchangeIconUrl": "https://cdn.coinranking.com/mDTK5qrmq/binance.svg",
            "exchangeName": "Binance",
            "exchangeUuid": "-zdvbieRdZ",
            "recommended": true
          },
          {
            "uuid": "BfkLiwAInu",
            "baseSymbol": "BTC",
            "quoteSymbol": "USD",
            "baseUuid": "Qwsogvtv82FCd",
            "quoteUuid": "yhjMzLPhuIDl",
            "exchangeIconUrl": "https://cdn.coinranking.com/eTtnk9dDn/coinbase.svg",
            "exchangeName": "Coinbase Pro",
            "exchangeUuid": "qn5ZJmPFP",
            "recommended": true
          }
        ]
      }
    }

    searchResults = processCryptoSearch(data)
  } else if (assetType === 'stocks') {
    console.log('searching for stocks');
  }

  return searchResults
}

export {getAssetsData, getAssetData, getSearchResults};