export interface ITweet {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  isOwner: () => boolean;
}
