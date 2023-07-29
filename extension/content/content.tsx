import React from 'react';
import ReactDOM from 'react-dom/client';
import CloseIssue from './close-issue/close-issue';
import AddIssueSummary from './add-issue-summary/add-issue-summary';
import WhenInsideJira from './.common/components/when-inside-jira/when-inside-jira';

const root = ReactDOM.createRoot(
  document.body.appendChild(document.createElement('reportj-extension'))
);

root.render(
  <React.StrictMode>
    <WhenInsideJira>
      <AddIssueSummary />
      <CloseIssue />
    </WhenInsideJira>
  </React.StrictMode>
);
