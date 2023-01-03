import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import SegmentedPicker from "./components/SegmentedPicker";
import Assets from "./components/Assets";
import { getAssetsData } from './/lib/apiHandler'

function App() {
  const [assetType, setAssetType] = useState(localStorage.getItem("assetType"));
  const [assetData, setAssetData] = useState([])

  useEffect(() => {
    setAssetData(getAssetsData())
  }, [])

  return (
    <>
      <Header />
      <SegmentedPicker
        name="main"
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
      <Assets assetType={assetType} assetData={assetData} />
    </>
  );
}

export default App;
