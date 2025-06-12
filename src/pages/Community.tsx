import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { FeedPost } from "@/components/community/FeedPost";
import { CreatePost } from "@/components/community/CreatePost";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SortOptions } from "@/components/community/SortOptions";
import { UIPreferencesProvider } from "@/context/UIPreferences";
import { NavigationToggle } from "@/components/community/NavigationToggle";
import { ConditionalCommunityTabs } from "@/components/community/ConditionalCommunityTabs";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PinnedPosts } from "@/components/community/PinnedPosts";
import { PostProps } from "@/types/post";
import { PullToSearchBar } from "@/components/community/PullToSearchBar";
import { usePullToReveal } from "@/hooks/usePullToReveal";

// Helper function to get category icons
const getCategoryIconName = (category: string): string => {
  if (!category) return "message-circle";
  
  const lowerCase = category.toLowerCase();
  if (lowerCase === 'weight-training') return "dumbbell";
  if (lowerCase === 'cardio') return "heart";
  if (lowerCase === 'yoga') return "stretch-vertical";
  if (lowerCase === 'recovery') return "battery";
  if (lowerCase === 'nutrition') return "apple";
  if (lowerCase === 'keto-diet') return "utensils";
  return "message-circle"; // Default icon
};

// Define pinned posts first so they can be included in MOCK_POSTS
const PINNED_POST_999: PostProps = {
  index: 999,
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
  replies: [] // Add empty replies array to prevent undefined issues
};

const PINNED_POST_998: PostProps = {
  index: 998,
  pinned: true,
  category: "nutrition",
  author: {
    firstName: "Emma",
    lastName: "Taylor",
    handle: "emmanutritionist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    verified: true,
    role: "admin" as const,
  },
  content: "🥗 Nutrition tip of the week: Protein intake is crucial for muscle recovery. Aim for 1.6-2.2g per kg of bodyweight if you're training regularly. Check our new nutrition guide for meal ideas!",
  timestamp: "1d",
  metrics: {
    likes: 982,
    comments: 152,
    shares: 64,
  },
  media: {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
  },
  replies: [] // Add empty replies array to prevent undefined issues
};

const PINNED_POST_997: PostProps = {
  index: 997,
  pinned: true,
  category: "cardio",
  author: {
    firstName: "Michael",
    lastName: "Brown",
    handle: "mikerunner",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    verified: true,
    role: "moderator" as const,
  },
  content: "🏃‍♂️ Latest community challenge: The 30-Day Running Streak! Join us starting Monday for 30 days of consistent running. Minimum 1 mile per day. Track your progress in the 'Challenges' tab! [this is a pinned post thats read]",
  timestamp: "12h",
  metrics: {
    likes: 742,
    comments: 98,
    shares: 43,
  },
  replies: [] // Add empty replies array to prevent undefined issues
};

const PINNED_POST_996: PostProps = {
  index: 996,
  pinned: true,
  category: "weight-training",
  author: {
    firstName: "Michael",
    lastName: "Brown",
    handle: "mikerunner",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    verified: true,
    role: "moderator" as const,
  },
  content: "Check out these photo highlights from our community weight training workshop last weekend! This was such an incredible event with over 50 participants from all skill levels. Everyone had the opportunity to learn proper form, get personalized coaching, and connect with other fitness enthusiasts. We covered everything from basic lifts like squats, deadlifts, and bench press to more advanced techniques for those looking to level up their training. The energy in the room was amazing, and we're already planning our next workshop based on your feedback. Special thanks to all the trainers who volunteered their time to make this possible. Swipe to see more pictures. Thanks to everyone who participated!",
  timestamp: "12h",
  metrics: {
    likes: 742,
    comments: 98,
    shares: 43,
  },
  mediaItems: [
    {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop&auto=format", // Landscape
      aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
    },
    {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&h=800&fit=crop&auto=format", // Landscape
      aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
    },
    {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&h=800&fit=crop&auto=format", // Landscape
      aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
    }
  ],
  replies: [] // Add empty replies array to prevent undefined issues
};

const PINNED_POST_995: PostProps = {
  index: 995,
  pinned: true,
  category: "yoga",
  author: {
    firstName: "Emma",
    lastName: "Chen",
    handle: "emmayoga",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    verified: true,
    role: "admin" as const,
  },
  content: "New beginner yoga class starting Monday! 🧘‍♀️",
  timestamp: "1h",
  metrics: {
    likes: 358,
    comments: 42,
    shares: 26,
  },
  media: {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=1000&fit=crop",
    aspectRatio: 0.8, // Portrait image
  },
  replies: [] // Add empty replies array to prevent undefined issues
};

const PINNED_POST_994: PostProps = {
  index: 994,
  pinned: true,
  category: "weight-training",
  author: {
    firstName: "James",
    lastName: "Wilson",
    handle: "strengthcoach",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    verified: true,
  },
  content: "", // Empty content - just image
  timestamp: "3h",
  metrics: {
    likes: 476,
    comments: 32,
    shares: 18,
  },
  media: {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    aspectRatio: 1.33, // 4:3 aspect ratio
  },
  replies: [] // Add empty replies array to prevent undefined issues
};

