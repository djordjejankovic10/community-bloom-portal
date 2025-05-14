import { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  MessageCircle, 
  MoreVertical, 
  Link2, 
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Type of reaction
type ReactionType = 'inspired' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

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
  inspired: number;
  love: number;
  haha: number;
  wow: number;
  sad: number;
  angry: number;
};

// Mock data for current user
const CURRENT_USER: ReactionUser = {
  name: "Current User",
  handle: "@currentuser",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces&auto=format",
  role: "",
  reactionType: 'inspired'
};

// Reaction icons and colors
const REACTION_DATA = {
  inspired: { 
    icon: <ThumbsUp className="h-4 w-4" />, 
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    label: "Inspired"
  },
  love: { 
    icon: <Heart className="h-4 w-4" />, 
    color: "text-red-500",
    bgColor: "bg-red-500",
    label: "Love"
  },
  haha: {
    icon: <span className="text-base">😂</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    label: "Haha"
  },
  wow: {
    icon: <span className="text-base">😮</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500", 
    label: "Wow"
  },
  sad: {
    icon: <span className="text-base">😢</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    label: "Sad"
  },
  angry: {
    icon: <span className="text-base">😡</span>,
    color: "text-red-600",
    bgColor: "bg-red-600",
    label: "Angry"
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
      reactionType: 'inspired'
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
      reactionType: 'haha'
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
      reactionType: 'inspired'
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
      reactionType: 'inspired'
    }
  ];

  // Return random subset of users based on count
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, users.length));
};

