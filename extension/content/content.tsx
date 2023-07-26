import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.body.appendChild(document.createElement('reportj-extension'))
);

root.render(
  <React.StrictMode>
    <div>ReportJ content script</div>
  </React.StrictMode>
);
