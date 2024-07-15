// chrome.tabs.onActivated.addListener((activeInfo) => {
//     chrome.tabs.get(activeInfo.tabId, (tab) => {
//         if (tab.url && tab.url.includes("https://www.youtube.com/shorts")) {
//             chrome.scripting.executeScript({
//                 target: { tabId: tab.id },
//                 files: ["content.js"]
//             });
//         }
//     });
// });

// chrome.runtime.onMessage.addListener((message, sender, response) => {
//     console.log(message);
// });

console.log("Hiiiiii");