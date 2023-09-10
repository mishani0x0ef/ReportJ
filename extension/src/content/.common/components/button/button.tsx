import { ComponentProps } from '@common/ui';
import { classnames } from '../../utils/classnames';

type ButtonProps = ComponentProps<'button'> & {
  link?: boolean;
};

export default function Button({ link, children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={classnames('aui-button', link && 'aui-button-link')}
      {...props}
    >
      {children}
    </button>
  );
}
