export function handleError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  
  if (typeof error === 'string') {
    return new Error(error);
  }
  
  return new Error('An unknown error occurred');
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('network') ||
      error.message.includes('Network') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('timeout')
    );
  }
  return false;
}

export function formatErrorMessage(error: unknown): string {
  const err = handleError(error);
  
  // Handle specific error types
  if (err.message.includes('not found')) {
    return 'The requested resource was not found';
  }
  
  if (isNetworkError(err)) {
    return 'A network error occurred. Please check your connection and try again';
  }
  
  if (err.message.includes('permission')) {
    return 'You do not have permission to perform this action';
  }
  
  // Default error message
  return 'An error occurred. Please try again later';
}