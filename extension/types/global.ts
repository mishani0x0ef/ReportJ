export {};

declare global {
  type Nullable<T> = T | null;
  type Maybe<T> = T | null | undefined;
}
