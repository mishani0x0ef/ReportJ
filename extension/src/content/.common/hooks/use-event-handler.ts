import { RefObject, useEffect } from '@common/ui';

type EventName = keyof HTMLElementEventMap;

export function useEventHandler<T extends EventName>(
  event: EventName,
  handler: (e: HTMLElementEventMap[T]) => void,
  ref?: RefObject<HTMLElement>
) {
  useEffect(() => {
    const target = ref ? ref.current : window;

    if (!target) {
      return;
    }

    target.addEventListener(event, handler);

    return function cleanup() {
      target.removeEventListener(event, handler);
    };
  }, []);
}
