interface FirebaseUser {
  uid: string;
  displayName: string;
  email: string;
  photoUrl: string;
  isEmailVerified: boolean;
  isDisabled: boolean;
  scope: string[];
}
