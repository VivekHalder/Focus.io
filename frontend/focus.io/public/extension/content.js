const shortsVisited = new Set();
let toBlock = false;

chrome.storage.local.get(['shortsVisited'], (result) => {
    if (result.shortsVisited) {
        result.shortsVisited.forEach(url => shortsVisited.add(url));
    }
    if (shortsVisited.size > 1 && window.location.href.includes("https://www.youtube.com/shorts")) {
        blockShorts();
    }
});

const trackShortsCount = () => {
    if (window.location.href.includes("www.youtube.com/shorts/")) {
        shortsVisited.add(window.location.href);
        chrome.storage.local.set({ shortsVisited: Array.from(shortsVisited) }, () => {
            console.log(shortsVisited.size);
            if (shortsVisited.size > 1) {
                toBlock = true;
                blockShorts();
            }
        });
    }
};

const blockShorts = () => {
    const videoElement = document.getElementsByTagName("video")[0];

    if (videoElement) {
        videoElement.pause();
        videoElement.style.display = "none";

        const blackScreenOverlay = document.createElement("div");
        blackScreenOverlay.style.position = "absolute";
        blackScreenOverlay.style.top = "0";
        blackScreenOverlay.style.left = "0";
        blackScreenOverlay.style.width = "100%";
        blackScreenOverlay.style.height = "100%";
        blackScreenOverlay.style.backgroundColor = "black";
        blackScreenOverlay.style.zIndex = "1000";
        document.body.appendChild(blackScreenOverlay);

        const message = document.createElement("h1");
        message.style.display = "flex";
        message.style.justifyContent = "center";
        message.style.alignItems = "center";
        message.style.color = "white";
        message.style.height = "100%";
        message.innerText = "Focus on YOUR work!!!";
        blackScreenOverlay.appendChild(message);
    }
};

window.addEventListener('load', trackShortsCount);
window.addEventListener('yt-navigate-finish', trackShortsCount);