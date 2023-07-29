import { ElementObserver, observeElement } from './observe-element';

type DialogTitle = string;

export function observeDialog(
  title: DialogTitle
): ElementObserver<HTMLDivElement> {
  const selector = `.jira-dialog-heading h2`;
  const titleLower = title.toLowerCase();

  return observeElement(
    (element) =>
      element.matches(selector) &&
      element.textContent !== null &&
      element.textContent.toLowerCase().includes(titleLower),
    {
      prepareTarget: (element) =>
        element.parentElement?.parentElement as HTMLDivElement,
    }
  );
}
