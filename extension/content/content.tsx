import React from 'react';
import ReactDOM from 'react-dom/client';
import CloseIssue from './close-issue/close-issue';
import AddIssueSummary from './add-issue-summary/add-issue-summary';

const root = ReactDOM.createRoot(
  document.body.appendChild(document.createElement('reportj-extension'))
);

root.render(
  <React.StrictMode>
    <AddIssueSummary />
    <CloseIssue />
  </React.StrictMode>
);
