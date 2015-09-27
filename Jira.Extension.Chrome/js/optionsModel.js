var SelectorItem = function(value, text){
    this.value = value;
    this.text = text;
}

var OptionsViewModel = function(){
    var self = this;
    self.optionKey = ko.observable();
    
    var generalOptonsMessageKey = 'generalOptions';
    
    self.titleTypes = ko.observableArray([
        new SelectorItem("parentAndCurrent", "Parent and current issue"), 
        new SelectorItem("parent", "Parent Issue only"), 
        new SelectorItem("current", "Current issue only")]);
    self.selectedTitleType = ko.observable(self.titleTypes[0]);
    
    self.issueSeparators = ko.observableArray([
        new SelectorItem("newLine", "New Line"), 
        new SelectorItem("dot", "Dot and space"), 
        new SelectorItem("space", "Space")]);
    self.selectedIssueSeparator = ko.observable(self.issueSeparators[0]);
    
    self.repositoryOptions = ko.observable(
        useCommitsHistory = ko.observable(true),
        displayInfo = ko.observableArray(["Date", "Time", "Author", "Message"]),
        svnRepositories = ko.observableArray([]),
        gitRepositories = ko.observableArray(null)
    );
    
    var exampleIssue = {
        parent: "JIRA-55. Base story for implementing awersome functionality",
        child: "JIRA-78. Sub-task for implementation of single part of the new great functionality"
    };
        
    self.example = ko.computed(function(){
        var issueSummary = "";
        var separator = "";
        var titleType = typeof(self.selectedTitleType()) !== "undefined" ? self.selectedTitleType().value : "";
        var separatorType = typeof(self.selectedIssueSeparator()) !== "undefined" ? self.selectedIssueSeparator().value : "";
        
        switch(separatorType){
            case "dot":
                separator = ". ";
                break;
            case "dot":
                separator = " ";
                break;
            default:
                separator = "\n";
                break;
        }
        
        if(titleType === "parent" || titleType === "parentAndCurrent"){
            issueSummary += exampleIssue.parent;
            issueSummary += separator;
        }
        if(titleType === "current" || titleType === "parentAndCurrent"){
            issueSummary += exampleIssue.child;            
        }        
        issueSummary += separator;
        
        return issueSummary;
    }, self);
    
    self.save = function(){
        var message = new Message(generalOptonsMessageKey, messageType.post, window.parent, self.getModel());
        message.send();
    }
    
    self.initOptions = function(optionsModel){
        var types = self.titleTypes();
        var separators = self.issueSeparators();
        
        for(var i = 0; i < types.length; i++){
            if(types[i].value === optionsModel.titleType){
                self["selectedTitleType"](types[i]);
            }
        }
        
        for(var i = 0; i < separators.length; i++){
            if(separators[i].value === optionsModel.issueSeparator){
                self["selectedIssueSeparator"](separators[i]);
            }
        }
    }
    
    self.getModel = function(){
        return {
            titleType: self.selectedTitleType().value,
            issueSeparator: self.selectedIssueSeparator().value
        }
    };
    
    $(function(){
        new Message(generalOptonsMessageKey, messageType.get, window.parent).send();
    });
    
    window.addEventListener("message", function(event){
        messageParser(event.data);
    }, false);
    
    var messageParser = function(message){
        switch(message.messageId){
            case generalOptonsMessageKey:
                switch(message.type){
                    case messageType.success:
                        notifyOptionsSaving(true);
                        return;
                    case messageType.error:
                        notifyOptionsSaving(false);
                        return;
                    case messageType.post:
                        self.initOptions(message.message);
                        return;
                    default:
                        console.error("Type " + message.type + " wasn't expected for messageID " + message.messageId);
                        return;
                }
            default:
                console.warn('Unsupported messageID - ' + message.messageId);
                return;
        }
    }
    
    var notifyOptionsSaving = function(isSuccess, errorMessage){
        new PNotify({
            title: isSuccess ? 'Well done!' : "Ooops!",
            text: isSuccess ? 'General options was successfully saved.' : 'Error occured while saving options: ' + errorMessage,
            type: isSuccess ? 'success' : 'error',
            cornerclass: 'ui-pnotify-sharp',
            delay: 2000,
            styling: 'bootstrap3',
            icon: isSuccess ? 'glyphicon glyphicon-ok-circle' : 'glyphicon glyphicon-remove-circle'
        });
    }
};

ko.applyBindings(new OptionsViewModel());