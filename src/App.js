import React, { useRef, useState } from 'react';
import Header from './components/Header';
import SegmentedPicker from './components/SegmentedPicker';
function App() {

  const [assetType, setAssetType] = useState('')

  return (
    <>
      <Header />
      <SegmentedPicker
        name="main"
        callback={(val) => setAssetType(val)}
        controlRef={useRef()}
        options={[
          {
            label: "All assets",
            value: "all_assets",
            ref: useRef()
          },
          {
            label: "Crypto",
            value: "crypto",
            ref: useRef()
          },
          {
            label: "Stocks",
            value: "stocks",
            ref: useRef()
          }
        ]}
      />
      <p>Selected {assetType}</p>
    </>
  );
}

export default App;