import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { BottomNav } from "@/components/layout/BottomNav";
import { FeedPost } from "@/components/community/FeedPost";

export const MOCK_POSTS = [
  {
    author: {
      name: "FitnessPro",
      handle: "fitnesspro",
      avatar: "https://pbs.twimg.com/profile_images/1679157854607613952/7Z0-0FeJ_400x400.jpg",
      verified: true,
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
          name: "GymLife",
          handle: "gymlife",
          avatar: "https://pbs.twimg.com/profile_images/1234567890/avatar_400x400.jpg",
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
      name: "NutritionCoach",
      handle: "nutritioncoach",
      avatar: "https://pbs.twimg.com/profile_images/1468001914302390278/B_Xv_8gu_400x400.jpg",
      verified: true,
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
];

const Community = () => {
  return (
    <div className="min-h-screen pb-20">
      <CommunityHeader />
      <CommunityTabs />
      <main>
        {MOCK_POSTS.map((post, index) => (
          <FeedPost key={index} {...post} index={index} />
        ))}
      </main>
      <BottomNav />
    </div>
  );
};

export default Community;