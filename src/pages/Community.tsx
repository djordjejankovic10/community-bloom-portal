import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { BottomNav } from "@/components/layout/BottomNav";
import { FeedPost } from "@/components/community/FeedPost";
import { CreatePost } from "@/components/community/CreatePost";
import { useLocation } from "react-router-dom";

export const MOCK_POSTS = [
  {
    author: {
      firstName: "John",
      lastName: "Smith",
      handle: "fitnesspro",
      avatar: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
      verified: true,
      role: "founder" as const,
    },
    content: "Just crushed a new deadlift PR! 💪 Remember: proper form is everything. Here's my top 3 tips for maintaining perfect form during heavy lifts. What's your current PR goal?",
    timestamp: "2h",
    metrics: {
      likes: 842,
      comments: 156,
      reposts: 89,
      shares: 45,
    },
    media: {
      type: "link" as const,
      url: "https://www.fitnesspro.com/deadlift-form-guide",
      title: "Complete Guide to Perfect Deadlift Form",
      domain: "fitnesspro.com",
    },
    replies: [
      {
        author: {
          firstName: "Sarah",
          lastName: "Johnson",
          handle: "gymlife",
          avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
        },
        content: "Amazing progress! My current goal is 405lbs by end of month. Your form tips have been super helpful! 🎯",
        timestamp: "1h",
        metrics: {
          likes: 156,
          comments: 12,
          reposts: 3,
          shares: 1,
        },
      },
    ],
  },
  {
    author: {
      firstName: "Emma",
      lastName: "Davis",
      handle: "nutritioncoach",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const,
    },
    content: "🥗 Meal prep Sunday! Here's my go-to high-protein lunch that takes just 15 minutes to prepare. Perfect for busy gym-goers who still want to eat clean.",
    timestamp: "5h",
    metrics: {
      likes: 1243,
      comments: 234,
      reposts: 167,
      shares: 89,
    },
    media: {
      type: "link" as const,
      url: "https://nutritioncoach.com/quick-meal-prep",
      title: "15-Minute High-Protein Meal Prep Guide",
      domain: "nutritioncoach.com",
    },
  },
  {
    author: {
      firstName: "Mike",
      lastName: "Johnson",
      handle: "fitcoach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "Just wrapped up an amazing outdoor workout session! 🌞 Check out this beautiful trail - perfect for morning runs and HIIT exercises. Who else loves outdoor workouts?",
    timestamp: "1h",
    metrics: {
      likes: 324,
      comments: 42,
      reposts: 12,
      shares: 8,
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=400&fit=crop",
    },
  },
  {
    author: {
      firstName: "Lisa",
      lastName: "Chen",
      handle: "yogalife",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const,
    },
    content: "New beginner-friendly yoga flow! 🧘‍♀️ Focus on breathing and gentle stretches. Perfect for morning routines or desk break refreshers. Save this for later! #YogaEveryday",
    timestamp: "30m",
    metrics: {
      likes: 567,
      comments: 89,
      reposts: 45,
      shares: 23,
    },
    media: {
      type: "link" as const,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "15-Minute Morning Yoga Flow",
      domain: "youtube.com",
    },
  },
];

const Community = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderContent = () => {
    switch (currentPath) {
      case "/community":
        return (
          <>
            <CreatePost />
            {MOCK_POSTS.map((post, index) => (
              <FeedPost key={index} {...post} index={index} />
            ))}
          </>
        );
      case "/community/challenges":
      case "/community/meetups":
      case "/community/leaderboard":
        return (
          <div className="p-8 text-center text-muted-foreground">
            This is a webview
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <CommunityHeader />
      <CommunityTabs />
      <main>
        {renderContent()}
      </main>
      <BottomNav />
    </div>
  );
};

export default Community;