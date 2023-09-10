import { RefObject } from '@common/ui';
import { useEventHandler } from './use-event-handler';

type Handler = () => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
) {
  useEventHandler('click', (e) => {
    const element = ref?.current;
    const isOutsideClick = !element || !element.contains(e.target as Node);

    if (isOutsideClick) {
      handler();
    }
  });
}
