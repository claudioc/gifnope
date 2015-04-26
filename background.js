function pauseAllGifs(info, tab) {

    chrome.tabs.sendMessage(tab.id, {
            sender: "GIFNOPE",
            command: "PAUSE_ALL"
        },

        function () {
        }
    );
}

function pauseGif(info, tab) {

    var src = info.srcUrl,
        window = chrome.extension.getBackgroundPage();

    chrome.tabs.sendMessage(tab.id, {
            sender: "GIFNOPE",
            command: "PAUSE",
            target: src
        },

        function () {
        }
    );
}

var ctxMenuPauseId = chrome.contextMenus.create({
    "title": "Pause animation",
    "contexts": ["image"],
    "onclick": pauseGif
});

var ctxMenuPauseAllId = chrome.contextMenus.create({
    "title": "Pause all animations",
    "contexts": ["page"],
    "onclick": pauseAllGifs
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

    if (msg.sender && (msg.sender == "GIFNOPE")) {
    
        if (msg.command == 'DISABLE_MENU') {
            chrome.contextMenus.update(ctxMenuPauseId, {
                enabled: false
            });
        }

        if (msg.command == 'ENABLE_MENU') {
            chrome.contextMenus.update(ctxMenuPauseId, {
                enabled: true
            });
        }
    }
});
