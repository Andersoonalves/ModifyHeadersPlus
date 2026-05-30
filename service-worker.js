function setExtensionIcon() {
    chrome.storage.local.get(['started'], (result) => {
        if (result.started === 'on') {
            chrome.action.setIcon({path: {
                "16": chrome.runtime.getURL("icons/modify-green-16.png"),
                "32": chrome.runtime.getURL("icons/modify-green-32.png"),
                "48": chrome.runtime.getURL("icons/modify-green-48.png")
            }});
            console.log('ModifyHeader started');
        } else {
            chrome.action.setIcon({path: {
                "16": chrome.runtime.getURL("icons/modify-16.png"),
                "32": chrome.runtime.getURL("icons/modify-32.png"),
                "48": chrome.runtime.getURL("icons/modify-48.png")
            }});
            console.log('ModifyHeader stopped');
        }
    });
}

chrome.runtime.onStartup.addListener(setExtensionIcon);
chrome.runtime.onInstalled.addListener(setExtensionIcon);

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.started) {
        setExtensionIcon();
    }
});

