<img src="https://github.com/mishani0x0ef/ReportJ/blob/master/ReportJ.Extension.Chrome/img/logo-lg.png" alt="ReportJ logo" height="100" style="text-align: center; display: block;">

# What is idea of ReportJ?

This extension designed to improve reporting experience inside JIRA system. It's made to make reporting easier and provide short way for adding of main report parts such as issue title, reporting templates or your previous commits information.

Idea and functionality of extension was gets from personal experience of work with JIRA. And I will be happy to hear about your suggestions.

# How to install Chrome extension?

To use extension you need to do next steps:

1. Open Chrome Web Store - https://chrome.google.com/webstore/detail/reportj/hijbdbjoelgicnhnghhhlkpbhjdmchfg?hl=en-US
2. Click "ADD TO CHROME"
3. You are awersome

# How to use Chrome extension?

Chrome extension is made to make your life easier. So I want to explain some main tips of "how to use it".

## Restrictions

Report information could be added only into editable text fields on page. In Jira it works on issue's details and on agile as well. Maybe it works somewhere else, but it's main pages I'm personally using :)

## Base workflows

### Add Issue Summary

The best way to get this information - use context menu on right mouse click.
Just do right mouse click in some editable field and choose "ReportJ add issue summary" point from context menu - title from issue will be added to field.

### Add pre-defined template

Often we should report some common activities such as status meetings, retrospectives, deployments etc. ReportJ has "Reporting Templates" feature which allow you to define your common activities once and than use it at any moment.

*To configurate reporting templates:*

* Open extension options (settings) over Chrome Extensions page or from ReportJ's popup
* Select "Templates" tab
* Click "Add Template" (some of common templates already saved for you and you can use them immediately after extension install)
* Write down and save you template

*To use templates in reporting*

* Click on some editable field inside a page
* Open extension's popup 
* Select "Templates" tab
* Click on any template in list and it will be added by magic

### Add commit's message

It's not a secret that developers copy&paste commit's message into reports. To do it in more convinient way:

*Install desktop app that unblock Commits feature*

* Download desktop app installer "ReportJ.Desktop.msi" from [latest release](https://github.com/mishani0x0ef/ReportJ/releases/latest) (it's free and have no any ads)
* Run installer and follow wizard steps
* Application installed and you can use Commits feature

*Configurate repository information in extension settings*

* Open extension options (settings) over Chrome Extensions page or from ReportJ's popup
* Select "Repositories" tab
* Click "Add Repository" and fill all fields with appropriate data
* If you make all right and repository is available for API server - you are amazing

*Use your commits information for reporting*

* Click on some editable field inside a page
* Open extension popup 
* Select "Commits" tab
* Just click on commit info you want to add and it will be added
