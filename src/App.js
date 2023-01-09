import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import SegmentedPicker from "./components/SegmentedPicker";
import Assets from "./components/Assets";
import { AssetDataCtx } from "./AssetDataCtx";
import { DarkModeCtx } from "./DarkModeCtx";
import { getAssetsData } from './/lib/apiHandler'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [assetType, setAssetType] = useState(localStorage.getItem("assetType"));
  const [assetData, setAssetData] = useState([])

  useEffect(() => {
    setAssetData(getAssetsData())
  }, [])

  return (
    <>
      <DarkModeCtx.Provider value={{darkMode, setDarkMode}}>
        <Header />
        <SegmentedPicker
          name="main-asset-type"
          callback={(val) => {
            setAssetType(val);
            localStorage.setItem('assetType', val);
          }}
          controlRef={useRef()}
          options={[
            {
              label: "All assets",
              value: "all_assets",
              ref: useRef(),
            },
            {
              label: "Crypto",
              value: "crypto",
              ref: useRef(),
            },
            {
              label: "Stocks",
              value: "stocks",
              ref: useRef(),
            },
          ]}
          defaultOption={assetType}
        />
        <AssetDataCtx.Provider value={{assetData, setAssetData}}>
          <Assets assetType={assetType} />
        </AssetDataCtx.Provider>
      </DarkModeCtx.Provider>
    </>
  );
}

export default App;
