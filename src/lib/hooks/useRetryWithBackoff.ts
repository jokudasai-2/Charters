import { useState, useCallback } from 'react';

interface RetryConfig {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  onError?: (error: Error, attempt: number) => void;
  shouldRetry?: (error: Error) => boolean;
}

export function useRetryWithBackoff() {
  const [attempts, setAttempts] = useState(0);

  const reset = useCallback(() => {
    setAttempts(0);
  }, []);

  const retry = useCallback(async <T>(
    fn: () => Promise<T>,
    config: RetryConfig = {}
  ): Promise<T> => {
    const {
      maxAttempts = 3,
      initialDelay = 1000,
      maxDelay = 5000,
      backoffFactor = 2,
      onError,
      shouldRetry = () => true
    } = config;

    try {
      return await fn();
    } catch (error) {
      const err = error as Error;
      
      if (attempts >= maxAttempts - 1 || !shouldRetry(err)) {
        throw err;
      }

      onError?.(err, attempts + 1);

      const delay = Math.min(
        initialDelay * Math.pow(backoffFactor, attempts),
        maxDelay
      );

      await new Promise(resolve => setTimeout(resolve, delay));
      setAttempts(prev => prev + 1);
      
      return retry(fn, config);
    }
  }, [attempts]);

  return { retry, attempts, reset };
}