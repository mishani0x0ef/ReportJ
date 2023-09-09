import './time-selector.css';

import CheckboxGroup from '../../../.common/components/checkbox-group/checkbox-group';
import Button from '../../../.common/components/button/button';

export default function TimeSelector() {
  return (
    <section class="reportj-time-selector">
      <CheckboxGroup
        name="reportj-log-time-hours"
        onChange={(hours) => console.log('[ReportJ]', hours)}
      >
        <CheckboxGroup.Checkbox value="1h" />
        <CheckboxGroup.Checkbox value="2h" />
        <CheckboxGroup.Checkbox value="3h" />
        <CheckboxGroup.Checkbox value="4h" />
        <CheckboxGroup.Checkbox value="5h" />
        <CheckboxGroup.Checkbox value="6h" />
        <CheckboxGroup.Checkbox value="7h" />
        <CheckboxGroup.Checkbox value="8h" />
      </CheckboxGroup>

      <CheckboxGroup
        name="reportj-log-time-minutes"
        onChange={(hours) => console.log('[ReportJ]', hours)}
      >
        <CheckboxGroup.Checkbox value="0m" />
        <CheckboxGroup.Checkbox value="15m" />
        <CheckboxGroup.Checkbox value="30m" />
        <CheckboxGroup.Checkbox value="45m" />
      </CheckboxGroup>

      <div class="reportj-time-selector__footer">
        <small>Powered by ReportJ</small>
        <Button>Save</Button>
      </div>
    </section>
  );
}
