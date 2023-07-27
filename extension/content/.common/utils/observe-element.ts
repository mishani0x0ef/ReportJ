import { Disposable } from '../types/disposable';
import { isElement } from '../types/element';

type ElementMatcher = (element: Element) => boolean;
type ElementSelector = string | ElementMatcher;
type Listener<T extends Element> = (element: T) => void;
type AttachListener<T extends Element> = (handler: Listener<T>) => void;

export type ElementObserver<T extends Element> = {
  onShow: AttachListener<T>;
  onHide: AttachListener<T>;
} & Disposable;

export function observeElement<T extends Element>(
  selector: ElementSelector
): ElementObserver<T> {
  const showListeners: Listener<T>[] = [];
  const hideListeners: Listener<T>[] = [];

  const matches: ElementMatcher =
    selector instanceof Function
      ? selector
      : (element) => element.matches(selector);

  function dispatchShow(mutations: MutationRecord[]) {
    mutations
      .flatMap((m) => [...Array.from(m.addedNodes), m.target])
      .filter((node): node is Element => isElement(node))
      .filter((elem) => matches(elem))
      .forEach((elem) => showListeners.forEach((cb) => cb(elem as T)));
  }

  function hasInside(element: Element, matcher: ElementMatcher): boolean {
    // TODO: optimize implementation
    return Array.from(element.querySelectorAll('*')).some((e) => matcher(e));
  }

  function dispatchHide(mutations: MutationRecord[]) {
    mutations
      .flatMap((m) => Array.from(m.removedNodes))
      .filter((node): node is T => isElement(node))
      .filter((elem) => matches(elem) || hasInside(elem, matches))
      .forEach((elem) => hideListeners.forEach((cb) => cb(elem)));
  }

  const observer = new MutationObserver((mutations) => {
    dispatchShow(mutations);
    dispatchHide(mutations);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });

  return {
    onShow: (listener) => showListeners.push(listener),
    onHide: (listener) => hideListeners.push(listener),
    dispose: () => observer.disconnect(),
  };
}
