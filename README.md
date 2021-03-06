[![Build Status](https://travis-ci.org/mishani0x0ef/ReportJ.svg?branch=master)](https://travis-ci.org/mishani0x0ef/ReportJ)
[![CodeFactor](https://www.codefactor.io/repository/github/mishani0x0ef/reportj/badge)](https://www.codefactor.io/repository/github/mishani0x0ef/reportj)

<img src="https://github.com/mishani0x0ef/ReportJ/blob/master/resources/logo/logo-lg.png" alt="ReportJ logo" height="100" style="text-align: center; display: block;">

[Chrome Web Store](https://chrome.google.com/webstore/detail/reportj/hijbdbjoelgicnhnghhhlkpbhjdmchfg?hl=en-US)

This extension designed to improve reporting experience inside JIRA system.

Idea and functionality of extension was gets from personal experience of work with JIRA. And I will be happy to hear about your suggestions.

# How to install Chrome extension?

To use extension you need to do next steps:

1. Open [Chrome Web Store](https://chrome.google.com/webstore/detail/reportj/hijbdbjoelgicnhnghhhlkpbhjdmchfg?hl=en-US)
2. Click "ADD TO CHROME"
3. You are awersome

# Main Features

## Reset remaining estimate on issue closed

During close of an issue you will see new button **Close with ReportJ**. Just click it to automatically reset remaining estimate and close an issue.

## Add pre-defined template

> NOTE: you can use reporting templates on any website (not only inside Jira).

Often we report some common activities such as status meetings, retrospectives, deployments etc. ReportJ has **Reporting Templates**  that allows you to define your common activities once and than use it at any moment.

To configurate reporting templates

* Open extension options over Chrome Extensions page or from ReportJ's popup
* Select *"Templates"* tab
* Click *"Add Template"* (some of common templates already saved for you and you can use them immediately after extension install)
* Write down and save you template

To use templates in reporting

* Click on some editable field inside a page
* Open extension's popup 
* Select *"Templates"* tab
* Click on any template to insert it

## Add commit's message

> NOTE: flow of work with commits will be changed in the next version (it would easier for git users and you would definitely like it).

It's not a secret that developers copy&paste commit's message into reports. To do it in more convinient way:

Install desktop app

* Download and install desktop app [ReportJ.Desktop.msi](https://github.com/mishani0x0ef/ReportJ/releases/latest) (it's free and have no ads)
* When application installed you can use *Commits feature*

Configurate repository information in extension settings

* Open extension options (settings) over Chrome Extensions page or from ReportJ's popup
* Select *"Repositories"* tab
* Click *"Add Repository"* and fill all fields with appropriate data
* If you make all right and repository is available for API server - you are amazing

Use your commits information for reporting

* Click on some editable field inside a page
* Open extension popup 
* Select *"Commits"* tab
* Just click on commit info you want to add and it will be added

## Add Issue Summary

> NOTE: works only on Jira pages.

Just do right mouse click in some editable field and choose **ReportJ add issue summary** point from context menu - title from issue will be added.
