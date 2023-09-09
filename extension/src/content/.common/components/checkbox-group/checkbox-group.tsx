import './checkbox-group.css';
import { useEffect, useRef } from '@common/ui';

type ValueType = string;

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

  function handleCheckboxChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      onChange?.(target.value);
    }
  }

  useEffect(() => {
    const checkboxes = Array.from(
      ref.current?.querySelectorAll<HTMLInputElement>('input[type="radio"]')
    );

    checkboxes.forEach((checkbox) => {
      checkbox.name = name;
      checkbox.addEventListener('input', handleCheckboxChange);
    });

    return function cleanup() {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('input', handleCheckboxChange);
      });
    };
  }, []);

  return (
    <div ref={ref} class="reportj-checkbox-group">
      {children}
    </div>
  );
}

type CheckboxProps = {
  value: ValueType;
};

CheckboxGroup.Checkbox = ({ value }: CheckboxProps) => (
  <label class="reportj-checkbox-group__checkbox">
    <span>{value}</span>
    <input type="radio" value={value} />
  </label>
);
