export type Preferences = {
  addIssueSummary: boolean;
  closeIssue: boolean;
  logTime: boolean;
};

export type PreferenceName = keyof Preferences;
