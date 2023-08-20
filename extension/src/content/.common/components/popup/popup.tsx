import './popup.css';
import { classnames } from '../../utils/classnames';

type PopupProps = {
  open: boolean;
  trigger: Children;
  children?: Children;
};

export function Popup({ open, trigger, children }: PopupProps) {
  return (
    <div class="reportj-popup__container">
      {trigger}
      <div class="reportj-popup__anchor">
        <section
          class={classnames('reportj-popup', open && 'reportj-popup--open')}
        >
          {children}
        </section>
      </div>
    </div>
  );
}
