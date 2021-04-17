import FirebaseUser from "./FirebaseUser";

export default interface FirebaseUserPage {
  nextPageToken?: string;
  users: FirebaseUser[];
}
