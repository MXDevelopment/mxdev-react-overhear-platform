export interface LoginScreenProps {
    /**
     * Indicates if the authentication process is loading
     */
    isLoading: boolean;
  
    /**
     * An error message string or null if there is no error
     */
    error: string | null;
  
    /**
     * A callback function to sign in the user with email and password
     */
    signInWithEmail: (email: string, password: string) => void;
  
    /**
     * A callback function to perform anonymous sign-in
     */
    signInAnonymously: () => void;
  
    /**
     * A callback function to clear any errors
     */
    clearError: () => void;
  
    /**
     * Navigation prop for navigating between screens
     */
    navigation: any; // You can replace 'any' with a more specific type if you have one
  }