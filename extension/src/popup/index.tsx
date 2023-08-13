import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header/header';
import Preferences from './components/preferences/preferences';
import Preference from './components/preference/preference';
import Content from './components/content/content';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Content>
      <Header />

      <Preferences>
        <Preference name="test" description="test" />
        <Preference name="test2" description="test2" />
      </Preferences>
    </Content>
  </React.StrictMode>
);
