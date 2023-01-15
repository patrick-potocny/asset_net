import React, { useContext } from "react";
import PropTypes from "prop-types";
import { deleteAsset } from "../lib/localStorageHandler";
import { AssetDataCtx } from "../AssetDataCtx";

function DelAsset({ assetId, assetSymbol, onClose }) {
  const { assetData, setAssetData } = useContext(AssetDataCtx);

  function removeAsset(e) {
    const id = e.target.getAttribute("data-id");
    // Deletes from localStorage
    deleteAsset(id);
    // Update assetData
    const updatedData = assetData.filter((item) => item.id !== assetId);
    setAssetData(updatedData);

    onClose();
  }

  return (
    <div className="delAsset">
      <div className="delAsset__prompt">
        <p>Delete {assetSymbol} from portfolio?</p>
      </div>
      <div className="delAsset__btns">
        <button className="btn cancel" onClick={onClose}>
          Cancel
        </button>
        <button data-id={assetId} className="btn delete" onClick={removeAsset}>
          Delete
        </button>
      </div>
    </div>
  );
}

DelAsset.propTypes = {
  assetId: PropTypes.string.isRequired,
  assetSymbol: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DelAsset;
