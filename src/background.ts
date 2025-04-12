import { checkAndUpdateBadge } from "./checker";

function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();

function startScript() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      checkAndUpdateBadge();
    }
  });

  chrome.tabs.onActivated.addListener(() => {
    checkAndUpdateBadge();
  });
}

startScript();
