import { Notification } from "@/types/notification";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "New Like",
    message: "Mike Johnson liked your workout post",
    timestamp: "2m ago",
    isRead: false,
    linkTo: "/community/post/5",
    sender: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    }
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "Emma Davis commented on your nutrition post: \"Great tips! I've been trying to incorporate more protein in my breakfast too.\"",
    timestamp: "15m ago",
    isRead: false,
    linkTo: "/community/post/6",
    sender: {
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop"
    }
  },
  {
    id: "3",
    type: "mention",
    title: "New Mention",
    message: "Maya Patel mentioned you in a comment: \"@user I think you'd benefit from these recovery techniques!\"",
    timestamp: "1h ago",
    isRead: false,
    linkTo: "/community/post/8",
    sender: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
    }
  },
  {
    id: "4",
    type: "follow",
    title: "New Follower",
    message: "Alex Johnson started following you",
    timestamp: "3h ago",
    isRead: true,
    linkTo: "/profile/alexj",
    sender: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    }
  },
  {
    id: "5",
    type: "announcement",
    title: "Community Announcement",
    message: "New fitness challenge starts next week! Join now for early access to premium content.",
    timestamp: "5h ago",
    isRead: true,
    linkTo: "/community/announcements/fitness-challenge",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
  },
  {
    id: "6",
    type: "event",
    title: "Upcoming Event",
    message: "Don't forget: Virtual Yoga Session starts in 2 days",
    timestamp: "1d ago",
    isRead: true,
    linkTo: "/events/virtual-yoga",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop"
  },
  {
    id: "7",
    type: "post",
    title: "Trending in Your Community",
    message: "Check out this popular post about cold therapy from Maya Patel",
    timestamp: "2d ago",
    isRead: true,
    linkTo: "/community/post/8",
    image: "https://images.unsplash.com/photo-1574086642850-6fd5a4f4b848?w=600&h=400&fit=crop"
  }
];
