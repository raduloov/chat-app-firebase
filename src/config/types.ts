export interface MessageType {
  text: string;
  photoURL: string;
  uid: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