export const FeedPost = ({ 
  author, 
  content, 
  timestamp, 
  metrics: initialMetrics, 
  media, 
  replies, 
  index, 
  pinned, 
  onUnpin, 
  isEmbedded = false, 
  isDetail = false, 
  originalPost, 
  category,
  isReply = false 
}: PostProps) => {
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
    inspired: Math.floor(initialMetrics.likes * 0.7),
    love: Math.floor(initialMetrics.likes * 0.2),
    haha: Math.floor(initialMetrics.likes * 0.05),
    wow: Math.floor(initialMetrics.likes * 0.03),
    sad: Math.floor(initialMetrics.likes * 0.02),
    angry: 0
  });
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [reactionMenuPosition, setReactionMenuPosition] = useState({ x: 0, y: 0 });
  const reactionButtonRef = useRef<HTMLButtonElement>(null);
  const reactionMenuRef = useRef<HTMLDivElement>(null);
  
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
    
    // Simply toggle between 'inspired' and null (no reaction)
    const nextReaction: ReactionType | null = userReaction === null ? 'inspired' : null;
    
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
    // Skip navigation for embedded posts only
    if (isEmbedded) return;
    
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

  // Determine if post should use compact styling
  const isCompact = isReply || isEmbedded;

  // Handle long-press on reaction button
  const handleLongPress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Set long press state to true to show the menu
    setIsLongPressed(true);
    
    // Close the menu automatically after 3 seconds if no selection is made
    const timer = setTimeout(() => {
      if (isLongPressed) setIsLongPressed(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  };
  
  // Handle selection of a specific reaction
  const handleReactionSelect = (reaction: ReactionType, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If the user clicks the same reaction they already had, remove it
    const nextReaction = userReaction === reaction ? null : reaction;
    
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
        return prev.filter(reactor => reactor.handle !== CURRENT_USER.handle);
      });
    }
    
    // Close the reaction menu
    setIsLongPressed(false);
  };
  
  // Close reaction menu when clicking outside
  useEffect(() => {
    if (!isLongPressed) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (reactionMenuRef.current && !reactionMenuRef.current.contains(event.target as Node)) {
        setIsLongPressed(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLongPressed]);

  return (
    <div className={cn(
      "w-full max-w-full block",
      isEmbedded ? "" : (!isReply && "border-b"),
      pinned && "bg-secondary/30 border-l-2 border-l-primary"
    )}>
      <div 
        className={cn(
          "w-full max-w-full", 
          isEmbedded ? "p-2" : (isReply ? "p-3 pb-1" : "p-4 pb-0"),
          !isEmbedded && "hover:bg-accent/10 cursor-pointer",
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
        
        {(!isEmbedded && !isReply) && <div className="absolute top-4 right-4">
          <Drawer>
            <DrawerTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-4">Post options</h3>
                <div className="space-y-2">
                  {onUnpin && pinned && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={onUnpin}
                    >
                      <Pin className="h-5 w-5 mr-3" />
                      Unpin post
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left" 
                    onClick={handleCopyLink}
                  >
                    <Link2 className="h-5 w-5 mr-3" />
                    Copy link to post
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left" 
                    onClick={handleCopyText}
                  >
                    <FileText className="h-5 w-5 mr-3" />
                    Copy text
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" 
                    onClick={handleReport}
                  >
                    <AlertOctagon className="h-5 w-5 mr-3" />
                    Report
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>}
        
        {/* Author header section */}
        <div className="flex gap-3 mb-3">
          <Avatar className={cn("flex-shrink-0", isReply ? "w-7 h-7" : "w-8 h-8")}>
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.firstName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5">
              <span className={cn("font-medium text-foreground", isReply ? "text-xs" : "text-sm")}>
                {author.firstName} {author.lastName}
              </span>
              <span className={cn("text-muted-foreground whitespace-nowrap", isReply ? "text-[10px]" : "text-xs")}>· {timestamp}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              {category && (
                <Badge variant="outline" className={cn("px-1 py-0 bg-accent/50 flex items-center", isReply ? "text-[9px]" : "text-[10px]")}>
                  {getCategoryIcon(category)}
                  {formatCategory(category)}
                </Badge>
              )}
              {author.role && (
                <Badge variant={isReply ? "outline" : "default"} className={cn("px-1 py-0", isReply ? "text-[9px]" : "text-[10px]")}>
                  {author.role}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Post content - now at the container level, not nested */}
        <p 
          ref={contentRef}
          className={cn(
            isReply ? "text-sm" : "text-base", 
            "text-foreground py-1.5 my-1",
            isContentTruncated && !showFullContent ? 'line-clamp-10 max-h-[300px] overflow-hidden' : ''
          )}
        >
          {/* Display different captions based on reply status unless in detail view */}
          {!isReply && !isDetail && replies && replies.length > 0 ? (
            replies.some(reply => reply.replies && reply.replies.length > 0) ? 
              "This post has threaded replies" : 
              "This post has replies"
          ) : (
            content
          )}
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
        
        {/* Media content - now at the container level, not nested */}
        {media && (
          <div className="mt-2 rounded-lg overflow-hidden">
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
      </div>
      
      {/* Display reaction counters (only if not in detail view) */}
      {!isEmbedded && !isReply && !isDetail && (
        <div className="flex items-center justify-between w-full max-w-full px-4 mt-2 text-muted-foreground text-sm">
          <Drawer open={reactionsOpen} onOpenChange={setReactionsOpen}>
            <DrawerTrigger asChild>
              <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer" onClick={(e) => e.stopPropagation()}>
                <div className="flex -space-x-1">
                  {reactionsCount.inspired > 0 && (
                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-blue-500 text-white border-2 border-background">
                      <ThumbsUp className="h-3 w-3" />
                    </div>
                  )}
                  {reactionsCount.love > 0 && (
                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500 text-white border-2 border-background">
                      <Heart className="h-3 w-3" />
                    </div>
                  )}
                  {reactionsCount.haha > 0 && (
                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-yellow-500 text-white border-2 border-background">
                      <span className="text-xs">😂</span>
                    </div>
                  )}
                  {reactionsCount.wow > 0 && (
                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-yellow-500 text-white border-2 border-background">
                      <span className="text-xs">😮</span>
                    </div>
                  )}
                  {reactionsCount.sad > 0 && (
                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-yellow-500 text-white border-2 border-background">
                      <span className="text-xs">😢</span>
                    </div>
                  )}
                  {reactionsCount.angry > 0 && (
                    <div className="h-5 w-5 rounded-full flex items-center justify-center bg-red-600 text-white border-2 border-background">
                      <span className="text-xs">😡</span>
                    </div>
                  )}
                </div>
                <span>{totalReactions}</span>
              </div>
            </DrawerTrigger>
            <DrawerContent className="min-h-[50vh]" onClick={(e) => e.stopPropagation()}>
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
          </div>
        </div>
      )}
      
      {/* Action buttons (keep these in all views) */}
      {!isEmbedded && !isReply && (
        <div className="py-3">
          <div className="grid grid-cols-2 w-full max-w-full">
            <button 
              ref={reactionButtonRef}
              className={cn(
                "flex items-center justify-center gap-2 py-2 transition-colors text-sm w-full relative",
                userReaction ? "text-primary" : "text-muted-foreground"
              )}
              onClick={handleReactionToggle}
              onContextMenu={handleLongPress}
              onMouseDown={(e) => {
                const timer = setTimeout(() => {
                  if (e.button === 0) { // Only for left click
                    handleLongPress(e);
                  }
                }, 500);
                
                const handleMouseUp = () => {
                  clearTimeout(timer);
                  window.removeEventListener('mouseup', handleMouseUp);
                };
                
                window.addEventListener('mouseup', handleMouseUp);
              }}
              onTouchStart={(e) => {
                const timer = setTimeout(() => handleLongPress(e), 500);
                
                const handleTouchEnd = () => {
                  clearTimeout(timer);
                  window.removeEventListener('touchend', handleTouchEnd);
                };
                
                window.addEventListener('touchend', handleTouchEnd);
              }}
            >
              {userReaction ? (
                <>
                  <ThumbsUp className="h-5 w-5 fill-current" />
                  <span>{REACTION_DATA[userReaction].label}</span>
                </>
              ) : (
                <>
                  <ThumbsUp className="h-5 w-5" />
                  <span>Inspired</span>
                </>
              )}
              
              {/* Reaction selection menu */}
              {isLongPressed && (
                <div
                  ref={reactionMenuRef}
                  className="fixed transform -translate-x-1/2 bg-background rounded-full shadow-lg p-2 z-[100] animate-in fade-in-0 zoom-in-95 border"
                  style={{ 
                    left: '50%',
                    bottom: '100px',
                    width: 'max-content',
                    maxWidth: '90vw',
                    overflow: 'hidden'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1 overflow-x-auto py-1 px-1">
                    <TooltipProvider delayDuration={200}>
                      {Object.entries(REACTION_DATA).map(([key, data]) => (
                        <Tooltip key={key}>
                          <TooltipTrigger asChild>
                            <button
                              className={cn(
                                "h-11 w-11 sm:h-9 sm:w-9 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-accent transition-transform hover:scale-125",
                                userReaction === key && `${data.color} animate-pulse`
                              )}
                              onClick={(e) => handleReactionSelect(key as ReactionType, e)}
                            >
                              <div className="h-5 w-5 flex items-center justify-center">{data.icon}</div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>{data.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </div>
                </div>
              )}
            </button>
            
            <button 
              className="flex items-center justify-center gap-2 py-2 text-muted-foreground transition-colors text-sm w-full"
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
          </div>
        </div>
      )}

      {/* Add reply button for threaded replies */}
      {isReply && !isEmbedded && (
        <div className="ml-8 mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              if (typeof index === 'number') {
                navigate(`/community/post/${index}?replyTo=${author.firstName.toLowerCase()}_${author.lastName.toLowerCase()}`);
              }
            }}
          >
            Reply
          </Button>
        </div>
      )}
      
      {!isEmbedded && !isReply && <Separator className="w-full max-w-full" />}
    </div>
  );
};