// Add pinned posts to MOCK_POSTS array
export const MOCK_POSTS = [
  // Add pinned posts to make them findable in PostDetail page
  PINNED_POST_999,
  PINNED_POST_998,
  PINNED_POST_997,
  PINNED_POST_996,
  PINNED_POST_995,
  PINNED_POST_994,
  // Deep threaded comments example post
  {
    index: 1001,
    category: "fitness",
    author: {
      firstName: "Michael",
      lastName: "Torres",
      handle: "@michaelt",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
      verified: true,
      role: "founder" as const,
      titleBadge: {
        title: "Challenge Champion",
        tier: "gold" as const,
        icon: "🏆"
      }
    },
    content: "What's your favorite post-workout recovery technique? I've been experimenting with different methods and would love to hear what works for everyone! #RecoveryTips",
    timestamp: "30m",
    metrics: {
      likes: 87,
      comments: 24,
      shares: 12
    },
    pinned: false,
    replies: [
      // Comment 1 with nested replies
      {
        author: {
          firstName: "Sophia",
          lastName: "Chen",
          handle: "@sophiac",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&auto=format",
          role: "moderator" as const,
          titleBadge: {
            title: "Fitness Guru",
            tier: "bronze" as const,
            icon: "💪"
          }
        },
        content: "Ice baths have been a game-changer for me! I do 5 minutes at 50°F after intense leg days. The initial shock is worth the reduced soreness.",
        timestamp: "2h 45m ago",
        metrics: {
          likes: 32,
          comments: 8
        },
        mediaItems: [
          {
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&h=600&fit=crop",
            aspectRatio: 1.33
          },
          {
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1594387312431-a7a90f436a55?w=800&h=600&fit=crop",
            aspectRatio: 1.33
          }
        ],
        replies: [
          {
            author: {
              firstName: "Michael",
              lastName: "Torres",
              handle: "@michaelt",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
              verified: true,
              role: "founder" as const
            },
            content: "That's impressive, Sophia! Do you use a special tub or just your regular bathtub with ice?",
            timestamp: "2h 30m ago",
            metrics: {
              likes: 12,
              comments: 3
            },
            replies: [
              {
                author: {
                  firstName: "Sophia",
                  lastName: "Chen",
                  handle: "@sophiac",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&auto=format",
                  role: "moderator" as const
                },
                content: "I invested in a dedicated ice bath tub, but started with a regular bathtub. Here's my setup:",
                timestamp: "2h 20m ago",
                metrics: {
                  likes: 8,
                  comments: 2
                },
                mediaItems: [
                  {
                    type: "image" as const,
                    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=600&fit=crop",
                    aspectRatio: 1.33
                  }
                ],
                replies: [
                  {
                    author: {
                      firstName: "Alex",
                      lastName: "Rivera",
                      handle: "@alexr",
                      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop&crop=faces&auto=format",
                    },
                    content: "That's a serious setup! How much did it cost? I've been thinking about getting something similar.",
                    timestamp: "2h 15m ago",
                    metrics: {
                      likes: 4,
                      comments: 1
                    },
                    replies: [
                      {
                        author: {
                          firstName: "Sophia",
                          lastName: "Chen",
                          handle: "@sophiac",
                          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&auto=format",
                          role: "moderator" as const
                        },
                        content: "It was around $300, but totally worth it. You can find cheaper options starting at $150 that work just as well.",
                        timestamp: "2h 10m ago",
                        metrics: {
                          likes: 3,
                          comments: 0
                        }
                      }
                    ]
                  }
                ]
              },
              {
                author: {
                  firstName: "James",
                  lastName: "Wilson",
                  handle: "@jamesw",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces&auto=format",
                },
                content: "I've tried ice baths but couldn't handle the cold! Do you have any tips for beginners?",
                timestamp: "2h 25m ago",
                metrics: {
                  likes: 6,
                  comments: 1
                },
                replies: [
                  {
                    author: {
                      firstName: "Sophia",
                      lastName: "Chen",
                      handle: "@sophiac",
                      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&auto=format",
                      role: "moderator" as const
                    },
                    content: "Start with just 1 minute at a milder temperature (around 60°F) and gradually work your way down. Focus on controlled breathing - that's the key!",
                    timestamp: "2h 20m ago",
                    metrics: {
                      likes: 5,
                      comments: 0
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      // Comment 2 with nested replies
      {
        author: {
          firstName: "Marcus",
          lastName: "Johnson",
          handle: "@marcusj",
          avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=faces&auto=format",
        },
        content: "Foam rolling has been my go-to recovery method for years. I spend about 15 minutes post-workout focusing on the muscles I trained that day.",
        timestamp: "2h 40m ago",
        metrics: {
          likes: 24,
          comments: 5
        },
        mediaItems: [
          {
            type: "video" as const,
            url: "https://example.com/videos/foam-rolling.mp4",
            thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
            aspectRatio: 1.78
          }
        ],
        replies: [
          {
            author: {
              firstName: "Olivia",
              lastName: "Martinez",
              handle: "@oliviam",
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces&auto=format",
            },
            content: "Do you have a specific foam roller you recommend? I've been looking to upgrade mine.",
            timestamp: "2h 30m ago",
            metrics: {
              likes: 8,
              comments: 2
            },
            replies: [
              {
                author: {
                  firstName: "Marcus",
                  lastName: "Johnson",
                  handle: "@marcusj",
                  avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=faces&auto=format",
                },
                content: "I use the TriggerPoint GRID foam roller. It's a bit pricier but lasts forever and has different density zones.",
                timestamp: "2h 25m ago",
                metrics: {
                  likes: 6,
                  comments: 1
                },
                mediaItems: [
                  {
                    type: "image" as const,
                    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
                    aspectRatio: 1.33
                  }
                ]
              }
            ]
          }
        ]
      },
      // Comment 3 with no replies
      {
        author: {
          firstName: "Emma",
          lastName: "Davis",
          handle: "@emmad",
          avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces&auto=format",
          role: "admin" as const
        },
        content: "I'm all about proper nutrition for recovery. A protein shake with 25g protein, tart cherry juice for inflammation, and plenty of water works wonders!",
        timestamp: "2h 35m ago",
        metrics: {
          likes: 18,
          comments: 0
        }
      },
      // Comment 4 with single reply
      {
        author: {
          firstName: "Liam",
          lastName: "Brown",
          handle: "@liamb",
          avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=faces&auto=format",
        },
        content: "Sleep is the ultimate recovery tool that most people overlook. I aim for 8-9 hours on training days and track my sleep quality with an app.",
        timestamp: "2h 30m ago",
        metrics: {
          likes: 29,
          comments: 3
        },
        replies: [
          {
            author: {
              firstName: "Michael",
              lastName: "Torres",
              handle: "@michaelt",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
              verified: true,
              role: "founder" as const
            },
            content: "Completely agree! What app do you use to track your sleep?",
            timestamp: "2h 25m ago",
            metrics: {
              likes: 7,
              comments: 1
            },
            replies: [
              {
                author: {
                  firstName: "Liam",
                  lastName: "Brown",
                  handle: "@liamb",
                  avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=faces&auto=format",
                },
                content: "I use Sleep Cycle. It tracks my sleep patterns and wakes me up during light sleep so I feel more refreshed.",
                timestamp: "2h 20m ago",
                metrics: {
                  likes: 5,
                  comments: 0
                },
                mediaItems: [
                  {
                    type: "image" as const,
                    url: "https://images.unsplash.com/photo-1586863312461-9b3e5c084218?w=800&h=600&fit=crop",
                    aspectRatio: 1.33
                  }
                ]
              }
            ]
          }
        ]
      },
      // Comment 5 with media carousel
      {
        author: {
          firstName: "Ava",
          lastName: "Thompson",
          handle: "@avat",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&auto=format",
        },
        content: "I've been doing yoga for recovery days. It helps with flexibility, blood flow, and mental relaxation. Here are some of my favorite poses:",
        timestamp: "2h 20m ago",
        metrics: {
          likes: 22,
          comments: 2
        },
        mediaItems: [
          {
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=600&fit=crop",
            aspectRatio: 1.33
          },
          {
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1599447292180-45a28f5008cc?w=600&h=900&fit=crop",
            aspectRatio: 0.67
          },
          {
            type: "image" as const,
            url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
            aspectRatio: 1.33
          }
        ],
        replies: [
          {
            author: {
              firstName: "Noah",
              lastName: "Garcia",
              handle: "@noahg",
              avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces&auto=format",
            },
            content: "Do you follow a specific yoga routine or just do whatever feels right that day?",
            timestamp: "2h 15m ago",
            metrics: {
              likes: 4,
              comments: 1
            },
            replies: [
              {
                author: {
                  firstName: "Ava",
                  lastName: "Thompson",
                  handle: "@avat",
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&auto=format",
                },
                content: "I follow the 'Yoga for Athletes' program on YouTube. It has specific routines for different workout days. Highly recommend checking it out!",
                timestamp: "2h 10m ago",
                metrics: {
                  likes: 3,
                  comments: 0
                }
              }
            ]
          }
        ]
      }
    ]
  },
  // Example post with comment media - Emma Davis
  {
    index: 21,
    category: "fitness",
    author: {
      firstName: "Emma",
      lastName: "Davis",
      handle: "@emmad",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "admin" as const,
      titleBadge: {
        title: "Community Star",
        tier: "silver" as const,
        icon: "⭐"
      }
    },
    content: "Just finished my morning workout routine! What's your favorite exercise to start the day with?",
    timestamp: "2h ago",
    metrics: {
      likes: 45,
      comments: 12,
      userReacted: true,
      userReactionType: 'inspired' as const
    },
    pinned: false,
    replies: [
      {
        author: {
          firstName: "David",
          lastName: "Johnson",
          handle: "@davidj",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format",
          role: "founder" as const,
          titleBadge: {
            title: "Workout Master",
            tier: "platinum" as const,
            icon: "🔥"
          }
        },
        content: "I always start with some light stretching and then move into a 10-minute HIIT session. Here's my progress from the last month:",
        timestamp: "1h ago",
        metrics: {
          likes: 8,
          comments: 3
        },
        media: {
          // Single photo in comment example
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1593476550610-87baa860004a?w=800&h=600&fit=crop",
          aspectRatio: 1.33
        },
        replies: [
          {
            author: {
              firstName: "Emma",
              lastName: "Davis",
              handle: "@emmad",
              avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces&auto=format",
              role: "admin" as const
            },
            content: "That's impressive progress, David! How many days a week are you doing this routine?",
            timestamp: "58m ago",
            metrics: {
              likes: 3,
              comments: 1
            }
          },
          {
            author: {
              firstName: "David",
              lastName: "Johnson",
              handle: "@davidj",
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format",
              role: "founder" as const
            },
            content: "I'm currently doing it 4 days a week. Here's my full weekly schedule:",
            timestamp: "45m ago",
            metrics: {
              likes: 2,
              comments: 0
            },
            mediaItems: [
              // Carousel in reply example
              {
                type: "image" as const,
                url: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&h=600&fit=crop",
                aspectRatio: 1.33
              },
              {
                type: "image" as const,
                url: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop",
                aspectRatio: 1.33
              },
              {
                type: "image" as const,
                url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop",
                aspectRatio: 1.33
              }
            ]
          }
        ]
      },
      {
        author: {
          firstName: "Sarah",
          lastName: "Williams",
          handle: "@sarahfit",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&auto=format",
          role: "moderator" as const
        },
        content: "I've been loving yoga as my morning routine. It really helps set a positive tone for the day! Check out this quick flow:",
        timestamp: "1h ago",
        metrics: {
          likes: 12,
          comments: 2
        },
        media: {
          // Video in comment example
          type: "video" as const,
          url: "https://player.vimeo.com/external/459389137.sd.mp4?s=39df92260aa7c60e5a10448e23c60c267dab43ff&profile_id=139",
          thumbnail: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=900&fit=crop"
        },
        replies: [
          {
            author: {
              firstName: "Mike",
              lastName: "Chen",
              handle: "@mikefit",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
              role: "founder" as const
            },
            content: "That's a great flow! I've been trying to get into yoga myself. Is this good for beginners?",
            timestamp: "45m ago",
            metrics: {
              likes: 3,
              comments: 1
            }
          },
          {
            author: {
              firstName: "Sarah",
              lastName: "Williams",
              handle: "@sarahfit",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&auto=format",
              role: "moderator" as const
            },
            content: "Absolutely! Start with 10 minutes a day and gradually increase. Here are some beginner poses:",
            timestamp: "30m ago",
            metrics: {
              likes: 4,
              comments: 0
            },
            mediaItems: [
              {
                type: "image" as const,
                url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=900&fit=crop",
                aspectRatio: 0.67 // Portrait image
              },
              {
                type: "image" as const,
                url: "https://images.unsplash.com/photo-1599447292180-45a28f5008cc?w=600&h=900&fit=crop",
                aspectRatio: 0.67 // Portrait image
              }
            ]
          }
        ]
      }
    ]
  },
  // Landscape-only carousel post
  {
    index: 16,
    category: "weight-training",
    author: {
      firstName: "Alex",
      lastName: "Chen",
      handle: "@alexfitpro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "founder" as const
    },
    content: "LANDSCAPE CAROUSEL EXAMPLE: Check out these workout space photos from my recent gym tour. All images are landscape orientation, so they maintain natural height while respecting maximum height constraints.",
    timestamp: "3h ago",
    metrics: {
      likes: 28,
      comments: 4
    },
    mediaItems: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      }
    ]
  },
  // Mixed portrait and landscape images post
  {
    index: 15,
    category: "yoga",
    author: {
      firstName: "Jamie",
      lastName: "Rodriguez",
      handle: "@jamiefit",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "founder" as const
    },
    content: "MIXED PORTRAIT & LANDSCAPE EXAMPLE: Here's a carousel with mixed portrait and landscape photos from my latest fitness photoshoot. The UX maintains consistent styling while respecting each image's aspect ratio. Swipe through to see both orientations.",
    timestamp: "Just now",
    metrics: {
      likes: 42,
      comments: 7
    },
    mediaItems: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=1200&fit=crop&auto=format", // Portrait
        aspectRatio: 0.66 // 2:3 aspect ratio (portrait)
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      }
    ]
  },
  // Text-only post with long content to demonstrate the 9-line truncation rule
  {
    index: 14,
    category: "weight-training",
    author: {
      firstName: "David",
      lastName: "Rodriguez",
      handle: "davidfit",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    content: `LINE 1: This text-only post demonstrates the 9-line truncation rule.

LINE 2: You should see exactly 9 lines before the "Show more" button appears.

LINE 3: Each numbered line helps us verify the truncation is working correctly.

LINE 4: The text should be cut off after the 9th line of content.

LINE 5: We're using both line-clamp CSS and max-height to ensure proper truncation.

LINE 6: This line should still be visible before truncation occurs.

LINE 7: Only two more lines will be visible after this one.

LINE 8: This is the second-to-last visible line before truncation.

LINE 9: This is the last visible line before the content gets truncated.

LINE 10: This line should NOT be visible until "Show more" is clicked.

LINE 11: This line should also be hidden until expanded.

LINE 12: The "Show more" button should appear after line 9, not after this line.

LINE 13: When you click "Show more", all of these lines will become visible.

LINE 14: Thanks for testing the text truncation feature!`,
    timestamp: "15m",
    metrics: {
      likes: 45,
      comments: 8
    }
  },
  // Example post with Instagram story-sized image (9:16 aspect ratio)
  {
    index: 13,
    category: "cardio",
    author: {
      firstName: "Sophia",
      lastName: "Garcia",
      handle: "sophiafitness",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop"
    },
    content: "INSTAGRAM STORY SIZE (9:16): Just finished my morning run! This image has a 9:16 aspect ratio like an Instagram story. Notice how it's displayed with preserved aspect ratio, maximum height of 600px, and centered horizontally in the container.",
    timestamp: "5m",
    metrics: {
      likes: 42,
      comments: 5
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&h=1600&fit=crop"
    }
  },
  // Example post with PORTRAIT image (taller than wide)
  {
    index: 10,
    category: "yoga",
    author: {
      firstName: "Emma",
      lastName: "Chen",
      handle: "emmayoga",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      verified: true
    },
    content: "PORTRAIT IMAGE EXAMPLE: Just finished my morning yoga session! This pose really helps with flexibility and balance. Notice how this portrait image (taller than wide) is displayed with preserved aspect ratio, 600px maximum height, and centered horizontally in the container.",
    timestamp: "10m",
    metrics: {
      likes: 58,
      comments: 7
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=900&fit=crop"
    }
  },
  // Example post with LANDSCAPE image (wider than tall)
  {
    index: 11,
    category: "cardio",
    author: {
      firstName: "Jason",
      lastName: "Miller",
      handle: "jasonruns",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
    },
    content: "LANDSCAPE IMAGE EXAMPLE: Beautiful trail run this morning! This landscape image (wider than tall) spans the full width of the post container with 16dp padding on sides, and its height is proportionally scaled while preserving the aspect ratio.",
    timestamp: "25m",
    metrics: {
      likes: 124,
      comments: 15
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=900&h=500&fit=crop"
    }
  },
  // Example post with SQUARE image (1:1 aspect ratio)
  {
    index: 12,
    category: "nutrition",
    author: {
      firstName: "Olivia",
      lastName: "Taylor",
      handle: "oliviaeats",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      role: "admin" as const
    },
    content: "SQUARE IMAGE EXAMPLE: Meal prepped for the week! This square image (1:1 aspect ratio) is displayed with preserved aspect ratio, 600px maximum height, and centered horizontally in the container.",
    timestamp: "1h",
    metrics: {
      likes: 210,
      comments: 32
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=800&fit=crop"
    }
  },
  // Long post example with "See more" button
  {
    index: 0,
    category: "fitness",
    author: {
      firstName: "Sarah",
      lastName: "Williams",
      handle: "sarahfit",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      verified: true,
      role: "admin" as const
    },
    content: `# My 30-Day Fitness Journey: Transforming Mind and Body

Hello Bloom Community! 👋

I wanted to share my recent 30-day fitness journey that completely transformed not just my body, but my entire mindset about health and wellness.

## The Challenge

I challenged myself to 30 days of consistent exercise, mindful eating, and proper recovery. Here's what my routine looked like:

- 🏋️‍♀️ Strength training: 4 days/week
- 🏃‍♀️ Cardio: 3 days/week (mix of HIIT and steady-state)
- 🧘‍♀️ Yoga/mobility: Daily (even if just for 10 minutes)
- 💧 Water intake: Minimum 3 liters daily
- 😴 Sleep: Prioritized 7-8 hours every night

## The Struggles

Let me be honest - it wasn't always easy. There were days when my motivation was at rock bottom. Week 2 was particularly challenging as my body was adjusting to the new routine. I hit a plateau around day 18 and felt like giving up.

## The Breakthroughs

Around day 21, something magical happened. The workouts that once felt impossible became manageable. I started looking forward to my morning routine. My energy levels stabilized, and I noticed significant improvements in my mood and focus throughout the day.

## Physical Changes

- Lost 4.5 pounds (mostly fat, preserved muscle)
- Dropped 1.5 inches from my waist
- Increased my push-up max from 10 to 18
- Improved my mile time by 45 seconds

## Mental Changes (The Real Victory)

- Reduced anxiety levels
- Better stress management
- Improved sleep quality
- Enhanced focus at work
- Greater overall confidence

## Key Lessons Learned

1. **Consistency trumps intensity**: Showing up every day, even for a lighter workout, is more important than occasional intense sessions.

2. **Progress isn't linear**: Some days you'll feel stronger, some days weaker. Trust the process.

3. **Community matters**: Having accountability partners (thank you to everyone who supported me here!) made all the difference.

4. **Recovery is not optional**: Rest days and proper sleep are when the real transformation happens.

5. **Mindset is everything**: Approaching fitness as a form of self-care rather than punishment changed everything.

I'm sharing this not to boast, but to hopefully inspire someone who might be hesitating to start their own journey. Remember, the goal isn't perfection - it's progress.

Who's ready to take on their own 30-day challenge? I'm happy to share my detailed workout plan and nutrition approach with anyone interested!

#FitnessJourney #30DayChallenge #MindBodyTransformation`,
    timestamp: "2h",
    metrics: {
      likes: 287,
      comments: 42
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
    },
    replies: [
      {
        author: {
          firstName: "Michael",
          lastName: "Carter",
          handle: "mikefitness",
          avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
          role: "founder" as const
        },
        content: "This is absolutely inspiring, Sarah! Your dedication is exactly what our community is all about. Would love to feature your journey in our next newsletter if you're open to it.",
        timestamp: "1h 45m",
        metrics: {
          likes: 89,
          comments: 2
        },
        replies: [
          {
            author: {
              firstName: "Sarah",
              lastName: "Williams",
              handle: "sarahfit",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
              role: "admin" as const
            },
            content: "Absolutely! I'd be honored. Just DM me the details.",
            timestamp: "1h 30m",
            metrics: {
              likes: 24,
              comments: 0
            }
          }
        ]
      },
      {
        author: {
          firstName: "Tanya",
          lastName: "Rodriguez",
          handle: "tanyafitlife",
          avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop"
        },
        content: "Thank you for sharing such a detailed account of your journey! Question: did you follow a specific meal plan during these 30 days or just focus on general nutrition principles?",
        timestamp: "1h 20m",
        metrics: {
          likes: 42,
          comments: 1
        },
        category: "nutrition"
      },
      {
        author: {
          firstName: "David",
          lastName: "Kim",
          handle: "davidkim",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
        },
        content: "That plateau on day 18 is so relatable! I've hit that wall in every fitness program I've tried. Would love to know more about how you pushed through it mentally.",
        timestamp: "55m",
        metrics: {
          likes: 35,
          comments: 0
        },
        media: {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=800&fit=crop&auto=format", // Landscape
          aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
        }
      }
    ]
  },
  // Repost example
  {
    index: 9,
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
      comments: 5
    },
    replies: [
      {
        author: {
          firstName: "Jamie",
          lastName: "Lee",
          handle: "jamierunner",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        },
        content: "Same here! I noticed way fewer injuries once I started taking post-run stretching seriously. What's your favorite stretch?",
        timestamp: "12m",
        metrics: {
          likes: 8,
          comments: 1
        }
      },
      {
        author: {
          firstName: "Alex",
          lastName: "Johnson",
          handle: "alexj",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        content: "@jamierunner Definitely the standing quad stretch and seated hamstring stretch. Game changers!",
        timestamp: "8m",
        metrics: {
          likes: 4,
          comments: 0
        }
      },
      {
        author: {
          firstName: "Emma",
          lastName: "Davis",
          handle: "nutritioncoach",
          avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
          role: "admin" as const
        },
        content: "Thanks for sharing, Alex! It's always great to see members adding their own experiences to the tips shared here.",
        timestamp: "5m",
        metrics: {
          likes: 12,
          comments: 0
        }
      }
    ],
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
        comments: 234
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
      comments: 156
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
          comments: 12
        },
        replies: [
          {
            author: {
              firstName: "John",
              lastName: "Smith",
              handle: "fitnesspro",
              avatar: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
              role: "founder" as const
            },
            content: "That's an impressive goal, Sarah! Let me know if you want any feedback on your technique. It's all about that hip hinge.",
            timestamp: "55m",
            metrics: {
              likes: 45,
              comments: 0
            },
            replies: [
              {
                author: {
                  firstName: "Sarah",
                  lastName: "Johnson",
                  handle: "gymlife",
                  avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
                },
                content: "Definitely would appreciate that! I struggle with keeping my back straight at heavier weights. Any specific cues you recommend?",
                timestamp: "45m",
                metrics: {
                  likes: 12,
                  comments: 0
                },
                replies: [
                  {
                    author: {
                      firstName: "John",
                      lastName: "Smith",
                      handle: "fitnesspro",
                      avatar: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
                      role: "founder" as const
                    },
                    content: "Try thinking 'proud chest' and 'bend the bar around your legs'. Also, film yourself from the side to check your form - you'll be surprised how helpful this is!",
                    timestamp: "39m",
                    metrics: {
                      likes: 21,
                      comments: 0
                    }
                  },
                  {
                    author: {
                      firstName: "Alex",
                      lastName: "Rodriguez",
                      handle: "alexfitness",
                      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                    },
                    content: "I struggled with the same issue. What helped me was doing pause deadlifts with lighter weight to build positional strength. @gymlife give it a try!",
                    timestamp: "32m",
                    metrics: {
                      likes: 8,
                      comments: 0
                    }
                  }
                ]
              },
              {
                author: {
                  firstName: "Emma",
                  lastName: "Davis",
                  handle: "nutritioncoach",
                  avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
                  role: "admin" as const
                },
                content: "Great conversation here! Proper form is so crucial not just for performance but for staying injury-free. @John_Smith your tutorials have helped so many in the community!",
                timestamp: "28m",
                metrics: {
                  likes: 19,
                  comments: 0
                }
              }
            ]
          }
        ]
      },
      {
        author: {
          firstName: "Marcus",
          lastName: "Chen",
          handle: "liftmaster",
          avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop"
        },
        content: "Congrats on the PR! What's your warm-up routine before heavy deadlifts? I've been struggling with getting properly activated.",
        timestamp: "1h 45m",
        metrics: {
          likes: 78,
          comments: 1
        }
      },
      {
        author: {
          firstName: "John",
          lastName: "Smith",
          handle: "fitnesspro",
          avatar: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
          role: "founder" as const
        },
        content: "@liftmaster I do 5 minutes light cardio, then band pull-aparts, kettlebell swings, and light Romanian deadlifts. I find activating glutes and hamstrings first makes a huge difference.",
        timestamp: "1h 30m",
        metrics: {
          likes: 92,
          comments: 0
        },
        category: "weight-training"
      },
      {
        author: {
          firstName: "Priya",
          lastName: "Patel",
          handle: "priyalifts",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        },
        content: "Your tips helped me correct my deadlift form and I'm finally seeing progress without low back pain! Currently at 225lbs and aiming for 275 by summer 💪",
        timestamp: "30m",
        metrics: {
          likes: 64,
          comments: 0
        },
        media: {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&h=300&fit=crop"
        }
      }
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
      comments: 234
    },
    media: {
      type: "link" as const,
      url: "https://www.verywellfit.com/essential-yoga-poses-for-beginners-3566747",
      title: "31 Yoga Poses for Beginners",
      domain: "verywellfit.com",
      thumbnail: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop",
    },
    replies: [
      {
        author: {
          firstName: "Rachel",
          lastName: "Green",
          handle: "rachelg",
          avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop"
        },
        content: "I've been intimidated by yoga for so long, but these poses look manageable! Do you think it's better to start with a class or follow along with videos at home?",
        timestamp: "4h 30m",
        metrics: {
          likes: 67,
          comments: 1
        }
      },
      {
        author: {
          firstName: "Emma",
          lastName: "Davis",
          handle: "nutritioncoach",
          avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
          role: "admin" as const
        },
        content: "@rachelg Great question! If you're completely new, I'd recommend starting with a beginner class so an instructor can check your form. Once you're comfortable with the basics, home practice with videos is perfect for consistency!",
        timestamp: "4h 15m",
        metrics: {
          likes: 48,
          comments: 0
        }
      },
      {
        author: {
          firstName: "Jason",
          lastName: "Wong",
          handle: "jasonw",
          avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=400&fit=crop"
        },
        content: "I've been doing yoga as part of my recovery days between heavy lifting sessions and it's been a game changer. Improved my flexibility and actually helped with my squat depth!",
        timestamp: "3h 20m",
        metrics: {
          likes: 94,
          comments: 2
        },
        category: "weight-training",
        replies: [
          {
            author: {
              firstName: "Lisa",
              lastName: "Park",
              handle: "lisastrong",
              avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
            },
            content: "I've had the same experience! What specific poses have you found most helpful for squat mobility?",
            timestamp: "3h",
            metrics: {
              likes: 28,
              comments: 0
            }
          },
          {
            author: {
              firstName: "Jason",
              lastName: "Wong",
              handle: "jasonw",
              avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=400&fit=crop"
            },
            content: "@lisastrong Pigeon pose, lizard pose, and deep yogic squats (malasana) have been the most effective for me. I do them 3x a week for about 15 minutes.",
            timestamp: "2h 45m",
            metrics: {
              likes: 37,
              comments: 0
            }
          }
        ]
      },
      {
        author: {
          firstName: "Amir",
          lastName: "Hassan",
          handle: "amiryoga",
          avatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
        },
        content: "This guide is great! One tip I'd add for beginners: don't compare yourself to others in class or online. Yoga is about YOUR journey and progress. Some days you'll be more flexible than others, and that's perfectly okay.",
        timestamp: "2h",
        metrics: {
          likes: 112,
          comments: 0
        },
        media: {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1532798442725-41036acc7489?w=400&h=300&fit=crop"
        }
      }
    ]
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
      thumbnail: "https://images.unsplash.com/photo-1662045010180-a2b1ac1652b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://https://plus.unsplash.com/premium_photo-1664109999537-088e7d964da2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dphotogenicmind.com/wp-content/uploads/2024/12/Female-Fitness-Photoshoot-31.12.2024-1.jpg",
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
  {
    index: 10,
    category: "weight-training",
    author: {
      firstName: "Emma",
      lastName: "Rodriguez",
      handle: "emmafit",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      verified: true,
    },
    content: "Just finished my vertical pull workout! 💪 Here's my go-to exercise for back development - the proper form is key!",
    timestamp: "15m",
    metrics: {
      likes: 214,
      comments: 27,
      shares: 13,
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&h=1200&fit=crop",
      aspectRatio: 0.33 // Very tall image (1:3 ratio)
    },
  },
  // Example post with threaded comment experience with media
  {
    index: 21,
    category: "fitness",
    author: {
      firstName: "Emma",
      lastName: "Davis",
      handle: "@emmad",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "admin" as const,
    },
    content: "Just completed my first 10K run in under an hour! So proud of my progress over the last few months. What milestones are you all working towards?",
    timestamp: "2h ago",
    metrics: {
      likes: 87,
      comments: 14,
    },
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=800&h=600&fit=crop&auto=format",
      aspectRatio: 1.33
    },
    replies: [
      {
        author: {
          firstName: "David",
          lastName: "Johnson",
          handle: "@davidj",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format",
          role: "founder" as const,
        },
        content: "Amazing achievement, Emma! I'm currently training for a half marathon next month. Here's my favorite running trail:",
        timestamp: "1h ago",
        metrics: {
          likes: 12,
          comments: 3,
        },
        media: {
          // Single image in comment example
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&h=600&fit=crop&auto=format",
          aspectRatio: 1.33
        },
        replies: [
          {
            author: {
              firstName: "Emma",
              lastName: "Davis",
              handle: "@emmad",
              avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces&auto=format",
              role: "admin" as const,
            },
            content: "That's a beautiful trail! Where is it located?",
            timestamp: "58m ago",
            metrics: {
              likes: 3,
              comments: 1,
            }
          },
          {
            author: {
              firstName: "David",
              lastName: "Johnson",
              handle: "@davidj",
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format",
              role: "founder" as const,
            },
            content: "It's in Golden Gate Park, San Francisco. Here are some more views from my run this morning:",
            timestamp: "45m ago",
            metrics: {
              likes: 4,
              comments: 3,
            },
            mediaItems: [
              // Carousel in reply example
              {
                type: "image" as const,
                url: "https://images.unsplash.com/photo-1533922922960-9fceb9ef4733?w=800&h=600&fit=crop&auto=format",
                aspectRatio: 1.33
              },
              {
                type: "image" as const,
                url: "https://images.unsplash.com/photo-1602431702087-7ac0b4c1d960?w=800&h=600&fit=crop&auto=format",
                aspectRatio: 1.33
              },
              {
                type: "image" as const,
                url: "https://images.unsplash.com/photo-1512335156536-5f95ed9cd0c8?w=800&h=600&fit=crop&auto=format",
                aspectRatio: 1.33
              }
            ],
            replies: [
              {
                author: {
                  firstName: "Mike",
                  lastName: "Chen",
                  handle: "@mikefit",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
                  role: "moderator" as const,
                },
                content: "I've been there! The trails are fantastic. We should organize a group run sometime.",
                timestamp: "30m ago",
                metrics: {
                  likes: 2,
                  comments: 2,
                },
                replies: [
                  {
                    author: {
                      firstName: "David",
                      lastName: "Johnson",
                      handle: "@davidj",
                      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format",
                      role: "founder" as const,
                    },
                    content: "That's a great idea! Let's plan something for next weekend.",
                    timestamp: "25m ago",
                    metrics: {
                      likes: 1,
                      comments: 0,
                    }
                  },
                  {
                    author: {
                      firstName: "Emma",
                      lastName: "Davis",
                      handle: "@emmad",
                      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces&auto=format",
                      role: "admin" as const,
                    },
                    content: "Count me in! I'd love to join a group run.",
                    timestamp: "20m ago",
                    metrics: {
                      likes: 1,
                      comments: 0,
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        author: {
          firstName: "Sarah",
          lastName: "Williams",
          handle: "@sarahfit",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&auto=format",
          role: "moderator" as const,
        },
        content: "Way to go, Emma! I'm working towards improving my strength training. Here's a video of my deadlift form - any tips?",
        timestamp: "45m ago",
        metrics: {
          likes: 9,
          comments: 4,
        },
        media: {
          // Video in comment example
          type: "video" as const,
          url: "https://player.vimeo.com/external/477260057.sd.mp4?s=f89a2bf20c81457c9865c586a917a11bef0680f0&profile_id=139",
          thumbnail: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=800&h=600&fit=crop&auto=format"
        },
        replies: [
          {
            author: {
              firstName: "Alex",
              lastName: "Lee",
              handle: "@alexl",
              avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces&auto=format",
              role: "moderator" as const,
            },
            content: "Your form looks good! Try keeping your gaze neutral instead of looking up - it helps maintain proper spine alignment.",
            timestamp: "30m ago",
            metrics: {
              likes: 5,
              comments: 2,
            },
            replies: [
              {
                author: {
                  firstName: "Sarah",
                  lastName: "Williams",
                  handle: "@sarahfit",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&auto=format",
                  role: "moderator" as const,
                },
                content: "Thanks for the tip! I'll try that in my next session.",
                timestamp: "20m ago",
                metrics: {
                  likes: 2,
                  comments: 0,
                }
              },
              {
                author: {
                  firstName: "Mike",
                  lastName: "Chen",
                  handle: "@mikefit",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
                  role: "moderator" as const,
                },
                content: "Also, engage your lats a bit more before lifting. It'll help protect your lower back.",
                timestamp: "15m ago",
                metrics: {
                  likes: 3,
                  comments: 1,
                },
                replies: [
                  {
                    author: {
                      firstName: "Sarah",
                      lastName: "Williams",
                      handle: "@sarahfit",
                      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&auto=format",
                      role: "moderator" as const,
                    },
                    content: "Great point! I've been working on that. Here's my attempt at engaging the lats more:",
                    timestamp: "10m ago",
                    metrics: {
                      likes: 2,
                      comments: 0,
                    },
                    mediaItems: [
                      {
                        type: "image" as const,
                        url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&auto=format",
                        aspectRatio: 1.33
                      },
                      {
                        type: "image" as const,
                        url: "https://images.unsplash.com/photo-1534438097545-a2c22c5135c6?w=800&h=600&fit=crop&auto=format",
                        aspectRatio: 1.33
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            author: {
              firstName: "Emma",
              lastName: "Davis",
              handle: "@emmad",
              avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces&auto=format",
              role: "admin" as const,
            },
            content: "Looking strong, Sarah! My strength goal is to do 10 pull-ups in a row.",
            timestamp: "25m ago",
            metrics: {
              likes: 4,
              comments: 0,
            }
          }
        ]
      }
    ]
  },
];

// Array for pinned posts in the UI
const PINNED_POSTS: PostProps[] = [
  PINNED_POST_999,
  PINNED_POST_998,
  PINNED_POST_997,
  PINNED_POST_996,
  PINNED_POST_995,
  PINNED_POST_994
];

// Sort options type
type SortOption = "latest" | "newest" | "oldest";

const Community = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeFilter, setActiveFilter] = useState("all");
  const [pinnedPosts, setPinnedPosts] = useState<PostProps[]>(PINNED_POSTS);
  const [currentSort, setCurrentSort] = useState<SortOption>("newest");
  const navigate = useNavigate();
  
  // Pull-to-reveal search functionality
  const { isVisible: isSearchVisible } = usePullToReveal({
    threshold: 50,
    hideThreshold: 100
  });

  const filteredPosts = MOCK_POSTS.filter(post => 
    (activeFilter === "all" || post.category === activeFilter) && !post.pinned
  );

  // Make sure all posts have valid index properties
  const postsWithIndices = filteredPosts.map((post, idx) => {
    // If post doesn't have an index property, assign one based on its position
    if (typeof post.index !== 'number') {
      return { ...post, index: 100 + idx }; // Use 100+ to avoid conflicts with existing indices
    }
    return post;
  });

  const sortedPosts = [...postsWithIndices].sort((a, b) => {
    if (currentSort === "latest") {
      // Sort by engagement (likes + comments)
      const engagementA = a.metrics.likes + a.metrics.comments;
      const engagementB = b.metrics.likes + b.metrics.comments;
      return engagementB - engagementA;
    } else if (currentSort === "newest") {
      // For demo, using timestamp string comparison
      return b.timestamp.localeCompare(a.timestamp);
    } else if (currentSort === "oldest") {
      // For demo, using timestamp string comparison
      return a.timestamp.localeCompare(b.timestamp);
    }
    return 0;
  });

  const handleUnpin = (postIndex: number) => {
    setPinnedPosts(prevPosts => prevPosts.filter(post => post.index !== postIndex));
  };

  // Render community feed
  const renderCommunityFeed = () => {
    return (
      <>
        {/* Pull-to-reveal search bar */}
        <PullToSearchBar
          isVisible={isSearchVisible}
        />
        
        <CreatePost />
        
        <div className="space-y-4">
          {pinnedPosts.length > 0 && (
            <PinnedPosts pinnedPosts={pinnedPosts} onUnpin={handleUnpin} />
          )}
          <div className="flex flex-col">
            <SortOptions 
              currentSort={currentSort}
              onSortChange={setCurrentSort}
            />
            <div className="h-px bg-border w-full" />
          </div>
          {sortedPosts.map((post) => (
            <FeedPost key={post.index} {...post} />
          ))}
        </div>
      </>
    );
  };

  // Render webview content
  const renderWebview = () => {
    return (
      <div className="p-8 text-center text-muted-foreground">
        This is a webview
      </div>
    );
  };

  // Main render function
  const renderContent = () => {
    if (currentPath === "/community") {
      return renderCommunityFeed();
    }
    
    if (["/community/challenges", "/community/meetups", "/community/leaderboard"].includes(currentPath)) {
      return renderWebview();
    }
    
    return null;
  };

  return (
    <div className="flex flex-col flex-1">
      <CommunityHeader />
      <ConditionalCommunityTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Community;