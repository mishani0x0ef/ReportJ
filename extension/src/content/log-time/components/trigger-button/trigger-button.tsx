import './trigger-button.css';

import Button from '../../../.common/components/button/button';

type TriggerButtonProps = {
  onClick: () => void;
};

export function TriggerButton({ onClick }: TriggerButtonProps) {
  return (
    <span class="reportj-time-selector-trigger-button">
      <Button link onClick={onClick}>
        Select time
      </Button>
    </span>
  );
}
