type ClassName = string | boolean;

export function classnames(...args: ClassName[]): string {
  return args.filter(Boolean).join(' ');
}
