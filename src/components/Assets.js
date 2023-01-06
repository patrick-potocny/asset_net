import React, { useContext } from "react";
import PropTypes from "prop-types";
import AssetCard from "./AssetCard";
import { updateAsset } from "../lib/localStorageHandler";
import { getAssetData } from "../lib/apiHandler";
import { v4 as uuid } from "uuid";
import { AssetDataCtx } from "../AssetDataCtx";

function Assets({ assetType }) {
  const {assetData, setAssetData} = useContext(AssetDataCtx)

  // find better way to filter
  let displayedAssets = assetData.filter(
    (asset) => asset.assetType === assetType
  );
  if (assetType === "all_assets") displayedAssets = assetData;

  function updateTf(e) {
    const id = e.target.getAttribute("data-id");
    const newTf = e.target.getAttribute("data-tf");
    
    // Updates localStorage
    const updatedAsset = updateAsset(id, newTf)

    const updatedData = assetData.map(item => {
      if (item.id === id) {
        return getAssetData(updatedAsset)
      }
      return item;
    });
    setAssetData(updatedData)
  }
  
  return (
    <div className="container assets">
      {displayedAssets.map((asset) => (
        <AssetCard key={uuid()} asset={asset} updateTf={updateTf} />
      ))}
    </div>
  );
}

Assets.propTypes = {
  assetType: PropTypes.string.isRequired
};

export default Assets;
