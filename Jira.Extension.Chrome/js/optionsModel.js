var SelectorItem = function(value, text){
    this.value = value;
    this.text = text;
}

var OptionsViewModel = function(){
    var self = this;
    self.optionKey = ko.observable();
    
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
        //todo: implement saving into chrome store.
    }
};