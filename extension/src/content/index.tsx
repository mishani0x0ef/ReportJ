import { render } from '@common/ui';
import CloseIssue from './close-issue/close-issue';
import AddIssueSummary from './add-issue-summary/add-issue-summary';
import PreferencesProvider from '@common/components/preferences/preferences-provider';
import WhenPreference from './.common/components/preferences/when-preference';
import WhenInsideJira from './.common/components/when-inside-jira/when-inside-jira';
import LogTime from './log-time/log-time';

const root = document.createElement('reportj-extension');

document.body.appendChild(root);

render(
  <WhenInsideJira>
    <PreferencesProvider>
      <WhenPreference name="addIssueSummary">
        <AddIssueSummary />
      </WhenPreference>
      <WhenPreference name="closeIssue">
        <CloseIssue />
      </WhenPreference>
      <WhenPreference name="logTime">
        <LogTime />
      </WhenPreference>
    </PreferencesProvider>
  </WhenInsideJira>,
  root
);
