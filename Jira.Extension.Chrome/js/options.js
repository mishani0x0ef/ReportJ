var generalOptonsMessageKey = 'generalOptions';

$('#btnAddRepository').click(function(){
    $('#repositoryEditModal').modal('show');
});

window.addEventListener("message", function(event){
    messageParser(event.data);
}, false);

var messageParser = function(message) {
    switch(message.messageId){
        case generalOptonsMessageKey:
            switch(message.type){
                case messageType.post:
                    saveGeneralSettings(message.message);
                    return;
                case messageType.get:
                    initGeneralOptions();
                    return;
            }            
        default:
            console.warn('Unsupported messageID - ' + message.messageId);
            return;
    }
}

var saveGeneralSettings = function(settings){
    chrome.runtime.lastError = null;
    
    chrome.storage.sync.set({
        titleType: settings.titleType,
        issueSeparator: settings.issueSeparator
    }, function(){
        var message = new Message(generalOptonsMessageKey, messageType.success, document.getElementById("app").contentWindow); 
        
        if(typeof(chrome.runtime.lastError) !== 'undefined' && chrome.runtime.lastError !== null){
            message.type = messageType.error;
            message.message = chrome.runtime.lastError;
        } 
        
        message.send();
    });
}

var initGeneralOptions = function(){
    chrome.storage.sync.get(["titleType", "issueSeparator"], function(options){
        var message = new Message(generalOptonsMessageKey, messageType.post, document.getElementById("app").contentWindow, options);
        message.send();
    });
}