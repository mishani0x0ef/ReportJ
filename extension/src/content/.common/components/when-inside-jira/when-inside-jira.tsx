import { useEffect, useState } from 'react';

type WhenInsideJiraProps = {
  children?: React.ReactNode;
};

const WhenInsideJira: React.FC<WhenInsideJiraProps> = ({ children }) => {
  const [insideJira, setInsideJira] = useState(false);

  async function waitForDom() {
    const loadedState = ['loaded', 'interactive', 'complete'];
    const isLoaded = loadedState.includes(document.readyState);

    if (isLoaded) {
      return;
    }

    return new Promise((resolve) => {
      window.addEventListener('DOMContentLoaded', resolve, { once: true });
    });
  }

  async function check() {
    await waitForDom();

    const hasJiraMarker = Boolean(document.querySelector('#jira'));
    setInsideJira(hasJiraMarker);
  }

  useEffect(() => {
    check();
  }, []);

  return insideJira ? children : null;
};

export default WhenInsideJira;
