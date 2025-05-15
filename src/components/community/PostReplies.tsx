import { PostProps } from "@/types/post";
import { FeedPost } from "./FeedPost";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, MoreVertical, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define reaction types
type ReactionType = 'inspired' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
type ReactionsCount = Record<ReactionType, number>;

// Type for a user who reacted to a post
type ReactionUser = {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  reactionType: ReactionType;
};

// Define reaction data for icons and colors
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

// Mock data for users who reacted
const generateReactors = (count: number, reactionType: ReactionType = 'inspired'): ReactionUser[] => {
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
      role: "",
      reactionType: 'wow'
    },
    {
      name: "Alex Lee",
      handle: "@alexl",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "",
      reactionType: 'sad'
    }
  ];
  
  // Return random subset of users based on count
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, users.length));
};

interface PostRepliesProps {
  replies: PostProps[];
  parentAuthor?: string;
  level?: number;
  isLastReply?: boolean;
  onReply?: (author: string, content: string, avatar?: string) => void;
}

export const PostReplies = ({
  replies,
  parentAuthor,
  level = 0,
  isLastReply = false,
  onReply,
}: PostRepliesProps) => {
  const navigate = useNavigate();
  
  // Maximum nesting level to avoid excessive indentation
  const MAX_LEVEL = 3;
  const actualLevel = Math.min(level, MAX_LEVEL);
  
  // Calculate indentation based on level
  const leftIndent = actualLevel * 20; // 20px per level
  
  // Track reactions for each reply with its index
  const [userReactions, setUserReactions] = useState<Record<number, ReactionType | null>>({});
  
  // State for reaction drawers
  const [activeReplyIndex, setActiveReplyIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<ReactionType | 'all'>('all');
  const [reactors, setReactors] = useState<ReactionUser[]>([]);
  
  // State for long-press reaction menu
  const [isLongPressed, setIsLongPressed] = useState<number | null>(null);
  const reactionButtonRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const reactionMenuRef = useRef<HTMLDivElement>(null);
  
  // State to track expanded reply threads
  const [expandedThreads, setExpandedThreads] = useState<Record<number, boolean>>({});
  
  // Default number of replies to show initially
  const DEFAULT_REPLIES_SHOWN = 3;
  
  // Function to toggle thread expansion
  const toggleThreadExpansion = (index: number) => {
    setExpandedThreads(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  // Get background color based on nesting level for visual variety
  const getBubbleColor = (replyIndex: number, nestedLevel: number) => {
    // For light mode, preserve different shades based on nesting level
    // For dark mode, use consistent #383838 hex color for all bubbles
    if (nestedLevel === 0) return "bg-secondary/80 dark:[&]:bg-[#383838]";
    if (nestedLevel === 1) return "bg-secondary/90 dark:[&]:bg-[#383838]";
    
    // For deeper levels in light mode, use index to alternate
    return replyIndex % 2 === 0 
      ? "bg-secondary/70 dark:[&]:bg-[#383838]" 
      : "bg-secondary dark:[&]:bg-[#383838]";
  };
  
  // Handle reaction for a specific reply
  const handleReaction = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserReactions(prev => ({
      ...prev,
      [index]: prev[index] ? null : 'inspired'
    }));
  };
  
  // Handle long-press on reaction button
  const handleLongPress = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Set long press state to show menu
    setIsLongPressed(index);
    
    // Close the menu automatically after 3 seconds if no selection is made
    const timer = setTimeout(() => {
      if (isLongPressed === index) setIsLongPressed(null);
    }, 3000);
    
    return () => clearTimeout(timer);
  };
  
  // Handle selection of a specific reaction
  const handleReactionSelect = (index: number, reaction: ReactionType, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If the user clicks the same reaction they already had, remove it
    setUserReactions(prev => ({
      ...prev,
      [index]: prev[index] === reaction ? null : reaction
    }));
    
    // Close the reaction menu
    setIsLongPressed(null);
  };
  
  // Close reaction menu when clicking outside
  useEffect(() => {
    if (isLongPressed === null) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (reactionMenuRef.current && !reactionMenuRef.current.contains(event.target as Node)) {
        setIsLongPressed(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLongPressed]);
  
  // Handle opening reaction details drawer
  const handleOpenReactions = (index: number, totalLikes: number) => {
    setActiveReplyIndex(index);
    setActiveFilter('all');
    // Generate mock reactors for this reply
    setReactors(generateReactors(totalLikes));
  };
  
  // Filter reactors based on active filter
  const filteredReactors = activeFilter === 'all' 
    ? reactors 
    : reactors.filter(reactor => reactor.reactionType === activeFilter);
  
  return (
    <div className="relative mt-1">
      {replies.map((reply, index) => {
        const isLast = index === replies.length - 1;
        
        // Generate reaction counts for display (mock data)
        const totalLikes = reply.metrics.likes || 0;
        const reactionsCount = {
          inspired: Math.floor(totalLikes * 0.6),
          love: Math.floor(totalLikes * 0.2),
          haha: Math.floor(totalLikes * 0.05),
          wow: Math.floor(totalLikes * 0.05),
          sad: Math.floor(totalLikes * 0.05),
          angry: Math.floor(totalLikes * 0.05),
        };
        const totalReactions = Object.values(reactionsCount).reduce((sum, count) => sum + count, 0);
        
        // Check if user has reacted to this reply
        const hasReacted = userReactions[index] !== undefined && userReactions[index] !== null;
        const userReactionType = userReactions[index] || reply.metrics.userReactionType || null;
        
        // Calculate adjusted reaction count based on user interaction
        const adjustedReactionCount = hasReacted && !reply.metrics.userReacted 
          ? totalReactions + 1 
          : (!hasReacted && reply.metrics.userReacted ? totalReactions - 1 : totalReactions);
        
        return (
          <div key={index} className="relative">
            {/* Connecting line from parent to child */}
            {level > 0 && (
              <div 
                className={cn(
                  "absolute w-[1.5px] bg-border/60 dark:bg-border/40",
                  isLast && isLastReply ? "h-[30px]" : "h-full"
                )}
                style={{ 
                  left: leftIndent - 14, // Position line to connect with the avatar
                  top: 0
                }}
              />
            )}
            
            {/* Horizontal connector line */}
            {level > 0 && (
              <div 
                className="absolute h-[1.5px] bg-border/60 dark:bg-border/40"
                style={{ 
                  left: leftIndent - 14,
                  width: '12px',
                  top: '20px'
                }}
              />
            )}
            
            {/* Visual indicator for top-level replies */}
            {level === 0 && index > 0 && (
              <div className="h-[1px] w-full mb-2 bg-border/30 dark:bg-border/20" />
            )}
            
            {/* Reply post with indentation */}
            <div 
              className={cn(
                "relative pt-1",
                index > 0 && level === 0 ? "mt-3" : (index > 0 ? "mt-4" : "")
              )}
              style={{ 
                marginLeft: `${leftIndent}px`
              }}
            >
              {/* Custom comment display for cleaner UI */}
              <div 
                className={cn(
                  "flex gap-2 pb-1.5",
                  level > 0 && "rounded-lg overflow-hidden"
                )}
              >
                <Avatar className="w-8 h-8 mt-0 flex-shrink-0">
                  <AvatarImage src={reply.author.avatar} />
                  <AvatarFallback>{reply.author.firstName[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col">
                    <div className={cn(
                      "rounded-2xl pt-2 pb-2 px-3",
                      getBubbleColor(index, level)
                    )}>
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm text-foreground">
                            {reply.author.firstName} {reply.author.lastName}
                          </span>
                        </div>
                        
                        {/* 3-dot menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Copy link</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Report post</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>Hide comment</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      {/* Badges row */}
                      <div className="flex items-center gap-1 mt-0.5 mb-1">
                        {reply.category && (
                          <Badge variant="outline" className="px-1 py-0 bg-accent/50 text-[10px] flex items-center">
                            {reply.category}
                          </Badge>
                        )}
                        {reply.author.role && (
                          <Badge variant="default" className="text-[10px] px-1 py-0 h-4">
                            {reply.author.role}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-base text-foreground">{reply.content}</div>
                      
                      {/* Reply media - now inside the bubble */}
                      {reply.media && (
                        <div className="mt-2 rounded-lg overflow-hidden">
                          {reply.media.type === "image" ? (
                            <img
                              src={reply.media.url}
                              alt=""
                              className="w-full h-auto rounded-lg"
                            />
                          ) : reply.media.type === "video" ? (
                            <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                              <img
                                src={reply.media.thumbnail || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&fit=crop"}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-background/80 hover:bg-background/90"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle video playback here
                                    console.log("Play video:", reply.media?.url);
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          ) : reply.media.type === "link" && (
                            <a
                              href={reply.media.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full border rounded-lg overflow-hidden hover:bg-accent"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {reply.media.thumbnail && (
                                <img
                                  src={reply.media.thumbnail}
                                  alt=""
                                  className="w-full h-[120px] object-cover"
                                />
                              )}
                              <div className="p-2">
                                <div className="text-foreground font-medium text-sm">
                                  {reply.media.title || reply.media.url}
                                </div>
                                {reply.media.domain && (
                                  <div className="text-muted-foreground text-xs">
                                    {reply.media.domain}
                                  </div>
                                )}
                              </div>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Timestamp outside the bubble */}
                    <div className="text-xs text-muted-foreground ml-2 mt-1 mb-0.5 flex items-center gap-1.5 justify-between">
                      <div className="flex items-center gap-3">
                        <span>{reply.timestamp}</span>
                        <button 
                          ref={el => reactionButtonRefs.current[index] = el}
                          className={cn(
                            "flex items-center gap-1.5 text-xs transition-colors relative",
                            hasReacted
                              ? userReactionType ? REACTION_DATA[userReactionType].color : "text-primary font-medium" 
                              : "text-muted-foreground hover:text-foreground hover:underline"
                          )}
                          onClick={(e) => handleReaction(index, e)}
                          onContextMenu={(e) => handleLongPress(index, e)}
                          onMouseDown={(e) => {
                            const timer = setTimeout(() => {
                              if (e.button === 0) { // Only for left click
                                handleLongPress(index, e);
                              }
                            }, 500);
                            
                            const handleMouseUp = () => {
                              clearTimeout(timer);
                              window.removeEventListener('mouseup', handleMouseUp);
                            };
                            
                            window.addEventListener('mouseup', handleMouseUp);
                          }}
                          onTouchStart={(e) => {
                            const timer = setTimeout(() => handleLongPress(index, e), 500);
                            
                            const handleTouchEnd = () => {
                              clearTimeout(timer);
                              window.removeEventListener('touchend', handleTouchEnd);
                            };
                            
                            window.addEventListener('touchend', handleTouchEnd);
                          }}
                        >
                          {hasReacted && userReactionType ? REACTION_DATA[userReactionType].label : "Inspired"}
                          
                          {/* Reaction selection menu */}
                          {isLongPressed === index && (
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
                                            userReactions[index] === key && `${data.color} animate-pulse`
                                          )}
                                          onClick={(e) => handleReactionSelect(index, key as ReactionType, e)}
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
                          className="flex items-center text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onReply) {
                              // Use the onReply callback if provided
                              onReply(
                                `${reply.author.firstName} ${reply.author.lastName}`,
                                reply.content,
                                reply.author.avatar
                              );
                            } else if (typeof reply.index === 'number') {
                              // Fall back to the old behavior if onReply not provided
                              navigate(`/community/post/${reply.index}?replyTo=${reply.author.firstName.toLowerCase()}_${reply.author.lastName.toLowerCase()}`);
                            }
                          }}
                        >
                          Reply
                        </button>
                      </div>
                      
                      {/* Reaction counts display with drawer - now right aligned */}
                      {adjustedReactionCount > 0 && (
                        <Drawer 
                          open={activeReplyIndex === index}
                          onOpenChange={(open) => {
                            if (!open) setActiveReplyIndex(null);
                          }}
                        >
                          <DrawerTrigger asChild>
                            <div 
                              className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer mr-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenReactions(index, totalLikes);
                              }}
                            >
                              <div className="flex -space-x-1 mr-0.5">
                                {reactionsCount.inspired > 0 && (
                                  <div className="h-4 w-4 rounded-full flex items-center justify-center bg-blue-500 text-white border-[1.5px] border-background">
                                    <ThumbsUp className="h-2 w-2" />
                                  </div>
                                )}
                                {reactionsCount.love > 0 && (
                                  <div className="h-4 w-4 rounded-full flex items-center justify-center bg-red-500 text-white border-[1.5px] border-background">
                                    <Heart className="h-2 w-2" />
                                  </div>
                                )}
                              </div>
                              <span>{adjustedReactionCount}</span>
                            </div>
                          </DrawerTrigger>
                          <DrawerContent onClick={(e) => e.stopPropagation()}>
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Nested replies (if any) */}
              {reply.replies && reply.replies.length > 0 && (
                <>
                  {/* Only show first 3 replies by default or all if expanded */}
                  <PostReplies 
                    replies={expandedThreads[index] 
                      ? reply.replies 
                      : reply.replies.slice(0, DEFAULT_REPLIES_SHOWN)} 
                    parentAuthor={reply.author.firstName + " " + reply.author.lastName}
                    level={actualLevel + 1}
                    isLastReply={isLast}
                    onReply={onReply}
                  />
                  
                  {/* Show "Show more replies" button if there are more than 3 replies and thread is not expanded */}
                  {!expandedThreads[index] && reply.replies.length > DEFAULT_REPLIES_SHOWN && (
                    <div 
                      className="flex items-center gap-1 ml-8 mt-2 mb-3 cursor-pointer text-xs text-primary hover:text-primary/80"
                      style={{ marginLeft: `${leftIndent + 28}px` }}
                      onClick={() => toggleThreadExpansion(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      <span>Show {reply.replies.length - DEFAULT_REPLIES_SHOWN} more {reply.replies.length - DEFAULT_REPLIES_SHOWN === 1 ? 'reply' : 'replies'}</span>
                    </div>
                  )}
                  
                  {/* Show "Show less" button if thread is expanded */}
                  {expandedThreads[index] && reply.replies.length > DEFAULT_REPLIES_SHOWN && (
                    <div 
                      className="flex items-center gap-1 ml-8 mt-2 mb-3 cursor-pointer text-xs text-primary hover:text-primary/80"
                      style={{ marginLeft: `${leftIndent + 28}px` }}
                      onClick={() => toggleThreadExpansion(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transform rotate-180">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      <span>Show less</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}; 