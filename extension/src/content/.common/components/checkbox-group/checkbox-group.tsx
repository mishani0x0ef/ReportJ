import './checkbox-group.css';

import { useKeysHandler } from '../../hooks/use-keys-handler';
import { useEffect, useRef } from '@common/ui';

type ValueType = string | number;

type CheckboxGroupProps = {
  name: string;
  onChange?: (value: ValueType) => void;
  children?: Children;
};

export default function CheckboxGroup({
  name,
  onChange,
  children,
}: CheckboxGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  function dispatchSelectionChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      onChange?.(target.value);
    }
  }

  function emulateClick(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.target?.dispatchEvent(new MouseEvent('click'));
  }

  useEffect(() => {
    const checkboxes = Array.from(
      ref.current?.querySelectorAll<HTMLInputElement>('input[type="radio"]')
    );

    checkboxes.forEach((checkbox) => {
      checkbox.name = name;
      checkbox.addEventListener('input', dispatchSelectionChange);
    });

    return function cleanup() {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('input', dispatchSelectionChange);
      });
    };
  }, []);

  useKeysHandler(['Enter', 'Space'], emulateClick, ref);

  return (
    <div ref={ref} class="reportj-checkbox-group">
      {children}
    </div>
  );
}

type CheckboxProps = {
  value: ValueType;
  text: string;
};

CheckboxGroup.Checkbox = ({ text, value }: CheckboxProps) => (
  <label class="reportj-checkbox-group__checkbox" tabIndex={0}>
    <span>{text}</span>
    <input type="radio" value={value} />
  </label>
);
