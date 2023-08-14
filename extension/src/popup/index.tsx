import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header/header';
import Preferences from './components/preferences/preferences';
import Preference from './components/preference/preference';
import PreferencesProvider from '@common/components/preferences/preferences-provider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Header />

    <PreferencesProvider>
      <Preferences>
        <Preference
          name="addIssueSummary"
          title="Add issue summary"
          description="Automatically add summary to work reports"
        />
        <Preference
          name="closeIssue"
          title="Close issue"
          description="Reset remaining estimate when closing issue"
        />
      </Preferences>
    </PreferencesProvider>
  </React.StrictMode>
);
