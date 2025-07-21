import { Notification } from "@/types/notification";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "liveroom",
    title: "Live Room Alert",
    message: "Sarah just started a live room: 'Morning Workout Session'",
    timestamp: "2m ago",
    isRead: false,
    linkTo: "/live/morning-workout",
    sender: {
      name: "Sarah",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop"
    }
  },
  {
    id: "2",
    type: "challenge",
    title: "Challenge Update",
    message: "Mike just hyped you up in the 30-Day Fitness Challenge!",
    timestamp: "5m ago",
    isRead: false,
    linkTo: "/challenges/30-day-fitness",
    sender: {
      name: "Mike",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    }
  },
  {
    id: "3",
    type: "message",
    title: "Direct Message",
    message: "Emma sent you a message: 'Great workout today! Want to join me tomorrow?'",
    timestamp: "15m ago",
    isRead: false,
    linkTo: "/messages/emma-davis",
    sender: {
      name: "Emma",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop"
    }
  },
  {
    id: "4",
    type: "joinrequest",
    title: "Join Request",
    message: "Alex Johnson wants to join the 'Advanced Runners' group",
    timestamp: "30m ago",
    isRead: false,
    linkTo: "/groups/advanced-runners/requests",
    sender: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    }
  },
  {
    id: "5",
    type: "like",
    title: "New Like",
    message: "Maya Patel liked your workout post",
    timestamp: "1h ago",
    isRead: false,
    linkTo: "/community/post/5",
    sender: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
    }
  },
  {
    id: "6",
    type: "channel",
    title: "Channel Update",
    message: "New post in #nutrition-tips: 'Best Pre-Workout Snacks'",
    timestamp: "2h ago",
    isRead: true,
    linkTo: "/channels/nutrition-tips",
    sender: {
      name: "Dr. Smith",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
    }
  },
  {
    id: "7",
    type: "comment",
    title: "New Comment",
    message: "Jake Wilson commented on your nutrition post: 'Great tips! I've been trying to incorporate more protein too.'",
    timestamp: "3h ago",
    isRead: true,
    linkTo: "/community/post/6",
    sender: {
      name: "Jake Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    }
  },
  {
    id: "8",
    type: "mention",
    title: "New Mention",
    message: "Lisa mentioned you in a comment: '@user I think you'd benefit from these recovery techniques!'",
    timestamp: "5h ago",
    isRead: true,
    linkTo: "/community/post/8",
    sender: {
      name: "Lisa",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
    }
  },
  {
    id: "9",
    type: "event",
    title: "Upcoming Event",
    message: "Virtual Yoga Session starts in 2 days - don't forget to join!",
    timestamp: "1d ago",
    isRead: true,
    linkTo: "/events/virtual-yoga",
    sender: {
      name: "Yoga Studio",
      avatar: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop"
    }
  },
  {
    id: "10",
    type: "announcement",
    title: "Community Announcement",
    message: "New fitness challenge starts next week! Join now for early access to premium content.",
    timestamp: "2d ago",
    isRead: true,
    linkTo: "/community/announcements/fitness-challenge",
    sender: {
      name: "Community Team",
      avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
    }
  }
];
