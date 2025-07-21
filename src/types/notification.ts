export type NotificationType = 
  | "like" 
  | "comment" 
  | "mention" 
  | "follow" 
  | "announcement" 
  | "event" 
  | "post"
  | "challenge"
  | "message"
  | "channel"
  | "joinrequest"
  | "liveroom";

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

// Chart colors for notification type badges
export const CHART_COLORS = {
  chart1: "hsl(25 95% 53%)", // Orange for events
  chart2: "hsl(220 70% 50%)", // Blue for messages/channels  
  chart3: "hsl(142 76% 36%)", // Green for announcements/join requests
  chart4: "hsl(280 65% 60%)", // Purple/pink for challenges
  chart5: "hsl(0 84% 60%)", // Red for live room
} as const;
