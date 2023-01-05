import React from "react";
import PropTypes from "prop-types";
import AssetCard from "./AssetCard";
import { v4 as uuid } from "uuid";

function Assets({ assetType, assetData }) {
  // find better way to filter
  let displayedAssets = assetData.filter(
    (asset) => asset.assetType === assetType
  );
  if (assetType === "all_assets") displayedAssets = assetData;

  return (
    <div className="container assets">
      {displayedAssets.map((asset) => (
        <AssetCard key={uuid()} asset={asset} />
      ))}
    </div>
  );
}

Assets.propTypes = {
  assetType: PropTypes.string.isRequired,
  assetData: PropTypes.array.isRequired,
};

export default Assets;
