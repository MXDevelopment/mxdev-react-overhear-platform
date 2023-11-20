// ErrorHandler.ts
type ErrorInfo = {
    message: string;
    code?: string;
    // Any other relevant info about the error
  };
  
  class ErrorHandler {
    static handleFirebaseError(error: any): ErrorInfo {
      // Firebase specific error handling
      console.log('Firebase Error: ', error);
      return {
        message: error.message || 'An error occurred with Firebase',
        code: error.code,
      };
    }
  
    static handleNetworkError(error: any): ErrorInfo {
      // Network related error handling
      console.log('Network Error: ', error);
      return {
        message: error.message || 'A network error occurred',
      };
    }
  
    static handleGenericError(error: any): ErrorInfo {
      // General error handling
      console.log('Error: ', error);
      return {
        message: error.message || 'An unexpected error occurred',
      };
    }
  
    // Add other specific error handlers as needed
  }
  
  export default ErrorHandler;
  