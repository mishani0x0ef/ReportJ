import './content.css';

import React from 'react';

type ContentProps = {
  children?: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => (
  <section className="reportj-content">{children}</section>
);

export default Content;
