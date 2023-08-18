import './index.css';

import { render } from 'preact';
import Header from './components/header/header';
import Preferences from './components/preferences/preferences';
import Preference from './components/preference/preference';
import PreferencesProvider from '@common/components/preferences/preferences-provider';
import Separator from './components/separator/separator';

render(
  <PreferencesProvider>
    <Header />
    <Separator />

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
  </PreferencesProvider>,
  document.getElementById('root')
);
