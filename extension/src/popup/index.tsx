import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header/header';
import Preferences from './components/preferences/preferences';
import Preference from './components/preference/preference';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Header />

    <Preferences>
      <Preference name="test" description="test" />
      <Preference name="test2" description="test2" />
    </Preferences>
  </React.StrictMode>
);
