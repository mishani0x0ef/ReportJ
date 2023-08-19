import { ComponentProps } from '@common/ui';

type ButtonProps = ComponentProps<'button'>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="aui-button" {...props}>
      {children}
    </button>
  );
}
