const boycottList = ["adidas", "nike"];

export function checkWebsite(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    return boycottList.some((keyword) =>
      hostname.includes(keyword.toLowerCase())
    );
  } catch (error) {
    console.error("Invalid URL provided:", url);
    return false;
  }
}

export function checkAndUpdateBadge() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (tab && tab.url) {
      const isBoycotted = checkWebsite(tab.url);

      (globalThis as any).isBoycotted = isBoycotted;

      const badgeText = isBoycotted ? "🚫" : "";
      chrome.action.setBadgeText({ text: badgeText, tabId: tab.id });
    }
  });
}
