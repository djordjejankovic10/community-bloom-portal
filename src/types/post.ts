export type PostMetrics = {
  likes: number;
  comments: number;
  shares: number;
};

export type PostMedia = {
  type: "link" | "image" | "video";
  url: string;
  title?: string;
  domain?: string;
  thumbnail?: string;
};

export type PostAuthor = {
  firstName: string;
  lastName: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  role?: "admin" | "founder";
};

export type PostProps = {
  author: PostAuthor;
  content: string;
  timestamp: string;
  metrics: PostMetrics;
  media?: PostMedia;
  replies?: PostProps[];
  index?: number;
  pinned?: boolean;
  onUnpin?: () => void;
  isEmbedded?: boolean;
  isDetail?: boolean;
  originalPost?: PostProps; // For reposts
  repostComment?: string; // Optional comment on repost
  category?: string; // The circle/category the post belongs to
};
