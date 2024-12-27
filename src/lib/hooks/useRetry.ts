import { useState, useCallback } from 'react';

interface RetryConfig {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  onError?: (error: Error, attempt: number) => void;
}

export function useRetry() {
  const [attempts, setAttempts] = useState(0);

  const retry = useCallback(async <T>(
    fn: () => Promise<T>,
    config: RetryConfig = {}
  ): Promise<T> => {
    const {
      maxAttempts = 3,
      initialDelay = 1000,
      maxDelay = 5000,
      backoffFactor = 2,
      onError
    } = config;

    try {
      return await fn();
    } catch (error) {
      if (attempts >= maxAttempts - 1) {
        throw error;
      }

      const delay = Math.min(
        initialDelay * Math.pow(backoffFactor, attempts),
        maxDelay
      );

      onError?.(error as Error, attempts + 1);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      setAttempts(prev => prev + 1);
      
      return retry(fn, config);
    }
  }, [attempts]);

  const reset = useCallback(() => {
    setAttempts(0);
  }, []);

  return { retry, attempts, reset };
}