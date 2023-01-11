function initLocalStorage() {
  // Check if local storage has been created
  if (localStorage.getItem("darkMode") === null) {
    localStorage.setItem("darkMode", false);
    localStorage.setItem("assetType", "all_assets");
    localStorage.setItem(
      "assetList",
      JSON.stringify([
        {
          id: "Qwsogvtv82FCd",
          timeFrame: "3Y",
          assetType: "crypto",
        },
      ])
    );
  }
}

function updateAsset(id, newTf) {
  const assetList = JSON.parse(localStorage.getItem("assetList"));
  let updatedAsset = {};

  const updatedData = assetList.map((item) => {
    if (item.id === id) {
      updatedAsset = { ...item, timeFrame: newTf };
      return updatedAsset;
    }
    return item;
  });
  localStorage.setItem("assetList", JSON.stringify(updatedData));

  return updatedAsset;
}

function deleteAsset(id) {
  const assetList = JSON.parse(localStorage.getItem("assetList"));
  const updatedData = assetList.filter(item => item.id !== id);
  localStorage.setItem("assetList", JSON.stringify(updatedData));
}

function addAsset(id, assetType) {
  const assetList = JSON.parse(localStorage.getItem("assetList"));
  if (assetList.filter(asset => asset.id === id).length > 0) return false

  const newAsset = {
    id: id,
    timeFrame: '1D',
    assetType: assetType
  }
  assetList.push(newAsset)
  localStorage.setItem("assetList", JSON.stringify(assetList));
  return newAsset
}

export {initLocalStorage, updateAsset, deleteAsset, addAsset};
