import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { BottomNav } from "@/components/layout/BottomNav";
import { FeedPost } from "@/components/community/FeedPost";
import { CreatePost } from "@/components/community/CreatePost";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export const MOCK_POSTS = [
  {
    category: "weight-training",
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
      url: "https://www.healthline.com/health/shoulder-pain-exercises",
      title: "Top 10 Exercises to Relieve Shoulder Pain and Tightness",
      domain: "healthline.com",
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
    category: "yoga",
    author: {
      firstName: "Emma",
      lastName: "Davis",
      handle: "nutritioncoach",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const,
    },
    content: "🧘‍♀️ Starting your yoga journey? Here's my beginner-friendly guide to essential poses that will help improve your flexibility and strength. Perfect for busy gym-goers who want to add yoga to their routine.",
    timestamp: "5h",
    metrics: {
      likes: 1243,
      comments: 234,
      reposts: 167,
      shares: 89,
    },
    media: {
      type: "link" as const,
      url: "https://www.verywellfit.com/essential-yoga-poses-for-beginners-3566747",
      title: "31 Yoga Poses for Beginners",
      domain: "verywellfit.com",
    },
  },
  {
    category: "cardio",
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
  {
    author: {
      firstName: "Mike",
      lastName: "Johnson",
      handle: "fitcoach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "Check out my latest workout tutorial! 💪 Perfect for beginners looking to build strength and improve form.",
    timestamp: "2h",
    metrics: {
      likes: 324,
      comments: 42,
      reposts: 12,
      shares: 8,
    },
    media: {
      type: "video" as const,
      url: "https://example.com/workout-video.mp4",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&fit=crop",
    },
  },
  {
    category: "nutrition",
    author: {
      firstName: "Sarah",
      lastName: "Chen",
      handle: "nutritionist",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const,
    },
    content: "🥗 Meal prep tip: Prep your protein sources in bulk! Today I'm sharing my go-to high-protein meal prep that takes just 30 mins. Perfect for busy gym days when you need quick, nutritious meals. Swipe for the full recipe breakdown! #MealPrep #HealthyEating",
    timestamp: "3h",
    metrics: {
      likes: 428,
      comments: 67,
      reposts: 23,
      shares: 51,
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=400&fit=crop",
    },
  },
  {
    category: "nutrition",
    author: {
      firstName: "Alex",
      lastName: "Rivera",
      handle: "macrocoach",
      avatar: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "👨‍🍳 Pre-workout nutrition doesn't have to be complicated! Here's my simple formula:\n\n• 1 banana 🍌\n• 1 tbsp almond butter\n• 1 scoop whey protein\n\nEat 45-60 mins before training for steady energy and great pumps! What's your go-to pre-workout meal?",
    timestamp: "6h",
    metrics: {
      likes: 752,
      comments: 89,
      reposts: 34,
      shares: 12,
    },
  },
  {
    category: "recovery",
    author: {
      firstName: "Maya",
      lastName: "Patel",
      handle: "recoverycoach",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "🧊 Cold therapy guide! Just dropped a complete breakdown on ice baths vs. cold showers. Both have their place in recovery, but timing is everything. Check out the full guide on optimal temperatures and duration for different training phases.",
    timestamp: "4h",
    metrics: {
      likes: 634,
      comments: 72,
      reposts: 28,
      shares: 45,
    },
    media: {
      type: "link" as const,
      url: "https://www.healthline.com/health/shoulder-pain-exercises",
      title: "Ice Bath vs Cold Shower: Complete Recovery Guide",
      domain: "healthline.com",
    },
  },
  {
    category: "recovery",
    author: {
      firstName: "Tom",
      lastName: "Wilson",
      handle: "sleepexpert",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "😴 Sleep is the ultimate recovery tool! New research shows that poor sleep can reduce muscle protein synthesis by up to 18%. Here are my top 3 tips for better sleep quality:\n\n1. No screens 1hr before bed\n2. Keep room temp at 65-68°F\n3. Consistent sleep/wake times\n\nWhat helps you sleep better?",
    timestamp: "2h",
    metrics: {
      likes: 891,
      comments: 134,
      reposts: 67,
      shares: 89,
    },
  },
];

const Community = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPosts = MOCK_POSTS.filter(post => 
    activeFilter === "all" || post.category === activeFilter
  );

  const renderContent = () => {
    switch (currentPath) {
      case "/community":
        return (
          <>
            <CreatePost />
            {filteredPosts.map((post, index) => (
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
      <CommunityTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <main>
        {renderContent()}
      </main>
      <BottomNav />
    </div>
  );
};

export default Community;