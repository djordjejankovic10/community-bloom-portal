import { 
  SearchResult, 
  SearchResultType,
  GroupSearchResult, 
  ChannelSearchResult,
  PostSearchResult,
  MemberSearchResult,
  ChallengeSearchResult,
  EventSearchResult,
  CircleSearchResult,
  MeetupSearchResult,
  RecordingSearchResult
} from "@/types/search";

// Groups
const groupResults: GroupSearchResult[] = [
  {
    id: "g1",
    type: "group",
    title: "Fitness Enthusiasts",
    description: "A community for fitness lovers to share tips, progress, and motivation.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    linkTo: "/groups/fitness-enthusiasts",
    memberCount: 1248
  },
  {
    id: "g2",
    type: "group",
    title: "Yoga Practitioners",
    description: "Connect with fellow yoga enthusiasts and improve your practice.",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=300&fit=crop",
    linkTo: "/groups/yoga-practitioners",
    memberCount: 845
  },
  {
    id: "g3",
    type: "group",
    title: "Running Club",
    description: "For runners of all levels - from beginners to marathoners.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop",
    linkTo: "/groups/running-club",
    memberCount: 567
  }
];

// Channels
const channelResults: ChannelSearchResult[] = [
  {
    id: "c1",
    type: "channel",
    title: "Weight Training",
    description: "Discussion about weight training techniques and programs.",
    linkTo: "/groups/fitness-enthusiasts/weight-training",
    group: {
      id: "g1",
      name: "Fitness Enthusiasts"
    }
  },
  {
    id: "c2",
    type: "channel",
    title: "Nutrition",
    description: "Share recipes and discuss proper nutrition for fitness goals.",
    linkTo: "/groups/fitness-enthusiasts/nutrition",
    group: {
      id: "g1",
      name: "Fitness Enthusiasts"
    }
  },
  {
    id: "c3",
    type: "channel",
    title: "Yoga Poses",
    description: "Learn and discuss different yoga poses and sequences.",
    linkTo: "/groups/yoga-practitioners/poses",
    group: {
      id: "g2",
      name: "Yoga Practitioners"
    }
  }
];

