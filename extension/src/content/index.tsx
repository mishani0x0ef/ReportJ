import React from 'react';
import ReactDOM from 'react-dom/client';
import CloseIssue from './close-issue/close-issue';
import AddIssueSummary from './add-issue-summary/add-issue-summary';
import PreferencesProvider from './.common/components/preferences/preferences-provider';
import WhenPreference from './.common/components/preferences/when-preference';
import WhenInsideJira from './.common/components/when-inside-jira/when-inside-jira';

const root = ReactDOM.createRoot(
  document.body.appendChild(document.createElement('reportj-extension'))
);

root.render(
  <React.StrictMode>
    <WhenInsideJira>
      <PreferencesProvider>
        <WhenPreference name="addIssueSummary">
          <AddIssueSummary />
        </WhenPreference>
        <WhenPreference name="closeIssue">
          <CloseIssue />
        </WhenPreference>
      </PreferencesProvider>
    </WhenInsideJira>
  </React.StrictMode>
);
