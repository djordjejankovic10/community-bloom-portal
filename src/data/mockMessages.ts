import { Conversation, Message } from "@/types/message";

// Current user
export const CURRENT_USER = {
  id: "current-user",
  name: "Jamie Doe",
  avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
  handle: "jamiedoe"
};

// Mock conversations
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    participants: [
      CURRENT_USER,
      {
        id: "user1",
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        online: true
      }
    ],
    unreadCount: 3
  },
  {
    id: "conv2",
    participants: [
      CURRENT_USER,
      {
        id: "user2",
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
        online: false
      }
    ],
    unreadCount: 0
  },
  {
    id: "conv3",
    participants: [
      CURRENT_USER,
      {
        id: "user3",
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
        online: true
      }
    ],
    unreadCount: 1
  },
  {
    id: "conv4",
    participants: [
      CURRENT_USER,
      {
        id: "user4",
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=400&h=400&fit=crop",
        online: false
      }
    ],
    unreadCount: 0
  }
];

// Mock conversation messages
export const MOCK_MESSAGES: { [key: string]: Message[] } = {
  "conv1": [
    {
      id: "msg1-1",
      senderId: "user1",
      type: "text",
      content: "Hey! Just saw your latest workout post. Those gains are impressive!",
      timestamp: "2025-04-28T09:30:00",
      isRead: true
    },
    {
      id: "msg1-2",
      senderId: "current-user",
      type: "text",
      content: "Thanks Mike! Been really focusing on consistency these past few months.",
      timestamp: "2025-04-28T09:32:00",
      isRead: true
    },
    {
      id: "msg1-3",
      senderId: "user1",
      type: "text",
      content: "It definitely shows. What's your current split looking like?",
      timestamp: "2025-04-28T09:33:00",
      isRead: true
    },
    {
      id: "msg1-4",
      senderId: "current-user",
      type: "text",
      content: "I'm doing push/pull/legs with a rest day after each cycle. Finding it works better for recovery than a traditional 5-day split.",
      timestamp: "2025-04-28T09:35:00",
      isRead: true
    },
    {
      id: "msg1-5",
      senderId: "user1", 
      type: "image",
      content: "Check out this new workout program I've been testing with my clients. Getting great results!",
      timestamp: "2025-04-28T09:40:00",
      isRead: false,
      media: {
        url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&h=400&fit=crop",
        type: "image"
      }
    },
    {
      id: "msg1-6",
      senderId: "user1", 
      type: "text",
      content: "Let me know if you'd be interested in trying it out. I could customize it for your goals!",
      timestamp: "2025-04-28T09:41:00",
      isRead: false
    },
    {
      id: "msg1-7",
      senderId: "user1", 
      type: "text",
      content: "Also, are you planning to join the community challenge next month?",
      timestamp: "2025-04-28T15:10:00",
      isRead: false
    }
  ],
  "conv2": [
    {
      id: "msg2-1",
      senderId: "user2",
      type: "text",
      content: "Hi! I saw you commented on my nutrition post. Have you tried meal prepping before?",
      timestamp: "2025-04-27T14:20:00",
      isRead: true
    },
    {
      id: "msg2-2",
      senderId: "current-user",
      type: "text",
      content: "Yes, I try to meal prep on Sundays, but I'm always looking for new recipes and ideas!",
      timestamp: "2025-04-27T14:25:00",
      isRead: true
    },
    {
      id: "msg2-3",
      senderId: "user2",
      type: "text",
      content: "That's great! Consistency is key with nutrition. What's your biggest challenge with meal prepping?",
      timestamp: "2025-04-27T14:27:00",
      isRead: true
    },
    {
      id: "msg2-4",
      senderId: "current-user",
      type: "text",
      content: "Honestly, getting enough variety so I don't get bored of eating the same things all week. Any tips?",
      timestamp: "2025-04-27T14:30:00",
      isRead: true
    },
    {
      id: "msg2-5",
      senderId: "user2",
      type: "text",
      content: "Absolutely! I always recommend prepping base ingredients rather than full meals. So cook your proteins, carbs, and veggies separately, then mix and match with different sauces and seasonings throughout the week.",
      timestamp: "2025-04-27T14:35:00",
      isRead: true
    },
    {
      id: "msg2-6",
      senderId: "current-user",
      type: "text",
      content: "That's a really good idea! I'll try that approach next week. Do you have any favorite sauce recipes that are healthy?",
      timestamp: "2025-04-27T14:40:00",
      isRead: true
    },
    {
      id: "msg2-7",
      senderId: "user2",
      type: "image",
      content: "Here's a simple chart of my favorite healthy sauces! They all keep well in the fridge for about a week.",
      timestamp: "2025-04-27T14:45:00",
      isRead: true,
      media: {
        url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
        type: "image"
      }
    }
  ],
  "conv3": [
    {
      id: "msg3-1",
      senderId: "user3",
      type: "text",
      content: "Hi there! I noticed you were interested in my cold therapy post. Have you tried ice baths before?",
      timestamp: "2025-04-28T11:05:00",
      isRead: true
    },
    {
      id: "msg3-2",
      senderId: "current-user",
      type: "text",
      content: "I've done cold showers but haven't braved a full ice bath yet! Bit intimidated by the temperature to be honest.",
      timestamp: "2025-04-28T11:10:00",
      isRead: true
    },
    {
      id: "msg3-3",
      senderId: "user3",
      type: "text",
      content: "That's completely understandable! Cold showers are actually a perfect way to build up tolerance. Have you been consistent with them?",
      timestamp: "2025-04-28T11:15:00",
      isRead: true
    },
    {
      id: "msg3-4",
      senderId: "current-user",
      type: "text",
      content: "I try to do 30 seconds at the end of every shower. Still feels shocking every time though!",
      timestamp: "2025-04-28T11:18:00",
      isRead: true
    },
    {
      id: "msg3-5",
      senderId: "user3",
      type: "text",
      content: "That's great discipline! If you want to work up to an ice bath, try gradually increasing the time each week. Start with 30s, then 45s, then 1min, and so on. Your body will adapt!",
      timestamp: "2025-04-28T11:22:00",
      isRead: true
    },
    {
      id: "msg3-6",
      senderId: "user3",
      type: "text",
      content: "By the way, I'm hosting a recovery workshop next month covering all aspects of recovery - would love to see you there if you're interested!",
      timestamp: "2025-04-28T13:45:00",
      isRead: false
    }
  ],
  "conv4": [
    {
      id: "msg4-1",
      senderId: "user4",
      type: "text",
      content: "Hey! Thanks for joining my nutrition challenge. How's it going so far?",
      timestamp: "2025-04-26T10:15:00",
      isRead: true
    },
    {
      id: "msg4-2",
      senderId: "current-user",
      type: "text",
      content: "It's been eye-opening! I never realized how much protein I was missing in my diet before tracking it.",
      timestamp: "2025-04-26T10:20:00",
      isRead: true
    },
    {
      id: "msg4-3",
      senderId: "user4",
      type: "text",
      content: "That's one of the most common realizations! What changes have you made to increase your protein intake?",
      timestamp: "2025-04-26T10:25:00",
      isRead: true
    },
    {
      id: "msg4-4",
      senderId: "current-user",
      type: "text",
      content: "Added Greek yogurt to my breakfast, having protein with every meal, and drinking a shake on workout days. Already feeling more energetic!",
      timestamp: "2025-04-26T10:30:00",
      isRead: true
    },
    {
      id: "msg4-5",
      senderId: "current-user",
      type: "image",
      content: "Here's my breakfast setup this morning!",
      timestamp: "2025-04-26T10:32:00",
      isRead: true,
      media: {
        url: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=600&h=400&fit=crop",
        type: "image"
      }
    },
    {
      id: "msg4-6",
      senderId: "user4",
      type: "text",
      content: "That looks amazing! Great job incorporating those protein sources. Keep up the good work, and let me know if you have any questions as the challenge continues!",
      timestamp: "2025-04-26T10:35:00",
      isRead: true
    }
  ]
};

// Get conversation by ID
export const getConversationById = (id: string): Conversation | undefined => {
  return MOCK_CONVERSATIONS.find(conversation => conversation.id === id);
};

// Get messages for a conversation
export const getMessagesByConversationId = (id: string): Message[] => {
  return MOCK_MESSAGES[id] || [];
};

// Get other participant in a conversation (not the current user)
export const getOtherParticipant = (conversation: Conversation) => {
  return conversation.participants.find(p => p.id !== CURRENT_USER.id);
};

// Format timestamp for display
export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.getDate() === now.getDate() &&
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear();
  
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};