// Posts
const postResults: PostSearchResult[] = [
  {
    id: "p1",
    type: "post",
    title: "5 Essential Weight Training Exercises",
    description: "Check out these 5 essential exercises that should be part of every weight training routine...",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
    linkTo: "/community/post/1",
    author: {
      id: "u2",
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    timestamp: "2d ago"
  },
  {
    id: "p2",
    type: "post",
    title: "My Yoga Journey: From Beginner to Instructor",
    description: "I wanted to share my journey of how I went from struggling with basic poses to becoming an instructor...",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    linkTo: "/community/post/2",
    author: {
      id: "u3",
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop"
    },
    timestamp: "1w ago"
  },
  {
    id: "p3",
    type: "post",
    title: "Cold Therapy Guide: Ice Baths vs. Cold Showers",
    description: "A complete breakdown on ice baths vs. cold showers. Both have their place in recovery...",
    image: "https://images.unsplash.com/photo-1574086642850-6fd5a4f4b848?w=400&h=300&fit=crop",
    linkTo: "/community/post/8",
    author: {
      id: "u4",
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
    },
    timestamp: "4d ago"
  }
];

// Members
const memberResults: MemberSearchResult[] = [
  {
    id: "u1",
    type: "member",
    title: "John Smith",
    handle: "johnsmith",
    description: "Fitness enthusiast & personal trainer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkTo: "/profile/johnsmith",
    followers: 156
  },
  {
    id: "u2",
    type: "member",
    title: "Mike Johnson",
    handle: "fitcoach",
    description: "Certified fitness coach & nutrition expert",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkTo: "/profile/fitcoach",
    followers: 843
  },
  {
    id: "u3",
    type: "member",
    title: "Emma Davis",
    handle: "nutritioncoach",
    description: "Nutrition specialist & wellness advocate",
    avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
    linkTo: "/profile/nutritioncoach",
    followers: 1245
  },
  {
    id: "u4",
    type: "member",
    title: "Maya Patel",
    handle: "recoverycoach",
    description: "Recovery & mobility specialist",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    linkTo: "/profile/recoverycoach",
    followers: 731
  }
];

// Challenges
const challengeResults: ChallengeSearchResult[] = [
  {
    id: "ch1",
    type: "challenge",
    title: "30-Day Weight Training Challenge",
    description: "Build strength and muscle with this progressive 30-day weight training program.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
    linkTo: "/challenges/30-day-weight-training",
    participants: 324,
    startDate: "2025-05-01",
    endDate: "2025-05-30"
  },
  {
    id: "ch2",
    type: "challenge",
    title: "21-Day Yoga Challenge",
    description: "Improve flexibility and mindfulness with daily yoga sessions for 21 days.",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=300&fit=crop",
    linkTo: "/challenges/21-day-yoga",
    participants: 256,
    startDate: "2025-05-15",
    endDate: "2025-06-05"
  }
];

// Events
const eventResults: EventSearchResult[] = [
  {
    id: "e1",
    type: "event",
    title: "Community Group Run",
    description: "Join us for a 5K community run through Central Park. All levels welcome!",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop",
    linkTo: "/events/community-run",
    date: "2025-05-10",
    time: "09:00 AM",
    attendees: 42
  },
  {
    id: "e2",
    type: "event",
    title: "Live Yoga Session with Emma",
    description: "Virtual yoga session focusing on beginner and intermediate poses with live Q&A.",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=300&fit=crop",
    linkTo: "/events/live-yoga-emma",
    date: "2025-05-08",
    time: "6:00 PM",
    attendees: 128
  },
  {
    id: "e3",
    type: "event",
    title: "Nutrition Workshop",
    description: "Learn how to meal prep for optimal fitness results with nutrition expert Mike Johnson.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    linkTo: "/events/nutrition-workshop",
    date: "2025-05-15",
    time: "7:30 PM",
    attendees: 85
  }
];

// Circles
const circleResults: CircleSearchResult[] = [
  {
    id: "circ1",
    type: "circle",
    title: "Fitness Pros Circle",
    description: "An exclusive circle for fitness professionals to network and share knowledge.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    linkTo: "/circles/fitness-pros",
    memberCount: 75
  },
  {
    id: "circ2",
    type: "circle",
    title: "Wellness Creators",
    description: "A circle for content creators focused on health and wellness topics.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    linkTo: "/circles/wellness-creators",
    memberCount: 48
  },
  {
    id: "circ3",
    type: "circle",
    title: "Nutrition Experts",
    description: "Connect with nutritionists, dietitians, and food scientists.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    linkTo: "/circles/nutrition-experts",
    memberCount: 92
  }
];

// Recordings
const recordingResults: RecordingSearchResult[] = [
  {
    id: "rec1",
    type: "recording",
    title: "Mobility Training Workshop",
    description: "A recorded workshop on improving mobility for better athletic performance.",
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&h=300&fit=crop",
    linkTo: "/recordings/mobility-workshop",
    duration: "45:22",
    date: "2025-03-15"
  },
  {
    id: "rec2",
    type: "recording",
    title: "Nutrition for Athletes Webinar",
    description: "Expert panel discussing nutrition strategies for athletes at different levels.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    linkTo: "/recordings/nutrition-webinar",
    duration: "1:12:47",
    date: "2025-04-02"
  },
  {
    id: "rec3",
    type: "recording",
    title: "Guided Meditation Session",
    description: "A calming guided meditation focused on recovery and mindfulness for athletes.",
    image: "https://images.unsplash.com/photo-1536623958193-eaf5a988479d?w=400&h=300&fit=crop",
    linkTo: "/recordings/meditation-session",
    duration: "22:15",
    date: "2025-04-28"
  }
];

// Meetups
const meetupResults: MeetupSearchResult[] = [
  {
    id: "meet1",
    type: "meetup",
    title: "Downtown Fitness Meetup",
    description: "Weekly meetup for fitness enthusiasts in the downtown area. All levels welcome!",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    linkTo: "/meetups/downtown-fitness",
    date: "Every Saturday",
    location: "Central Park, Main Entrance",
    attendees: 28
  },
  {
    id: "meet2",
    type: "meetup",
    title: "Yoga by the Beach",
    description: "Join us for sunrise yoga sessions by the beach every Sunday morning.",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=300&fit=crop",
    linkTo: "/meetups/beach-yoga",
    date: "Every Sunday",
    location: "Ocean View Beach, Pier 9",
    attendees: 35
  },
  {
    id: "meet3",
    type: "meetup",
    title: "Nutrition & Cooking Club",
    description: "Monthly meetup focusing on healthy cooking techniques and meal prep.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    linkTo: "/meetups/cooking-club",
    date: "First Saturday monthly",
    location: "Community Center, Kitchen Area",
    attendees: 22
  }
];

// Combine all results
export const ALL_SEARCH_RESULTS: SearchResult[] = [
  ...groupResults,
  ...channelResults,
  ...postResults,
  ...memberResults,
  ...challengeResults,
  ...eventResults,
  ...circleResults,
  ...recordingResults,
  ...meetupResults
];

// Function to filter results by type
export const getResultsByType = (type: SearchResultType | 'all'): SearchResult[] => {
  if (type === 'all') {
    return ALL_SEARCH_RESULTS;
  }
  return ALL_SEARCH_RESULTS.filter(result => result.type === type);
};

// Function to search across all results
export const searchResults = (query: string, type: SearchResultType | 'all' = 'all'): SearchResult[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  if (!lowercaseQuery) {
    return type === 'all' ? [] : getResultsByType(type);
  }
  
  const filterByQuery = (results: SearchResult[]): SearchResult[] => {
    return results.filter(result => 
      result.title.toLowerCase().includes(lowercaseQuery) || 
      (result.description?.toLowerCase().includes(lowercaseQuery) || false)
    );
  };
  
  if (type === 'all') {
    return filterByQuery(ALL_SEARCH_RESULTS);
  }
  
  return filterByQuery(getResultsByType(type));
};
