import { useState } from '@common/ui';

export type Command<T> = () => Promise<T>;

export type CommandResult<T> = {
  execute: (command: Command<T>) => Promise<T>;
  isLoading: boolean;
  error: Nullable<Error>;
};

export function useCommand<T = unknown>(): CommandResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(null);

  async function execute(command: Command<T>): Promise<T> {
    try {
      setIsLoading(true);
      setError(null);

      return await command();
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return { execute, isLoading, error };
}
