import { FunctionComponent, JSX } from 'preact';

export {};

declare global {
  type Nullable<T> = T | null;
  type Maybe<T> = T | null | undefined;
  type FC<T = {}> = FunctionComponent<T>;
  type Children = JSX.Element | JSX.Element[];
}
