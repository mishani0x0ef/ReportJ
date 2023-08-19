import { createPortal } from '@common/ui';
import { useTarget } from './hooks/use-target';

export default function LogTime() {
  const target = useTarget();

  if (!target) {
    return null;
  }

  return createPortal(<span>ReportJ</span>, target);
}
