chrome.runtime.onInstalled.addListener(function() {
    chrome.commands.onCommand.addListener(function(command) {
        console.log('Command:', command);
        switch (command) {
            case "setTab":
                chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
                    console.log(tab);
                    chrome.storage.sync.set({"1": tab[0].id})
                });
                break;
            case "moveToTab":
                chrome.storage.sync.get(["1"], function (result) {
                    chrome.tabs.get(result[1], function(tab) {
                        chrome.tabs.highlight({'tabs': tab.index});
                    });
                });
                break;
            default:
                Error('This Command was not mapped');
        }
    });
});