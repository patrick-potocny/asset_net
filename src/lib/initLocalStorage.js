export default function initLocalStorage() {
  // Check if local storage has been created
  if (localStorage.getItem("darkMode") === null) {
    localStorage.setItem("darkMode", false);
    localStorage.setItem("assetType", "all_assets");
    localStorage.setItem(
      "assetList",
      JSON.stringify([
        {
          id: "Qwsogvtv82FCd",
          timeFrame: "1D",
          assetType: "crypto"
        },
        // {
        //   id: "razxDUgYGNAdQ",
        //   timeFrame: "1w",
        //   assetType: "crypto"
        // }, 
      ])
    );
  }
}
