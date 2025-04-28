import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { BottomNav } from "@/components/layout/BottomNav";
import { FeedPost } from "@/components/community/FeedPost";
import { CreatePost } from "@/components/community/CreatePost";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SortOptions } from "@/components/community/SortOptions";

export const MOCK_POSTS = [
  // Repost example
  {
    index: 0,
    author: {
      firstName: "Alex",
      lastName: "Johnson",
      handle: "alexj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    content: "This is such a great tip! I always stretch for 10 minutes after my runs.",
    timestamp: "15m",
    metrics: {
      likes: 42,
      comments: 5,
      shares: 2
    },
    originalPost: {
      author: {
        firstName: "Emma",
        lastName: "Davis",
        handle: "nutritioncoach",
        avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
        verified: true,
        role: "admin" as const
      },
      content: "🧘‍♀️ Starting your yoga journey? Here's my beginner-friendly guide to essential poses that will help improve your flexibility and strength. Perfect for busy gym-goers who want to add yoga to their routine.",
      timestamp: "5h",
      metrics: {
        likes: 1243,
        comments: 234,
        shares: 89
      },
      media: {
        type: "link" as const,
        url: "https://www.verywellfit.com/essential-yoga-poses-for-beginners-3566747",
        title: "31 Yoga Poses for Beginners",
        domain: "verywellfit.com"
      }
    }
  },
  {
    index: 1,
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
          shares: 1,
        },
      },
    ],
  },
  {
    index: 2,
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
      shares: 89,
    },
    media: {
      type: "link" as const,
      url: "https://www.verywellfit.com/essential-yoga-poses-for-beginners-3566747",
      title: "31 Yoga Poses for Beginners",
      domain: "verywellfit.com",
      thumbnail: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop",
    },
  },
  {
    index: 3,
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
      shares: 8,
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=400&fit=crop",
    },
    replies: [
      {
        author: {
          firstName: "Jamie",
          lastName: "Korsgaard",
          handle: "jamiek",
          avatar: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?w=400&h=400&fit=crop"
        },
        content: "That trail looks amazing! Where is this located? I've been looking for new running spots.",
        timestamp: "45m",
        metrics: {
          likes: 18,
          comments: 2,
          shares: 0
        }
      },
      {
        author: {
          firstName: "David",
          lastName: "Park",
          handle: "dpark",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
        },
        content: "Outdoor workouts are the best! Nothing beats fresh air and sunshine for motivation. I usually hit the park near my place every morning.",
        timestamp: "32m",
        metrics: {
          likes: 11,
          comments: 0,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Mike",
          lastName: "Johnson",
          handle: "fitcoach",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          verified: true
        },
        content: "@jamiek It's the Cedar Ridge Trail just outside the city! About a 15-minute drive from downtown. Happy to share the exact location if you want to check it out!",
        timestamp: "28m",
        metrics: {
          likes: 7,
          comments: 0,
          shares: 0
        }
      }
    ],
  },
  {
    index: 4,
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
      shares: 23,
    },
    media: {
      type: "link" as const,
      url: "https://www.fitbody.com/healthy-recipes/protein-bowl",
      title: "The Ultimate Protein Bowl - 5 Variations",
      domain: "fitbody.com",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    },
  },
  {
    index: 5,
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
      shares: 8,
    },
    media: {
      type: "video" as const,
      url: "https://example.com/workout-video.mp4",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&fit=crop",
    },
    replies: [
      {
        author: {
          firstName: "Taylor",
          lastName: "Wilson",
          handle: "taylorw",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        },
        content: "This is exactly what I needed! I've been struggling with proper form on squats. Thanks for breaking it down step by step!",
        timestamp: "1h 45m",
        metrics: {
          likes: 28,
          comments: 1,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Carlos",
          lastName: "Rodriguez",
          handle: "carlosr",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        },
        content: "Great tutorial! Question - what weight do you recommend starting with for complete beginners? I don't want to push too hard too fast.",
        timestamp: "1h 30m",
        metrics: {
          likes: 15,
          comments: 1,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Mike",
          lastName: "Johnson",
          handle: "fitcoach",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          verified: true
        },
        content: "@carlosr Always start with just your bodyweight to master the movement pattern first! Then add light weights - for most beginners, 10-15lbs dumbbells are perfect. Focus on form over weight every time!",
        timestamp: "1h 20m",
        metrics: {
          likes: 22,
          comments: 0,
          shares: 2
        }
      },
      {
        author: {
          firstName: "Emma",
          lastName: "Davis",
          handle: "nutritioncoach",
          avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
          verified: true,
          role: "admin" as const
        },
        content: "Love this content, Mike! Your clear instructions are so helpful. Would be great to collaborate on a nutrition + workout series sometime!",
        timestamp: "58m",
        metrics: {
          likes: 31,
          comments: 0,
          shares: 0
        }
      }
    ],
  },
  {
    index: 6,
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
      shares: 51,
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=400&fit=crop",
    },
  },
  {
    index: 7,
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
      shares: 12,
    },
  },
  {
    index: 8,
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
      shares: 45,
    },
    media: {
      type: "link" as const,
      url: "https://www.healthline.com/health/shoulder-pain-exercises",
      title: "Ice Bath vs Cold Shower: Complete Recovery Guide",
      domain: "healthline.com",
      thumbnail: "https://images.unsplash.com/photo-1563268093-a158621e3fc2?w=600&h=400&fit=crop",
    },
    replies: [
      {
        author: {
          firstName: "Alex",
          lastName: "Johnson",
          handle: "alexj",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        content: "This is incredibly helpful! I've been experimenting with both methods but wasn't sure about optimal timing. Do you think cold therapy is effective for muscle soreness from weight training?",
        timestamp: "3h 45m",
        metrics: {
          likes: 48,
          comments: 1,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Maya",
          lastName: "Patel",
          handle: "recoverycoach",
          avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
          verified: true
        },
        content: "@alexj Absolutely! Cold therapy is excellent for reducing inflammation from weight training. For best results, wait 1-2 hours post-workout, then 10-15 minutes in cold water (50-59°F). This timing allows your body to initiate the recovery process while still getting the anti-inflammatory benefits!",
        timestamp: "3h 30m",
        metrics: {
          likes: 62,
          comments: 0,
          shares: 5
        }
      },
      {
        author: {
          firstName: "Sarah",
          lastName: "Johnson",
          handle: "gymlife",
          avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop"
        },
        content: "I've been afraid to try ice baths because of how cold they are. Do you think starting with cold showers is a good way to ease into it?",
        timestamp: "2h 15m",
        metrics: {
          likes: 29,
          comments: 1,
          shares: 0
        }
      },
      {
        author: {
          firstName: "Maya",
          lastName: "Patel",
          handle: "recoverycoach",
          avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
          verified: true
        },
        content: "@gymlife Definitely! Cold showers are a perfect way to build tolerance. Start with 30 seconds of cool (not cold) water at the end of your normal shower, then gradually increase the duration and decrease the temperature. After a few weeks, you'll be ready to try an ice bath starting at 60°F for 3-5 minutes.",
        timestamp: "2h",
        metrics: {
          likes: 37,
          comments: 0,
          shares: 3
        }
      }
    ],
  },
  {
    index: 9,
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
      shares: 89,
    },
  },
];

