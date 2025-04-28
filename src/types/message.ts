export type MessageType = 'text' | 'image' | 'video';

export interface Message {
  id: string;
  senderId: string;
  type: MessageType;
  content: string;
  timestamp: string;
  isRead: boolean;
  media?: {
    url: string;
    type: 'image' | 'video';
    thumbnailUrl?: string;
  }
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    online?: boolean;
  }[];
  lastMessage?: Message;
  unreadCount: number;
}
