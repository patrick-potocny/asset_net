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
        {
          id: "razxDUgYGNAdQ",
          timeFrame: "1D",
          assetType: "crypto"
        },
      ])
    );
  }
}

function updateAsset(id, newTf) {
  const assetLIst = JSON.parse(localStorage.getItem("assetList"));
  let updatedAsset = {};

  const updatedData = assetLIst.map((item) => {
    if (item.id === id) {
      updatedAsset = { ...item, timeFrame: newTf };
      return updatedAsset;
    }
    return item;
  });
  localStorage.setItem("assetList", JSON.stringify(updatedData));

  return updatedAsset;
}

export { initLocalStorage, updateAsset };
