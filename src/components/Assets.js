import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AssetCard from "./AssetCard";
import Modal from "./Modal";
import AddAsset from "./AddAsset";
import plusIcon from "../assets/images/plus.svg";
import { updateAsset } from "../lib/localStorageHandler";
import { getAssetData } from "../lib/apiHandler";
import { v4 as uuid } from "uuid";
import { AssetDataCtx } from "../AssetDataCtx";
import { sortAssetData } from "../lib/utlis";

function Assets({ assetType }) {
  const { assetData, setAssetData } = useContext(AssetDataCtx);
  const [isOpen, setIsOpen] = useState(false);

  // find better way to filter
  let displayedAssets = assetData.filter(
    (asset) => asset.assetType === assetType
  );
  if (assetType === "all_assets") displayedAssets = assetData;

  async function updateTf(e) {
    const id = e.target.getAttribute("data-id");
    const newTf = e.target.getAttribute("data-tf");

    // Updates localStorage
    const updatedAsset = updateAsset(id, newTf);

    let updatedData = [];
    await Promise.all(
      assetData.map(async (item) => {
        if (item.id === id) {
          const newAssetData = await getAssetData(updatedAsset);
          updatedData.push(newAssetData);
        } else {
          updatedData.push(item);
        }
      })
    );
    
    sortAssetData(updatedData)
    setAssetData(updatedData);
  }

  return (
    <div className="container assets">
      {displayedAssets.map((asset) => (
        <AssetCard key={uuid()} asset={asset} updateTf={updateTf} />
      ))}

      <div
        className="add-asset-btn"
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
