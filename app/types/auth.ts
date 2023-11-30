// Import the User type from the Firebase Auth module
import { User as FirebaseUser } from 'firebase/auth';

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
export type Error = string | null;

// Use FirebaseUser type for the User
export type User = FirebaseUser | null;

export interface Auth {
  user: User;
  status: Status;
  error: Error;
}
