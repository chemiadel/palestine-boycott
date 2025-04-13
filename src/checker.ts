import cloud from "../public/dataset/cloud.json";
import commerce from "../public/dataset/commerce.json";
import developer from "../public/dataset/developer.json";
import finance from "../public/dataset/finance.json";
import healthcare from "../public/dataset/healthcare.json";
import hr from "../public/dataset/hr.json";
import marketing from "../public/dataset/marketing.json";
import others from "../public/dataset/others.json";
import productivity from "../public/dataset/productivity.json";
import sales from "../public/dataset/sales.json";
import security from "../public/dataset/security.json";
import web3 from "../public/dataset/web3.json";

const allCompanies = [
  ...cloud,
  ...commerce,
  ...developer,
  ...finance,
  ...healthcare,
  ...hr,
  ...marketing,
  ...others,
  ...productivity,
  ...sales,
  ...security,
  ...web3,
];

function rootDomain(url: string): string | null {
  let rightPeriodIndex: number | undefined;
  let noExtension: string | undefined;

  for (let i = url.length - 1; i >= 0; i--) {
    if (url[i] === ".") {
      rightPeriodIndex = i;
      noExtension = url.substring(0, i);
      console.log("this is noExtension", noExtension);
      break;
    }
  }

  if (noExtension) {
    return noExtension.substring(noExtension.lastIndexOf(".") + 1);
  }

  return null; // or throw an error if that makes more sense in your use case
}

export function checkWebsite(url: string): boolean {
  console.log({ url });
  const domain = rootDomain(url);
  console.log({ domain });

  if (!domain) return false;

  const isBoycotted = allCompanies.some((keyword) =>
    keyword.Website.includes(domain.toLowerCase())
  );

  return isBoycotted;
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
