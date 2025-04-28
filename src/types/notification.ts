export type NotificationType = 
  | "like" 
  | "comment" 
  | "mention" 
  | "follow" 
  | "announcement" 
  | "event" 
  | "post";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  linkTo: string;
  image?: string;
  sender?: {
    name: string;
    avatar: string;
  };
};