const PINNED_POST = {
  pinned: true,
  category: "weight-training",
  author: {
    firstName: "David",
    lastName: "Johnson",
    handle: "davidj",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
    verified: true,
    role: "founder" as const,
  },
  content: "👋 Welcome to our fitness community! Here's a quick guide to get you started:\n\n• Share your progress & achievements\n• Ask questions & support others\n• Join weekly challenges\n• Follow our community guidelines\n\nLet's crush our fitness goals together! 💪",
  timestamp: "2d",
  metrics: {
    likes: 1567,
    comments: 245,
    shares: 89,
  },
};

type SortOption = "latest" | "newest" | "oldest";

const Community = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPinned, setIsPinned] = useState(true);
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");

  const filteredPosts = MOCK_POSTS.filter(post => 
    activeFilter === "all" || post.category === activeFilter
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (currentSort) {
      case "latest":
        // Sort by engagement (likes + comments)
        const engagementA = a.metrics.likes + a.metrics.comments;
        const engagementB = b.metrics.likes + b.metrics.comments;
        return engagementB - engagementA;
      case "newest":
        // For demo, using timestamp string comparison
        return b.timestamp.localeCompare(a.timestamp);
      case "oldest":
        // For demo, using timestamp string comparison
        return a.timestamp.localeCompare(b.timestamp);
      default:
        return 0;
    }
  });

  const handleUnpin = () => {
    setIsPinned(false);
  };

  const renderContent = () => {
    switch (currentPath) {
      case "/community":
        return (
          <>
            <CreatePost />
            <SortOptions 
              currentSort={currentSort}
              onSortChange={setCurrentSort}
            />
            {isPinned && <FeedPost {...PINNED_POST} onUnpin={handleUnpin} />}
            {sortedPosts.map((post, index) => (
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