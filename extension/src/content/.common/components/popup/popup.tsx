import './popup.css';
import { classnames } from '../../utils/classnames';
import { useClickOutside } from '../../hooks/use-click-outside';
import { useRef } from 'preact/hooks';

type PopupProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: Children;
  children?: Children;
};

export function Popup({ open, setOpen, trigger, children }: PopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} class="reportj-popup__container">
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
