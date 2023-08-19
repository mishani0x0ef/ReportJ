import { useEffect, useState } from '@common/ui';

export type Query<T> = () => Promise<T>;

export type QueryResult<T> = [
  result: Nullable<T>,
  isLoading: boolean,
  error: Nullable<Error>
];

export function useQuery<T = unknown>(
  query: Query<T>,
  deps: ReadonlyArray<unknown> = []
): QueryResult<T> {
  const [result, setResult] = useState<Nullable<T>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(null);

  async function execute() {
    try {
      setIsLoading(true);
      setError(null);
      setResult(await query());
    } catch (error) {
      setError(error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    execute();
  }, deps);

  return [result, isLoading, error];
}
