import { RefObject } from '@common/ui';
import { useEventHandler } from './use-event-handler';

export function useKeysHandler(
  keyCodes: string[],
  handler: (event: KeyboardEvent) => void,
  ref?: RefObject<HTMLElement>
) {
  const onKeys =
    (keys: string[], action: (e: KeyboardEvent) => void) => (event: Event) => {
      const canDispatch =
        event instanceof KeyboardEvent &&
        keys.some((key) => key === event.code);

      if (canDispatch) {
        action(event);
        event.preventDefault();
        event.stopPropagation();
      }
    };

  useEventHandler('keydown', onKeys(keyCodes, handler), ref);
}
