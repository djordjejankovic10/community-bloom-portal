import { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Share, 
  MoreVertical, 
  Link2, 
  Share2, 
  FileText, 
  AlertOctagon, 
  Play, 
  Pin,
  Dumbbell,
  StretchVertical,
  Battery,
  Apple,
  Utensils,
  ThumbsUp
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PostProps } from "@/types/post";

// Type of reaction
type ReactionType = 'like' | 'love' | 'laugh' | 'wow' | 'sad';

// Type for a user who reacted to a post
type ReactionUser = {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  reactionType: ReactionType;
};

// Reactions count type
type ReactionsCount = {
  like: number;
  love: number;
  laugh: number;
  wow: number;
  sad: number;
};

// Mock data for current user
const CURRENT_USER: ReactionUser = {
  name: "Current User",
  handle: "@currentuser",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces&auto=format",
  role: "",
  reactionType: 'like'
};

// Reaction icons and colors
const REACTION_DATA = {
  like: { 
    icon: <ThumbsUp className="h-full w-full" />, 
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    label: "Like"
  },
  love: { 
    icon: <Heart className="h-full w-full" />, 
    color: "text-red-500",
    bgColor: "bg-red-500",
    label: "Love"
  },
  laugh: {
    icon: <span className="text-[10px]">😂</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    label: "Haha"
  },
  wow: {
    icon: <span className="text-[10px]">😮</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500", 
    label: "Wow"
  },
  sad: {
    icon: <span className="text-[10px]">😢</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    label: "Sad"
  }
};

// Mock data for users who reacted to the post
const generateReactors = (count: number): ReactionUser[] => {
  const users: ReactionUser[] = [
    {
      name: "David Johnson",
      handle: "@davidj",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "Founder",
      reactionType: 'like'
    },
    {
      name: "Sarah Williams",
      handle: "@sarahfit",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "Admin",
      reactionType: 'love'
    },
    {
      name: "Mike Chen",
      handle: "@mikefit",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "",
      reactionType: 'laugh'
    },
    {
      name: "Emma Davis",
      handle: "@emmad",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "Admin",
      reactionType: 'wow'
    },
    {
      name: "Alex Lee",
      handle: "@alexl",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "",
      reactionType: 'sad'
    },
    {
      name: "Lisa Park",
      handle: "@lisap",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "",
      reactionType: 'like'
    },
    {
      name: "Ryan Smith",
      handle: "@ryansmith",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "",
      reactionType: 'love'
    },
    {
      name: "Taylor Wong",
      handle: "@taylorw",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "",
      reactionType: 'like'
    }
  ];

  // Return random subset of users based on count
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, users.length));
};

