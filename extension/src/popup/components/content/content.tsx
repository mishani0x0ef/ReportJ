import React from 'react';

type ContentProps = {
  children?: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => (
  <section>{children}</section>
);

export default Content;
