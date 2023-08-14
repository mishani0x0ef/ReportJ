import React from 'react';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className="aui-button" {...props}>
    {children}
  </button>
);

export default Button;