export const FeedPost = ({ author, content, timestamp, metrics: initialMetrics, media, replies, index, pinned, onUnpin, isEmbedded = false, isDetail = false, originalPost, category }: PostProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isContentTruncated, setIsContentTruncated] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [reactors, setReactors] = useState<ReactionUser[]>([]);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [activeFilter, setActiveFilter] = useState<ReactionType | 'all'>('all');
  const [reactionsCount, setReactionsCount] = useState<ReactionsCount>({
    like: Math.floor(initialMetrics.likes * 0.7),
    love: Math.floor(initialMetrics.likes * 0.2),
    laugh: Math.floor(initialMetrics.likes * 0.05),
    wow: Math.floor(initialMetrics.likes * 0.03),
    sad: Math.floor(initialMetrics.likes * 0.02),
  });
  
  // Calculate total reactions
  const totalReactions = Object.values(reactionsCount).reduce((sum, count) => sum + count, 0);
  
  // Generate mock reactors when the metrics change
  useEffect(() => {
    if (metrics) {
      const mockReactors = generateReactors(metrics.likes);
      setReactors(mockReactors);
    }
  }, [metrics]);
  
  // Handle reaction toggle
  const handleReactionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Simply toggle between 'like' and null (no reaction)
    const nextReaction: ReactionType | null = userReaction === null ? 'like' : null;
    
    setUserReaction(nextReaction);
    
    // Update reaction counts
    setReactionsCount(prev => {
      const newCounts = {...prev};
      
      // Remove previous reaction if existed
      if (userReaction) {
        newCounts[userReaction] = Math.max(0, newCounts[userReaction] - 1);
      }
      
      // Add new reaction if selected
      if (nextReaction) {
        newCounts[nextReaction] = newCounts[nextReaction] + 1;
      }
      
      return newCounts;
    });
    
    // Update metrics
    setMetrics(prev => {
      const newLikesCount = nextReaction ? totalReactions + 1 : totalReactions - 1;
      return {
        ...prev,
        likes: newLikesCount
      };
    });
    
    // Update reactors list
    if (nextReaction) {
      // Add current user to the beginning of reactors list with the new reaction
      const updatedUser = {...CURRENT_USER, reactionType: nextReaction};
      setReactors(prev => {
        const filtered = prev.filter(reactor => reactor.handle !== CURRENT_USER.handle);
        return [updatedUser, ...filtered];
      });
    } else {
      // Remove current user from reactors
      setReactors(prev => {
        const filtered = prev.filter(reactor => reactor.handle !== CURRENT_USER.handle);
        return filtered;
      });
    }
  };
  
  // Filter reactors based on active filter
  const filteredReactors = activeFilter === 'all' 
    ? reactors 
    : reactors.filter(reactor => reactor.reactionType === activeFilter);
  
  // Capitalize the first letter of category for display
  const formatCategory = (cat: string) => {
    return cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "General";
  };
  
  // Map category names to their respective icons
  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'weight-training':
        return <Dumbbell className="h-2.5 w-2.5 mr-1" />;
      case 'cardio':
        return <Heart className="h-2.5 w-2.5 mr-1" />;
      case 'yoga':
        return <StretchVertical className="h-2.5 w-2.5 mr-1" />;
      case 'recovery':
        return <Battery className="h-2.5 w-2.5 mr-1" />;
      case 'nutrition':
        return <Apple className="h-2.5 w-2.5 mr-1" />;
      case 'keto-diet':
        return <Utensils className="h-2.5 w-2.5 mr-1" />;
      default:
        return <MessageCircle className="h-2.5 w-2.5 mr-1" />; // Default icon for uncategorized posts
    }
  };
  
  // Check if content is longer than 10 lines
  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
      const height = contentRef.current.scrollHeight;
      const lines = Math.floor(height / (lineHeight || 20)); // fallback to 20px if lineHeight is not available
      
      // Only truncate if not in detail view
      setIsContentTruncated(!isEmbedded && !isDetail && lines > 10);
    }
  }, [content, isEmbedded, isDetail]);

  const handleClick = () => {
    // Skip navigation for embedded posts or replies
    if (isEmbedded || replies) return;
    
    // If this is a repost with an original post that has an index, navigate to that original post
    if (originalPost && typeof originalPost.index === 'number') {
      navigate(`/community/post/${originalPost.index}`);
      return;
    }
    
    // For normal posts, navigate to the post detail view
    // Use the post's index if available, otherwise use 0 as a fallback
    const postId = typeof index === 'number' ? index : 0;
    navigate(`/community/post/${postId}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      description: "Link copied to clipboard",
    });
  };

  const handleShareLink = async () => {
    try {
      await navigator.share({
        url: window.location.href,
      });
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(content);
    toast({
      description: "Text copied to clipboard",
    });
  };

  const handleReport = () => {
    toast({
      description: "Post reported. Thank you for helping keep our community safe.",
    });
  };

  return (
    <div className={cn(
      "w-full max-w-full block",
      isEmbedded ? "" : "border-b",
      pinned && "bg-secondary/30 border-l-2 border-l-primary"
    )}>
      <div 
        className={cn(
          "w-full max-w-full", 
          isEmbedded ? "p-2" : "p-4 pb-0",
          !isEmbedded && "hover:bg-accent cursor-pointer",
          "transition-colors relative"
        )}
        onClick={isEmbedded ? undefined : handleClick}
      >
        {pinned && (
          <div className="flex items-center gap-1.5 mb-2 text-primary text-xs font-medium">
            <Pin className="h-3.5 w-3.5" />
            Pinned post
          </div>
        )}
        
        {!isEmbedded && <div className="absolute top-4 right-4">
          <Drawer>
            <DrawerTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-2 space-y-2">
                <div className="mx-auto h-1 w-12 rounded-full bg-muted mb-4" />
                {pinned && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnpin?.();
                    }}
                    className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <Pin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Unpin post</span>
                  </button>
                )}
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <Link2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Copy link</span>
                </button>
                <button
                  onClick={handleShareLink}
                  className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <Share2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Share link</span>
                </button>
                <button
                  onClick={handleCopyText}
                  className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Copy text</span>
                </button>
                <Separator className="my-1" />
                <button
                  onClick={handleReport}
                  className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors text-destructive"
                >
                  <AlertOctagon className="h-4 w-4" />
                  <span className="text-sm font-medium">Report</span>
                </button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>}
        
        <div className="flex gap-3 w-full max-w-full">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.firstName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 w-full max-w-full">
            <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5">
              <span className="font-medium text-foreground text-sm">
                {author.firstName} {author.lastName}
              </span>
              <span className="text-muted-foreground text-xs whitespace-nowrap">· {timestamp}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 mb-1">
              <Badge variant="outline" className="text-[10px] px-1 py-0 bg-accent/50 flex items-center">
                {getCategoryIcon(category)}
                {formatCategory(category)}
              </Badge>
              {author.role && (
                <Badge variant="default" className="text-[10px] px-1 py-0">
                  {author.role}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-full mt-2">
          <p 
            ref={contentRef}
            className={`text-base text-foreground py-[10px] my-[3px] ${isContentTruncated && !showFullContent ? 'line-clamp-10 max-h-[300px] overflow-hidden' : ''}`}
          >
            {content}
          </p>
          {isContentTruncated && !showFullContent && !isEmbedded && (
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium mt-1"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof index === 'number') {
                  navigate(`/community/post/${index}`);
                } else if (originalPost && typeof originalPost.index === 'number') {
                  navigate(`/community/post/${originalPost.index}`);
                }
              }}
            >
              See more
            </Button>
          )}
        </div>
        
        {media && (
          <div className="mt-2 rounded-lg overflow-hidden w-full max-w-full">
            {media.type === "image" ? (
              <img
                src={media.url}
                alt=""
                className="w-full h-auto rounded-lg"
              />
            ) : media.type === "video" ? (
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={media.thumbnail || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&fit=crop"}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-background/80 hover:bg-background/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle video playback here
                      console.log("Play video:", media.url);
                    }}
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            ) : (
              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border rounded-lg overflow-hidden hover:bg-accent"
                onClick={(e) => e.stopPropagation()}
              >
                {media.thumbnail && (
                  <img
                    src={media.thumbnail}
                    alt=""
                    className="w-full h-[160px] object-cover"
                  />
                )}
                <div className="p-2">
                  <div className="text-foreground font-medium text-sm">
                    {media.title}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {media.domain}
                  </div>
                </div>
              </a>
            )}
          </div>
        )}
        
        {originalPost && !isEmbedded && (
          <div className="mt-3 border rounded-lg overflow-hidden w-full max-w-full">
            <div className="p-3">
              <div className="flex gap-3 w-full">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={originalPost.author.avatar} />
                  <AvatarFallback>{originalPost.author.firstName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5">
                    <span className="font-medium text-foreground text-sm">
                      {originalPost.author.firstName} {originalPost.author.lastName}
                    </span>
                    {originalPost.author.role && (
                      <Badge variant="default" className="text-[10px] px-1 py-0">
                        {originalPost.author.role}
                      </Badge>
                    )}
                    <span className="text-muted-foreground text-xs whitespace-nowrap">· {originalPost.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-base text-foreground">{originalPost.content}</p>
                  {originalPost.media && (
                    <div className="mt-2 rounded-lg overflow-hidden">
                      {originalPost.media.type === "image" ? (
                        <img
                          src={originalPost.media.url}
                          alt=""
                          className="w-full h-auto rounded-lg"
                        />
                      ) : originalPost.media.type === "video" ? (
                        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                          <img
                            src={originalPost.media.thumbnail || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&fit=crop"}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-full bg-background/80 hover:bg-background/90"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle video playback here
                                console.log("Play video:", originalPost.media?.url);
                              }}
                            >
                              <Play className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={originalPost.media.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block border rounded-lg overflow-hidden hover:bg-accent"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src={originalPost.media.url}
                            alt=""
                            className="w-full h-auto"
                          />
                          <div className="p-2">
                            <div className="text-foreground font-medium text-sm">
                              {originalPost.media.title}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {originalPost.media.domain}
                            </div>
                          </div>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {!isEmbedded && (
        <div className="w-full max-w-full block">
          <div className="flex items-center justify-between w-full max-w-full px-4 mt-2 mb-1 text-muted-foreground text-sm">
            <Drawer open={reactionsOpen} onOpenChange={setReactionsOpen}>
              <DrawerTrigger asChild>
                <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer">
                  <div className="flex -space-x-1">
                    {reactionsCount.like > 0 && (
                      <div className="h-5 w-5 rounded-full flex items-center justify-center bg-blue-500 text-white border-2 border-background">
                        <ThumbsUp className="h-3 w-3" />
                      </div>
                    )}
                    {reactionsCount.love > 0 && (
                      <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500 text-white border-2 border-background">
                        <Heart className="h-3 w-3" />
                      </div>
                    )}
                    {reactionsCount.laugh > 0 && (
                      <div className="h-5 w-5 rounded-full flex items-center justify-center bg-yellow-500 text-white border-2 border-background">
                        <span className="text-[10px]">😂</span>
                      </div>
                    )}
                  </div>
                  <span>{totalReactions}</span>
                </div>
              </DrawerTrigger>
              <DrawerContent className="min-h-[50vh]">
                <div className="p-4 h-full min-h-[50vh] flex flex-col">
                  <div className="flex mb-4 border-b overflow-x-auto">
                    <button 
                      onClick={() => setActiveFilter('all')}
                      className={cn(
                        "px-4 py-2 text-sm font-medium",
                        activeFilter === 'all' 
                          ? "border-b-2 border-primary text-primary" 
                          : "text-muted-foreground"
                      )}
                    >
                      All {totalReactions}
                    </button>
                    
                    {Object.entries(reactionsCount).map(([reaction, count]) => {
                      if (count === 0) return null;
                      const reactionKey = reaction as ReactionType;
                      return (
                        <button 
                          key={reaction}
                          onClick={() => setActiveFilter(reactionKey)}
                          className={cn(
                            "px-4 py-2 text-sm font-medium flex items-center gap-1",
                            activeFilter === reactionKey 
                              ? "border-b-2 border-primary text-primary" 
                              : "text-muted-foreground"
                          )}
                        >
                          <div className={cn(
                            "h-4 w-4 rounded-full flex items-center justify-center text-white",
                            REACTION_DATA[reactionKey].bgColor
                          )}>
                            {REACTION_DATA[reactionKey].icon}
                          </div>
                          <span>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {filteredReactors.map((user, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className={cn(
                              "absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-white border-2 border-background",
                              REACTION_DATA[user.reactionType].bgColor
                            )}>
                              {REACTION_DATA[user.reactionType].icon}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.handle}</div>
                          </div>
                        </div>
                        {user.role && (
                          <Badge variant="outline" className="text-[10px]">
                            {user.role}
                          </Badge>
                        )}
                      </div>
                    ))}
                    
                    {filteredReactors.length < 5 && (
                      <div className="min-h-[30vh]"></div>
                    )}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
            <div className="flex items-center gap-2">
              <span>{metrics.comments} comments</span>
              {metrics.shares > 0 && (
                <>
                  <span>•</span>
                  <span>{metrics.shares} shares</span>
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-3 w-full max-w-full">
            <button 
              className={cn(
                "flex items-center justify-center gap-2 py-2 rounded-md transition-colors text-sm w-full",
                userReaction ? "text-primary" : "text-muted-foreground hover:bg-accent"
              )}
              onClick={handleReactionToggle}
            >
              {userReaction ? (
                <>
                  <ThumbsUp className="h-5 w-5 fill-current" />
                  <span>{REACTION_DATA[userReaction].label}</span>
                </>
              ) : (
                <>
                  <ThumbsUp className="h-5 w-5" />
                  <span>Like</span>
                </>
              )}
            </button>
            
            <button 
              className="flex items-center justify-center gap-2 py-2 rounded-md text-muted-foreground hover:bg-accent transition-colors text-sm w-full"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof index === 'number') {
                  navigate(`/community/post/${index}?showComments=true`);
                }
              }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </button>
            
            <button 
              className="flex items-center justify-center gap-2 py-2 rounded-md text-muted-foreground hover:bg-accent transition-colors text-sm w-full"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof index === 'number') {
                  navigate(`/community/repost/${index}`);
                }
              }}
            >
              <Repeat2 className="h-5 w-5" />
              <span>Repost</span>
            </button>
          </div>
        </div>
      )}
      
      {!isEmbedded && <Separator className="w-full max-w-full" />}
    </div>
  );
};