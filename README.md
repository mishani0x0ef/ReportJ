# What is idea of Jira Report Helper?

This extension designed to improve reporting experience inside JIRA system. It's made to make reporting easier and provide short way for adding of main report parts such as issue title or your previous commits information.

Idea and functionality of extension was gets from personal experience of work with JIRA. And I will be happy to hear about your suggestions.

# How to install Chrome extension?

To use extension you need to do next steps:

1. Download [latest release](https://github.com/mishani0x0ef/Jira.Extrension/releases)
2. Unpack Source Code
3. Open Chrome settings, go to extension tab and select "Developer mode" checkbox. Developer mode will be activated
4. Click button "Load unpacked extension..". Folder select dialog should appear
5. Select folder "Jira.Extension.Chrome" inside Source Code and confirm selection. Extension should appear in list of extensions
6. Make sure that extension have "Enabled" checkbox checked

NOTE: it could be request from browser to disable developer mode extension. Don’t disable those extension to made JIRA Report Helper turned on.

# How to use Chrome extension?

Chrome extension is made to make your life easier. So I want to explain some main tips of "how to use it".

## Restrictions

Reporting functionality of extension work only on JIRA pages. However you could open setting to configurate extension on any page.

Report information could be added only into editable text fields on page. It works on issue's details and on agile as well. Maybe it works somewhere else, but it's main pages I'm personally using :)

Using of commits information available only in sub-network where API server is placed.

## Base workflows

### Many of project require to copy issue's title into your report. 

The best way to get this information - use context menu on right mouse click. In that menu after extension installation you could find additional point - "JIRA add issue summary". So just do right mouse click in some editable field and choose mentioned point - title from issue will be automatically added to field.

### Add information from commits into the report 

It's not a secret that developers copy/paste this info into our reports. So, to add this info you need to do few steps:

*Configurate repository information in extension settings*

* Open extension popup (press on extension icon at address bar)
* On popup would be suggested to refresh setting. Please, follow that suggestion and settings screen will be opened
* In settings click on "Add new repository" and fill all fields with appropriate data
* If make all right and repository is available for my servers - you are amazing

*Use your commits information for reporting*

* Go to JIRA
* Click on some editable field inside the issue
* Open extension popup. Your previous commits will be loaded into popup.
* Just click on commit info you want to add and it will be added automatically.
