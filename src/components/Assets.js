import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import AssetCard from "./AssetCard";
import Modal from "./Modal";
import AddAsset from "./AddAsset";
import plusIcon from "../assets/images/plus.svg";
import { AssetDataCtx } from "../AssetDataCtx";

function Assets({ assetType }) {
  const { assetData } = useContext(AssetDataCtx);
  const [isOpen, setIsOpen] = useState(false);
  const [displayedAssets, setDisplayedAssets] = useState([]);
  
  useEffect(() => {
    setDisplayedAssets(
      assetData.filter((asset) => asset.assetType === assetType)
    );
    if (assetType === "all_assets") setDisplayedAssets(assetData);
  }, [assetData, assetType]);

  return (
    <div className="assets">
      {displayedAssets.map((asset) => (
        <AssetCard key={uuid()} asset={asset} />
      ))}

      <div
        className="assets__add"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <img src={plusIcon} alt="Add" />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddAsset onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

Assets.propTypes = {
  assetType: PropTypes.string.isRequired,
};

export default Assets;
