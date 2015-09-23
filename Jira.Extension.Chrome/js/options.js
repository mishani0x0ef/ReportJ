$("#app").load(function() {
    chrome.storage.sync.get(["titleType", "issueSeparator"], function(options){
        var appWindow = document.getElementById("app").contentWindow;
        appWindow.postMessage(options, "*");
    });
});

$('#btnAddRepository').click(function(){
    $('#repositoryEditModal').modal('show');
});

//todo: implement more flexible messages interaction. MR
window.addEventListener("message", function(event){
    saveGeneralSettings(event.data);
}, false);

var saveGeneralSettings = function(settings){
    chrome.storage.sync.set({
        titleType: settings.titleType,
        issueSeparator: settings.issueSeparator
    });
}