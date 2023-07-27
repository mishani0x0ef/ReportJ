import React from 'react';
import ReactDOM from 'react-dom/client';
import { closeIssue } from './close-issue/close-issue';

const root = ReactDOM.createRoot(
  document.body.appendChild(document.createElement('reportj-extension'))
);

root.render(<React.StrictMode></React.StrictMode>);

closeIssue();
