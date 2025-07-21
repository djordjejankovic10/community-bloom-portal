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
  ThumbsUp,
  Plus,
  Minus,
  Send,
  Pencil,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReplySheet } from "@/components/community/ReplySheet";
import { ReportSheet } from "@/features/reporting/ReportSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BottomSheet } from "@/components/messages/BottomSheet";
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
import { TitleBadge } from "@/components/ui/title-badge";

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

// Reaction data type
type ReactionDataType = {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  color: string;
  bgColor: string;
  label: string;
};

// Mock data for current user
const CURRENT_USER: ReactionUser = {
  name: "Current User",
  handle: "@currentuser",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces&auto=format",
  role: "admin", // Set to admin for testing moderator features
  reactionType: 'inspired'
};

// For testing purposes, let's make one of the posts authored by the current user
const isCurrentUserAuthor = (handle: string) => handle === CURRENT_USER.handle;

// Reaction icons and colors
const REACTION_DATA: Record<ReactionType, ReactionDataType> = {
  inspired: { 
    icon: <ThumbsUp className="h-4 w-4" />,
    activeIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>,
    color: "text-primary",
    bgColor: "bg-primary",
    label: "Inspired"
  },
  love: { 
    icon: <Heart className="h-4 w-4" />,
    activeIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>,
    color: "text-primary",
    bgColor: "bg-primary",
    label: "Love"
  },
  haha: {
    icon: <span className="text-sm">😂</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    label: "Haha"
  },
  wow: {
    icon: <span className="text-sm">😮</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500", 
    label: "Wow"
  },
  sad: {
    icon: <span className="text-sm">😢</span>,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    label: "Sad"
  },
  angry: {
    icon: <span className="text-sm">😡</span>,
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

// Add a new type for multi-image support
type MediaItem = {
  type: "image" | "video" | "link";
  url: string;
  thumbnail?: string;
  title?: string;
  domain?: string;
  aspectRatio?: number;
};

export const FeedPost = ({ 
  author, 
  content, 
  timestamp, 
  metrics: initialMetrics, 
  media, 
  mediaItems,
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
  // State for full-screen photo viewer
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
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
  
  // State for comment sheet (reusing ReplySheet for top-level comments)
  const [commentSheetOpen, setCommentSheetOpen] = useState(false);
  const [reportSheetOpen, setReportSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
  
  // State for multi-image carousel
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
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
  
  // Check if content is longer than the threshold (9 lines for text-only posts, 3 lines for posts with media)
  useEffect(() => {
    // Use a short timeout to ensure the content has been rendered and measured correctly
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const styles = window.getComputedStyle(contentRef.current);
        const lineHeight = parseInt(styles.lineHeight) || 20; // fallback to 20px if lineHeight is not available
        const height = contentRef.current.scrollHeight;
        const lines = Math.floor(height / lineHeight);
        
        // Different truncation rules based on whether post has media
        const hasMedia = !!media || !!(mediaItems && mediaItems.length > 0);
        const lineThreshold = hasMedia ? 3 : 9;
        
        // Only truncate if not in detail view and content exceeds the threshold
        const shouldTruncate = !isEmbedded && !isDetail && lines > lineThreshold;
        setIsContentTruncated(shouldTruncate);
        
        // For debugging
        console.log(`Post content: ${content.substring(0, 30)}...`);
        console.log(`Lines detected: ${lines}, Threshold: ${lineThreshold}, Should truncate: ${shouldTruncate}`);
        console.log(`Has media: ${hasMedia}, Content height: ${height}px, Line height: ${lineHeight}px`);
      }
    }, 100); // Short delay to ensure content is rendered
    
    return () => clearTimeout(timer);
  }, [content, isEmbedded, isDetail, media, mediaItems]);

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
    if (typeof index !== 'number') {
      console.warn("Post has no index, using fallback");
    }
    
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
    setReportSheetOpen(true);
  };

  const handleEditPost = () => {
    // This will be implemented in a separate user story
    toast({
      description: "Edit post functionality will be implemented soon."
    });
  };

  const handleDeletePost = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDeletePost = () => {
    // In a real app, this would call an API to delete the post
    toast({
      title: "Post deleted",
      description: "Your post has been permanently deleted."
    });
    setDeleteDialogOpen(false);
  };

  const handlePinUnpinPost = () => {
    // This will be implemented in a separate user story
    if (pinned && onUnpin) {
      onUnpin();
      toast({
        description: "Post unpinned successfully."
      });
    } else {
      toast({
        description: "Pin post functionality will be implemented soon."
      });
    }
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

  const handleZoom = (increase: boolean) => {
    setZoomLevel(prev => {
      const newZoom = increase ? prev * 1.2 : prev / 1.2;
      // Limit zoom range between 0.5 and 5
      return Math.min(Math.max(newZoom, 0.5), 5);
    });
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (zoomLevel <= 1) return; // Only allow dragging when zoomed in
    
    setIsDragging(true);
    
    // Get current position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setStartPosition({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    
    // Get current position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setPosition({
      x: clientX - startPosition.x,
      y: clientY - startPosition.y
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Close photo viewer on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPhotoViewerOpen) {
        setIsPhotoViewerOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isPhotoViewerOpen]);

  // Add event listener to detect horizontal scroll and update active image index
  useEffect(() => {
    if (!mediaItems || mediaItems.length <= 1) return;
    
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.offsetWidth;
      
      // Calculate the nearest slide index based on scroll position
      const newIndex = Math.round(scrollLeft / slideWidth);
      
      // Only update if actually changing to avoid unnecessary re-renders
      if (newIndex !== activeImageIndex && newIndex >= 0 && newIndex < mediaItems.length) {
        setActiveImageIndex(newIndex);
      }
    };
    
    const container = document.querySelector('.snap-x');
    if (container) {
      // Use scrollend event with fallback to scroll
      if ('onscrollend' in window) {
        container.addEventListener('scrollend', handleScroll);
      } else {
        // For browsers that don't support scrollend
        let scrollTimer: ReturnType<typeof setTimeout>;
        const throttledScrollHandler = (e: Event) => {
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => handleScroll(e), 100);
        };
        container.addEventListener('scroll', throttledScrollHandler);
        
        return () => {
          container.removeEventListener('scroll', throttledScrollHandler);
        };
      }
      
      return () => {
        if ('onscrollend' in window) {
          container.removeEventListener('scrollend', handleScroll);
        }
      };
    }
  }, [mediaItems, activeImageIndex]);

  return (
    <div className={cn(
      "w-full max-w-full block",
      isEmbedded ? "" : (!isReply && "border-b"),
      pinned && !isDetail && "bg-secondary/30 border-l-2 border-l-primary"
    )}>
      {/* Full-screen photo viewer - updated to work with both media and mediaItems */}
      {isPhotoViewerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setIsPhotoViewerOpen(false)}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="absolute top-4 right-4 z-10 flex gap-4">
            {/* Remove the Plus and Minus zoom buttons, keep only the close button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                setIsPhotoViewerOpen(false);
              }}
            >
              <span className="text-2xl font-bold">×</span>
            </Button>
          </div>
          
          <img
            src={mediaItems ? mediaItems[activeImageIndex].url : (media?.url || '')}
            alt=""
            className="max-h-screen max-w-screen object-contain"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
              cursor: zoomLevel > 1 ? 'grab' : 'default',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            // Add double-click to zoom instead of buttons
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (zoomLevel > 1) {
                // Reset zoom if already zoomed in
                setZoomLevel(1);
                setPosition({ x: 0, y: 0 });
              } else {
                // Zoom to 2x if not zoomed in
                setZoomLevel(2);
              }
            }}
          />
          
          {/* Add image navigation for multiple images */}
          {mediaItems && mediaItems.length > 1 && (
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-3">
              {mediaItems.map((_, idx) => (
                <button 
                  key={idx}
                  className={cn(
                    "w-3 h-3 rounded-full",
                    idx === activeImageIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                />
              ))}
            </div>
          )}
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center text-white text-sm">
            <div className="bg-black/50 px-3 py-1 rounded-full">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>
        </div>
      )}
      <div 
        className={cn(
          "w-full max-w-full", 
          isEmbedded ? "p-2" : (isReply ? "p-3 pb-1" : "pt-1 px-4 pb-0"),
          !isEmbedded && "hover:bg-accent/10 cursor-pointer",
          "transition-colors relative"
        )}
        onClick={isEmbedded ? undefined : handleClick}
        data-post-index={index}
      >
        {pinned && !isDetail && (
          <div className="flex items-center gap-1.5 mb-2 text-primary text-xs font-medium">
            <Pin className="h-3.5 w-3.5" />
            Pinned post
          </div>
        )}
        
        <div className="flex gap-3 mb-3 relative"> 
          <Avatar className={cn("flex-shrink-0 self-center", isReply ? "w-7 h-7" : "w-8 h-8")}>
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5">
                <span className={cn("font-medium text-foreground", isReply ? "text-xs" : "text-sm")}>
                  {author.firstName} {author.lastName}
                </span>
                <span className={cn("text-muted-foreground whitespace-nowrap", isReply ? "text-[10px]" : "text-xs")}>· {timestamp}</span>
              </div>
              
              {/* Post options menu */}
              {!isEmbedded && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="p-1 rounded-full hover:bg-accent/50 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {/* Pin/Unpin option for moderators/admins - first item */}
                    {(CURRENT_USER.role === "admin" || CURRENT_USER.role === "moderator") && (
                      <>
                        <DropdownMenuItem onClick={handlePinUnpinPost}>
                          <Pin className="mr-2 h-4 w-4" />
                          <span>{pinned ? "Unpin post" : "Pin post"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    
                    {/* Options for all users */}
                    <DropdownMenuItem onClick={handleCopyLink}>
                      <Link2 className="mr-2 h-4 w-4" />
                      <span>Copy link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyText}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Copy text</span>
                    </DropdownMenuItem>
                    
                    {/* Options for post authors */}
                    {(author.handle === CURRENT_USER.handle || author.firstName === "Jamie") && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleEditPost}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit post</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost();
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete post</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    {/* Additional options for moderators/admins */}
                    {(CURRENT_USER.role === "admin" || CURRENT_USER.role === "moderator") && author.handle !== CURRENT_USER.handle && author.firstName !== "Jamie" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost();
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete post</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    {/* Report option (only for non-authors and non-admins/moderators) */}
                    {author.handle !== CURRENT_USER.handle && author.firstName !== "Jamie" && 
                     CURRENT_USER.role !== "admin" && CURRENT_USER.role !== "moderator" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReport();
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <AlertOctagon className="mr-2 h-4 w-4" />
                          <span>Report post</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
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
              {author.titleBadge && (
                <TitleBadge
                  title={author.titleBadge.title}
                  tier={author.titleBadge.tier}
                  icon={author.titleBadge.icon}
                  size={isReply ? "sm" : "sm"}
                />
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
            isContentTruncated && !showFullContent ? 
              (media || mediaItems ? 'line-clamp-3 max-h-[4.5em] overflow-hidden' : 'line-clamp-9 max-h-[13.5em] overflow-hidden') : ''
          )}
        >
          {/* Display different captions based on reply status unless in detail view */}
          {!isReply && !isDetail && replies && replies.length > 0 ? (
            replies.some(reply => reply.replies && reply.replies.length > 0) ? 
              "This post has threaded replies with media" : 
              "This post has replies"
          ) : (
            content
          )}
        </p>
        
        {isContentTruncated && !showFullContent && !isEmbedded && (
          <div className="flex justify-end w-full">
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium mt-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullContent(true);
              }}
            >
              Show more
            </Button>
          </div>
        )}
        
        {/* MEDIA SECTION - Updated to handle both single and multiple media items */}
        {/* Single Media Item */}
        {media && !mediaItems && (
          <div className="mt-2 pb-1.5 rounded-lg overflow-hidden">
            {media.type === "image" ? (
              <div className="relative w-full">
                <img
                  src={media.url}
                  alt=""
                  className={cn(
                    "w-full rounded-lg cursor-pointer",
                    // For portrait images (aspect ratio < 1) or very tall images (< 0.5625)
                    // use a fixed height with object-cover to maintain consistency
                    media.aspectRatio && media.aspectRatio < 1
                      ? "h-[600px] object-cover object-center" 
                      : "max-h-[600px] object-contain"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Open the full-screen photo viewer
                    setIsPhotoViewerOpen(true);
                    // Reset zoom and position when opening
                    setZoomLevel(1);
                    setPosition({ x: 0, y: 0 });
                  }}
                />
              </div>
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
                className="flex border rounded-lg overflow-hidden hover:bg-accent"
                onClick={(e) => e.stopPropagation()}
              >
                {media.thumbnail && (
                  <div className="flex-shrink-0 w-[120px] h-[90px]">
                    <img
                      src={media.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                  <div className="text-foreground font-medium text-sm line-clamp-2 min-h-[2.5rem]">
                    {media.title}
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    {media.domain}
                  </div>
                </div>
              </a>
            )}
          </div>
        )}
        
        {/* Multiple Media Items - Carousel */}
        {mediaItems && mediaItems.length > 0 && (
          <div className="mt-2 rounded-lg overflow-hidden">
            {/* Horizontal scroll container */}
            <div 
              className="relative w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
              onScroll={(e) => {
                if (mediaItems.length <= 1) return;
                
                // This immediate scroll handler (as opposed to the useEffect one)
                // updates the dots visually while scrolling for better feedback
                const container = e.currentTarget;
                const scrollLeft = container.scrollLeft;
                const slideWidth = container.offsetWidth;
                const newIndex = Math.round(scrollLeft / slideWidth);
                
                if (newIndex !== activeImageIndex && newIndex >= 0 && newIndex < mediaItems.length) {
                  setActiveImageIndex(newIndex);
                }
              }}
            >
              {/* Container for all images placed side by side */}
              <div className="flex">
                {mediaItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 w-full min-w-full snap-center px-1 first:pl-0 last:pr-0 relative"
                    ref={idx === activeImageIndex ? (el) => {
                      // When active image index changes, scroll to that image
                      if (el) {
                        const container = el.parentElement?.parentElement;
                        if (container) {
                          container.scrollLeft = (el as HTMLElement).offsetLeft - 4; // Account for padding
                        }
                      }
                    } : undefined}
                  >
                    {/* Image counter for each image */}
                    {mediaItems.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-medium rounded-full px-2 py-0.5 z-10">
                        {idx + 1}/{mediaItems.length}
                      </div>
                    )}
                    <img
                      src={item.url}
                      alt=""
                      className={cn(
                        "w-full rounded-lg cursor-pointer",
                        // Check if any image in the carousel is at least 600px high (portrait)
                        // If so, use a fixed height of 600px for ALL images with object-cover
                        mediaItems.some(mediaItem => mediaItem.aspectRatio && mediaItem.aspectRatio < 1) 
                          ? "h-[600px] object-cover object-center" 
                          : "max-h-[600px] object-contain"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(idx);
                        setIsPhotoViewerOpen(true);
                        setZoomLevel(1);
                        setPosition({ x: 0, y: 0 });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pagination dots - below the image */}
            {mediaItems.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-2">
                {mediaItems.map((_, idx) => (
                  <button 
                    key={idx}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      idx === activeImageIndex 
                        ? "bg-primary" 
                        : "bg-muted hover:bg-primary/50"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(idx);
                      // Find the relevant slide and scroll to it
                      const container = document.querySelector('.snap-x');
                      const slides = container?.querySelectorAll('.snap-center');
                      if (container && slides && slides[idx]) {
                        container.scrollLeft = (slides[idx] as HTMLElement).offsetLeft;
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Display reaction counters */}
      {!isEmbedded && !isReply && (
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
                    <span className="text-lg">😂</span>
                  )}
                  {reactionsCount.wow > 0 && (
                    <span className="text-lg">😮</span>
                  )}
                  {reactionsCount.sad > 0 && (
                    <span className="text-lg">😢</span>
                  )}
                  {reactionsCount.angry > 0 && (
                    <span className="text-lg">😡</span>
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
                        {['haha', 'wow', 'sad', 'angry'].includes(reactionKey) ? (
                          <span className="text-sm">{REACTION_DATA[reactionKey].icon}</span>
                        ) : (
                          <div className={cn(
                            "h-4 w-4 rounded-full flex items-center justify-center text-white",
                            REACTION_DATA[reactionKey].bgColor
                          )}>
                            {REACTION_DATA[reactionKey].icon}
                          </div>
                        )}
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
                          {['haha', 'wow', 'sad', 'angry'].includes(user.reactionType) ? (
                            <div className="absolute -bottom-1 -right-1">
                              <span className="text-lg">{REACTION_DATA[user.reactionType].icon}</span>
                            </div>
                          ) : (
                            <div className={cn(
                              "absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-white border-2 border-background",
                              REACTION_DATA[user.reactionType].bgColor
                            )}>
                              {REACTION_DATA[user.reactionType].icon}
                            </div>
                          )}
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
            <span 
              className="cursor-pointer hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof index === 'number') {
                  if (isDetail) {
                    // In detail view, just scroll to comments section
                    document.querySelector('.comments-section')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // In feed view, navigate to post detail with comments
                    navigate(`/community/post/${index}?showComments=true`);
                  }
                }
              }}
            >
              {metrics.comments} comments
            </span>
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
                  <div className={cn("h-5 w-5 flex items-center justify-center", REACTION_DATA[userReaction].color)}>
                    {REACTION_DATA[userReaction].activeIcon || REACTION_DATA[userReaction].icon}
                  </div>
                  <span>{REACTION_DATA[userReaction].label}</span>
                </>
              ) : (
                <>
                  <div className="h-5 w-5 flex items-center justify-center">
                    <ThumbsUp className="h-4 w-4" />
                  </div>
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
                // Open the comment sheet instead of navigating
                setCommentSheetOpen(true);
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
      
      {/* Comment Sheet for top-level comments (reusing ReplySheet component) */}
      <ReplySheet
        open={commentSheetOpen}
        onClose={() => {
          setCommentSheetOpen(false);
        }}
        onSendReply={(text, media) => {
          // Handle sending a top-level comment
          // In a real app, this would call an API to add the comment
          toast({
            title: "Comment added",
            description: "Your comment has been added to the post."
          });
          
          // Close the comment sheet
          setCommentSheetOpen(false);
          
          // Navigate to the post detail view to see the comment
          if (typeof index === 'number') {
            navigate(`/community/post/${index}?showComments=true`);
          }
        }}
        replyingTo={{
          name: `${author.firstName} ${author.lastName}`,
          avatar: author.avatar,
          content: content
        }}
        isTopLevel={true}
      />
      
      {/* Report Sheet for reporting posts */}
      <ReportSheet
        isOpen={reportSheetOpen}
        onClose={() => setReportSheetOpen(false)}
      />
      
      {/* Delete Post Confirmation Bottom Sheet */}
      <BottomSheet isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Delete Post</h2>
            <p className="text-muted-foreground">
              This action is permanent and cannot be reversed - all content, comments, and reactions associated with this post will be permanently deleted.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={confirmDeletePost}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

// Example mixed orientation post to demonstrate the feature
export const MixedOrientationPostExample = () => {
  const mixedMediaPost: PostProps = {
    author: {
      firstName: "Jamie",
      lastName: "Rodriguez",
      handle: "@jamiefit",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces&auto=format",
      role: "founder"
    },
    content: "Here's a mix of portrait and landscape photos from my latest fitness photoshoot. Notice how the carousel maintains consistent sizing while respecting each image's aspect ratio.",
    timestamp: "2h ago",
    metrics: {
      likes: 42,
      comments: 7
    },
    mediaItems: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=1200&fit=crop&auto=format", // Portrait
        aspectRatio: 0.66 // 2:3 aspect ratio (portrait)
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1200&fit=crop&auto=format", // Portrait
        aspectRatio: 0.66 // 2:3 aspect ratio (portrait)
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=800&fit=crop&auto=format", // Landscape
        aspectRatio: 1.5 // 3:2 aspect ratio (landscape)
      }
    ],
    index: 999, // Example post index
    category: "yoga"
  };
  
  return <FeedPost {...mixedMediaPost} />;
};