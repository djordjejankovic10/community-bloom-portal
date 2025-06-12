export type PostMetrics = {
  likes: number;
  comments: number;
  shares?: number;
  // Track user reactions
  userReacted?: boolean;
  userReactionType?: 'inspired' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
};

export type PostMedia = {
  type: "link" | "image" | "video";
  url: string;
  title?: string;
  domain?: string;
  thumbnail?: string;
  aspectRatio?: number; // Width divided by height, for tall image detection
};

export type PostAuthor = {
  firstName: string;
  lastName: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  role?: "founder" | "admin" | "moderator";
  titleBadge?: {
    title: string;
    tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
    icon: string;
  };
};

export type PostProps = {
  author: PostAuthor;
  content: string;
  timestamp: string;
  metrics: PostMetrics;
  media?: PostMedia;
  mediaItems?: PostMedia[]; // Multiple media items for carousel
  replies?: PostProps[];
  index?: number;
  pinned?: boolean;
  onUnpin?: () => void;
  isEmbedded?: boolean;
  isDetail?: boolean;
  isReply?: boolean;
  originalPost?: PostProps; // For reposts
  repostComment?: string; // Optional comment on repost
  category?: string; // The circle/category the post belongs to
  parentId?: number; // ID of parent post for replies
};
