import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Pin, ThumbsUp, Heart, MessageCircle } from "lucide-react";
import { 
  Carousel,
  CarouselContent, 
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { FeedPost } from "./FeedPost";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PostProps } from "@/types/post";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

// Define reaction types
type ReactionType = 'inspired' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

// Reactions data
const REACTION_DATA: Record<ReactionType, { label: string, icon: React.ReactNode, bgColor: string, color: string }> = {
  inspired: { 
    label: "Inspired", 
    icon: <ThumbsUp className="h-3 w-3" />, 
    bgColor: "bg-blue-500",
    color: "text-blue-500"
  },
  love: { 
    label: "Love", 
    icon: <Heart className="h-3 w-3" />, 
    bgColor: "bg-red-500",
    color: "text-red-500"
  },
  haha: { 
    label: "Haha", 
    icon: <span className="text-xs">😂</span>, 
    bgColor: "bg-yellow-500",
    color: "text-yellow-500"
  },
  wow: { 
    label: "Wow", 
    icon: <span className="text-xs">😮</span>, 
    bgColor: "bg-yellow-500",
    color: "text-yellow-500"
  },
  sad: { 
    label: "Sad", 
    icon: <span className="text-xs">😢</span>, 
    bgColor: "bg-yellow-500", 
    color: "text-yellow-500"
  },
  angry: { 
    label: "Angry", 
    icon: <span className="text-xs">😡</span>, 
    bgColor: "bg-red-600",
    color: "text-red-600"
  }
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

// Reaction user type
type ReactionUser = {
  name: string;
  handle: string;
  avatar: string;
  role?: string;
  reactionType: ReactionType;
};

interface PinnedPostsProps {
  pinnedPosts: PostProps[];
  onUnpin?: (postIndex: number) => void;
}

export const PinnedPosts = ({ pinnedPosts, onUnpin }: PinnedPostsProps) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  // Track read state of pinned posts
  const [readPosts, setReadPosts] = useState<Record<string | number, boolean>>({});
  
  // Track content truncation state
  const [contentTruncated, setContentTruncated] = useState<Record<string | number, boolean>>({});
  const [expandedContent, setExpandedContent] = useState<Record<string | number, boolean>>({});
  const contentRefs = useRef<Record<string | number, HTMLParagraphElement | null>>({});

  // State for reaction drawer
  const [reactionsOpen, setReactionsOpen] = useState<Record<string | number, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<Record<string | number, ReactionType | 'all'>>({});
  
  // Generate reaction counts for each post
  const [reactionsCount, setReactionsCount] = useState<Record<string | number, ReactionsCount>>({});
  
  // Constants for layout calculations
  const CARD_HEIGHT = 360; // Total card height in px
  const HEADER_FOOTER_HEIGHT = 90; // Space for author info, pin indicator, metrics footer
  const MEDIA_MAX_HEIGHT = 120; // Maximum height for media content
  
  // Load user preference and read state from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("pinnedPostsExpanded");
    if (savedPreference !== null) {
      setIsExpanded(savedPreference === "true");
    }
    
    const savedReadState = localStorage.getItem("pinnedPostsReadState");
    if (savedReadState !== null) {
      setReadPosts(JSON.parse(savedReadState));
    }

    // Initialize reaction counts and filters for each post
    const initialReactionsCount: Record<string | number, ReactionsCount> = {};
    const initialActiveFilter: Record<string | number, ReactionType | 'all'> = {};
    const initialReactionsOpen: Record<string | number, boolean> = {};

    pinnedPosts.forEach(post => {
      const postIndex = post.index ?? 0;
      initialReactionsCount[postIndex] = {
        inspired: Math.floor(post.metrics.likes * 0.7),
        love: Math.floor(post.metrics.likes * 0.2),
        haha: Math.floor(post.metrics.likes * 0.05),
        wow: Math.floor(post.metrics.likes * 0.03),
        sad: Math.floor(post.metrics.likes * 0.02),
        angry: 0
      };
      initialActiveFilter[postIndex] = 'all';
      initialReactionsOpen[postIndex] = false;
    });

    setReactionsCount(initialReactionsCount);
    setActiveFilter(initialActiveFilter);
    setReactionsOpen(initialReactionsOpen);
  }, [pinnedPosts]);
  
  // Save user preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("pinnedPostsExpanded", isExpanded.toString());
  }, [isExpanded]);
  
  // Save read state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("pinnedPostsReadState", JSON.stringify(readPosts));
  }, [readPosts]);
  
  // Initialize and setup carousel API
  useEffect(() => {
    if (!api) return;

    // Get the total number of slides
    setCount(api.scrollSnapList().length);
    
    // Initialize to the first slide (0)
    api.scrollTo(0);
    setCurrent(0);
    
    // Setup the change handler
    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrent(selectedIndex);
      
      // Mark currently viewed post as read
      if (selectedIndex >= 0 && selectedIndex < pinnedPosts.length) {
        const postIndex = pinnedPosts[selectedIndex].index;
        if (postIndex !== undefined && !readPosts[postIndex]) {
          setReadPosts(prev => ({
            ...prev,
            [postIndex]: true
          }));
        }
      }
    };
    
    // Register the event listener
    api.on("select", onSelect);
    
    // Make sure to run once at start for proper initialization
    onSelect();
    
    // Cleanup
    return () => {
      api.off("select", onSelect);
    };
  }, [api, pinnedPosts, readPosts]);
  
  // Check if content needs truncation
  useEffect(() => {
    if (!isExpanded) return;
    
    // Use a short timer to ensure elements are rendered properly
    const timer = setTimeout(() => {
      const newTruncatedState: Record<string | number, boolean> = {};
      
      // Check each post's content height
      pinnedPosts.forEach(post => {
        const index = post.index ?? 0;
        const contentElement = contentRefs.current[index];
        
        if (contentElement) {
          // Calculate available height based on whether post has media
          const hasMedia = !!post.media || !!(post.mediaItems && post.mediaItems.length > 0);
          
          // Available height = card height - (header/footer + media height if present)
          const availableHeight = CARD_HEIGHT - HEADER_FOOTER_HEIGHT - (hasMedia ? MEDIA_MAX_HEIGHT : 0);
          const isTruncated = contentElement.scrollHeight > availableHeight;
          newTruncatedState[index] = isTruncated;
        }
      });
      
      setContentTruncated(newTruncatedState);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isExpanded, pinnedPosts]);
  
  // Generate mock reactors for a post
  const generateReactors = (postIndex: number | undefined): ReactionUser[] => {
    if (postIndex === undefined) return [];
    
    const postReactionsCount = reactionsCount[postIndex];
    if (!postReactionsCount) return [];
    
    const totalLikes = Object.values(postReactionsCount).reduce((sum, count) => sum + count, 0);
    const mockReactors: ReactionUser[] = [];
    
    const firstNames = ["Alex", "Jamie", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Quinn"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
    
    // Generate reactors based on reaction distribution
    let reactorCount = 0;
    Object.entries(postReactionsCount).forEach(([reaction, count]) => {
      const reactionType = reaction as ReactionType;
      for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        mockReactors.push({
          name: `${firstName} ${lastName}`,
          handle: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
          avatar: `https://source.unsplash.com/random/100x100?face&${reactorCount}`,
          role: Math.random() > 0.8 ? (Math.random() > 0.5 ? "Admin" : "Moderator") : undefined,
          reactionType
        });
        reactorCount++;
        if (reactorCount >= 50) break; // Limit to 50 mock reactors
      }
      if (reactorCount >= 50) return mockReactors;
    });
    
    return mockReactors;
  };
  
  // Get filtered reactors based on active filter
  const getFilteredReactors = (postIndex: number | undefined): ReactionUser[] => {
    if (postIndex === undefined) return [];
    
    const filter = activeFilter[postIndex] || 'all';
    const reactors = generateReactors(postIndex);
    
    if (filter === 'all') return reactors;
    
    return reactors.filter(reactor => reactor.reactionType === filter);
  };
  
  // Handle clicking on a pinned post
  const handlePostClick = (postIndex: number | undefined) => {
    if (postIndex === undefined) return;
    
    // Mark post as read
    if (!readPosts[postIndex]) {
      setReadPosts(prev => ({
        ...prev,
        [postIndex]: true
      }));
    }
    
    // Navigate to post detail
    navigate(`/community/post/${postIndex}`);
  };
  
  // Toggle content expansion in a post
  const toggleContentExpansion = (e: React.MouseEvent, postIndex: number | undefined) => {
    e.stopPropagation(); // Prevent navigating to post detail
    
    if (postIndex !== undefined) {
      setExpandedContent(prev => ({
        ...prev,
        [postIndex]: !prev[postIndex]
      }));
    }
  };
  
  // Toggle reactions drawer for a post
  const toggleReactionsDrawer = (e: React.MouseEvent, postIndex: number | undefined) => {
    e.stopPropagation(); // Prevent navigating to post detail
    
    if (postIndex !== undefined) {
      setReactionsOpen(prev => ({
        ...prev,
        [postIndex]: !prev[postIndex]
      }));
    }
  };
  
  // Set active filter for reactions in a post
  const setPostActiveFilter = (postIndex: number | undefined, filter: ReactionType | 'all') => {
    if (postIndex !== undefined) {
      setActiveFilter(prev => ({
        ...prev,
        [postIndex]: filter
      }));
    }
  };
  
  // Set content ref for a post
  const setContentRef = (index: number | undefined, el: HTMLParagraphElement | null) => {
    if (index !== undefined) {
      contentRefs.current[index] = el;
    }
  };
  
  // Get max content height based on post type
  const getMaxContentHeight = (post: PostProps, isExpanded: boolean): string => {
    if (isExpanded) return "none";
    
    const hasMedia = !!post.media || !!(post.mediaItems && post.mediaItems.length > 0);
    const availableHeight = CARD_HEIGHT - HEADER_FOOTER_HEIGHT - (hasMedia ? MEDIA_MAX_HEIGHT : 0);
    
    return `${availableHeight - 40}px`; // Subtract extra for safety margin
  };
  
  // If there are no pinned posts, don't render anything
  if (!pinnedPosts || pinnedPosts.length === 0) {
    return null;
  }
  
  // Handle the case where there's only one pinned post
  if (pinnedPosts.length === 1) {
    const isRead = readPosts[pinnedPosts[0].index || 0];
    
    return (
      <div className="mb-4 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
            <Pin className="h-4 w-4" />
            Pinned Post
          </div>
        </div>
        <div 
          className={cn(
            "border rounded-lg overflow-hidden",
            !isRead && "border-primary border-2" // Highlighted border for unread posts
          )}
          onClick={() => handlePostClick(pinnedPosts[0].index)}
        >
          <FeedPost 
            {...pinnedPosts[0]} 
            isEmbedded 
            onUnpin={onUnpin ? () => onUnpin(pinnedPosts[0].index || 0) : undefined} 
          />
        </div>
      </div>
    );
  }

  // For multiple pinned posts, render a carousel
  return (
    <div className="mb-4">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
          <Pin className="h-4 w-4" />
          Pinned Posts
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {isExpanded && (
        <div>
          <Carousel 
            className="w-full overflow-x-auto cursor-grab active:cursor-grabbing"
            opts={{
              align: "start",
              startIndex: 0,
              loop: false,
              skipSnaps: false,
              dragFree: false,
              containScroll: "trimSnaps"
            }}
            setApi={setApi}
          >
            <div className="relative px-4">
              {/* Horizontal scrolling indicator - left */}
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-16 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none" />
              
              {/* Horizontal scrolling indicator - right */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-16 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none" />
              
              <CarouselContent>
                {pinnedPosts.map((post, slideIndex) => {
                  const postIndex = post.index || 0;
                  const isRead = readPosts[postIndex];
                  const isTruncated = contentTruncated[postIndex];
                  const isContentExpanded = expandedContent[postIndex];
                  const hasMedia = !!post.media || !!(post.mediaItems && post.mediaItems.length > 0);
                  const postReactionsCount = reactionsCount[postIndex] || {
                    inspired: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0
                  };
                  const totalReactions = Object.values(postReactionsCount).reduce((sum, count) => sum + count, 0);
                  
                  return (
                    <CarouselItem 
                      key={postIndex} 
                      className="basis-[284px] sm:basis-[300px] pl-1 pr-3 transition-all hover:scale-[1.02]"
                      data-slide-index={slideIndex}
                    >
                      <div 
                        className={cn(
                          "h-[360px] overflow-hidden rounded-lg border",
                          "flex flex-col",
                          !isRead && "border-primary border-2", // Highlighted border for unread posts
                          "cursor-pointer shadow-sm hover:shadow-md transition-shadow" // Add shadow effect on hover
                        )}
                        onClick={() => handlePostClick(post.index)}
                      >
                        <div className="p-3 flex-1 overflow-hidden flex flex-col">
                          {/* Author info */}
                          <div className="flex items-center mb-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                              <img 
                                src={post.author.avatar} 
                                alt={`${post.author.firstName} ${post.author.lastName}`}
                                className="h-full w-full object-cover" 
                              />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {post.author.firstName} {post.author.lastName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {post.timestamp}
                              </div>
                            </div>
                          </div>
                          
                          {/* Post content */}
                          <div 
                            className={cn(
                              "relative min-h-0",
                              isContentExpanded ? "flex-1" : hasMedia ? "flex-initial" : "flex-1"
                            )}
                          >
                            <p 
                              ref={(el) => setContentRef(post.index, el)}
                              className={cn(
                                "text-sm mb-2",
                                !isContentExpanded && isTruncated && "overflow-hidden",
                                !isContentExpanded && isTruncated && `max-h-[${getMaxContentHeight(post, false)}]`
                              )}
                              style={
                                !isContentExpanded && isTruncated 
                                  ? { maxHeight: getMaxContentHeight(post, false) } 
                                  : undefined
                              }
                            >
                              {post.content}
                            </p>
                            
                            {isTruncated && !isContentExpanded && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-8 pointer-events-none" />
                            )}
                            
                            {isTruncated && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary text-xs font-medium absolute bottom-0 right-0"
                                onClick={(e) => toggleContentExpansion(e, post.index)}
                              >
                                {isContentExpanded ? "Show less" : "Show more"}
                              </Button>
                            )}
                          </div>
                          
                          {/* Post media (if available) - only show when content is not expanded */}
                          {!isContentExpanded && hasMedia && (
                            <>
                              {post.media && (
                                <div className={`h-${MEDIA_MAX_HEIGHT / 8} overflow-hidden rounded-md mb-2`}
                                     style={{ maxHeight: `${MEDIA_MAX_HEIGHT}px` }}>
                                  <img 
                                    src={post.media.url} 
                                    alt=""
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                              )}
                              
                              {/* Show first image from mediaItems (if available) */}
                              {post.mediaItems && post.mediaItems.length > 0 && (
                                <div className={`h-${MEDIA_MAX_HEIGHT / 8} overflow-hidden rounded-md mb-2`}
                                     style={{ maxHeight: `${MEDIA_MAX_HEIGHT}px` }}>
                                  <img 
                                    src={post.mediaItems[0].url} 
                                    alt=""
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* Post metrics - Prevent propagation on drawer trigger clicks */}
                          <div className="flex items-center justify-between w-full max-w-full mt-auto text-muted-foreground text-xs">
                            <Drawer 
                              open={reactionsOpen[postIndex] || false} 
                              onOpenChange={(open) => setReactionsOpen(prev => ({ ...prev, [postIndex]: open }))}
                            >
                              <DrawerTrigger asChild>
                                {totalReactions > 0 && (
                                  <div 
                                    className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer" 
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent navigating to post detail when clicking reactions
                                      toggleReactionsDrawer(e, post.index);
                                    }}
                                  >
                                    <div className="flex -space-x-1">
                                      {postReactionsCount.inspired > 0 && (
                                        <div className="h-4 w-4 rounded-full flex items-center justify-center bg-blue-500 text-white border-[1.5px] border-background">
                                          <ThumbsUp className="h-2 w-2" />
                                        </div>
                                      )}
                                      {postReactionsCount.love > 0 && (
                                        <div className="h-4 w-4 rounded-full flex items-center justify-center bg-red-500 text-white border-[1.5px] border-background">
                                          <Heart className="h-2 w-2" />
                                        </div>
                                      )}
                                      {postReactionsCount.haha > 0 && (
                                        <div className="h-4 w-4 rounded-full flex items-center justify-center bg-yellow-500 text-white border-[1.5px] border-background">
                                          <span className="text-[8px]">😂</span>
                                        </div>
                                      )}
                                    </div>
                                    <span>{totalReactions}</span>
                                  </div>
                                )}
                              </DrawerTrigger>
                              <DrawerContent className="min-h-[50vh]" onClick={(e) => e.stopPropagation()}>
                                <div className="p-4 h-full min-h-[50vh] flex flex-col">
                                  <div className="flex mb-4 border-b overflow-x-auto">
                                    <button 
                                      onClick={() => setPostActiveFilter(post.index, 'all')}
                                      className={cn(
                                        "px-4 py-2 text-sm font-medium",
                                        activeFilter[post.index] === 'all' 
                                          ? "border-b-2 border-primary text-primary" 
                                          : "text-muted-foreground"
                                      )}
                                    >
                                      All {totalReactions}
                                    </button>
                                    
                                    {Object.entries(postReactionsCount).map(([reaction, count]) => {
                                      if (count === 0) return null;
                                      const reactionKey = reaction as ReactionType;
                                      return (
                                        <button 
                                          key={reaction}
                                          onClick={() => setPostActiveFilter(post.index, reactionKey)}
                                          className={cn(
                                            "px-4 py-2 text-sm font-medium flex items-center gap-1",
                                            activeFilter[post.index] === reactionKey 
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
                                    {getFilteredReactors(post.index).map((user, i) => (
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
                                  </div>
                                </div>
                              </DrawerContent>
                            </Drawer>
                            
                            {post.metrics.comments > 0 && (
                              <div 
                                className="flex items-center gap-1.5 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent default navigation
                                  // Navigate to post with comments tab active
                                  navigate(`/community/post/${post.index}?showComments=true`);
                                }}
                              >
                                <MessageCircle className="h-3.5 w-3.5" />
                                <span>{post.metrics.comments} comments</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </div>
            
            {/* Pagination dots */}
            <div className="flex justify-center gap-2 py-3">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "transition-all focus:outline-none",
                    current === index 
                      ? "h-2 w-5 bg-primary rounded-full" 
                      : "h-2 w-2 bg-primary/30 rounded-full hover:bg-primary/50"
                  )}
                  onClick={() => {
                    api?.scrollTo(index);
                    setCurrent(index); // Update immediately for better feedback
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
}; 