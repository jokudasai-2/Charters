import { useFeedbackData } from './useFeedbackData';
import { useFeedbackActions } from './useFeedbackActions';

export const useFeedback = (documentId: string) => {
  const { feedback, isLoading: isLoadingData, error: dataError } = useFeedbackData(documentId);
  const { 
    addFeedback, 
    updateFeedbackStatus, 
    isLoading: isLoadingAction, 
    error: actionError 
  } = useFeedbackActions(documentId);

  return {
    feedback,
    isLoading: isLoadingData || isLoadingAction,
    error: dataError || actionError,
    addFeedback,
    updateFeedbackStatus,
  };
};