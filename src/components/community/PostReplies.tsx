import { PostProps } from "@/types/post";
import { FeedPost } from "./FeedPost";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, MoreVertical, Heart, ChevronUp, Link2, FileText, AlertOctagon, Pencil, Trash2 } from "lucide-react";
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
import { BottomSheet } from "@/components/messages/BottomSheet";
import { useToast } from "@/hooks/use-toast";
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
import { TitleBadge } from "@/components/ui/title-badge";

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
  firstName?: string;
  lastName?: string;
};

// Define reaction data for icons and colors
const REACTION_DATA = {
  inspired: { 
    icon: <ThumbsUp className="h-4 w-4" />, 
    color: "text-primary",
    bgColor: "bg-primary",
    label: "Inspired"
  },
  love: { 
    icon: <Heart className="h-4 w-4" />, 
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

// Mock data for current user
const CURRENT_USER: ReactionUser = {
  name: "Current User",
  handle: "@currentuser",
  firstName: "Current", // Added firstName for matching
  lastName: "User",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces&auto=format",
  role: "admin", // Set to admin for testing moderator features
  reactionType: 'inspired'
};

// Helper function to check if the current user is the author of a comment
const isCurrentUserAuthor = (author: { handle?: string; firstName?: string }): boolean => {
  // For testing purposes, consider any of these authors as the current user
  return author.handle === CURRENT_USER.handle || 
         author.firstName === "Current" || 
         author.firstName === "David" || 
         author.firstName === "Sarah";
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
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState<number | null>(null);
  
  // Function to handle deleting a comment
  const handleDeleteComment = () => {
    // In a real app, this would call an API to delete the comment
    toast({
      title: "Comment deleted",
      description: "Your comment has been permanently deleted."
    });
    setDeleteDialogOpen(false);
    setReplyToDelete(null);
  };
  
  // Maximum nesting level to avoid excessive indentation
  // Original comment is level 0, max depth is 3 levels (original → reply → reply to reply → reply to reply to reply)
  const MAX_LEVEL = 3; // This allows for original comment (0) + 3 levels of replies (1,2,3)
  const actualLevel = Math.min(level, MAX_LEVEL);
  
  // Calculate indentation based on level - reduce indentation for deeper levels
  const leftIndent = actualLevel * 8; // Reduced from 16px to 8px per level
  
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
  
  // State for full-screen photo viewer
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [activePhotoUrl, setActivePhotoUrl] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
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
  
  // Determine if we should show a "View n replies" button
  const shouldShowViewRepliesButton = (reply: PostProps, index: number) => {
    if (!reply.replies || reply.replies.length <= 1) return false;
    return !expandedThreads[index]; // Only show if thread is not expanded
  };
  
  // Get the number of hidden replies 
  const getHiddenRepliesCount = (reply: PostProps) => {
    if (!reply.replies) return 0;
    return reply.replies.length - 1; // We show the first one by default
  };
  
  // Get replies to render based on expansion state
  const getRepliesToRender = (reply: PostProps, index: number) => {
    if (!reply.replies || reply.replies.length === 0) return [];
    
    // If thread is expanded, show all replies
    if (expandedThreads[index]) {
      return reply.replies;
    }
    
    // Otherwise, show only the first reply
    return reply.replies.slice(0, 1);
  };
  
  // Format timestamp to show only hours if > 1 hour, only days if > 24 hours
  const formatTimestamp = (timestamp: string): string => {
    // Handle "Just now" case
    if (timestamp === "Just now") return timestamp;
    
    // Remove "ago" suffix if present
    const cleanedTimestamp = timestamp.replace(" ago", "");
    
    // Check for days format (e.g., "2d")
    if (cleanedTimestamp.includes("d")) return cleanedTimestamp;
    
    // Parse hours and minutes
    const hasHours = cleanedTimestamp.includes("h");
    const hasMinutes = cleanedTimestamp.includes("m");
    
    if (hasHours) {
      // Extract just the hours part (e.g., "2h" from "2h 45m")
      const hoursPart = cleanedTimestamp.split(" ")[0];
      return hoursPart;
    }
    
    // Return original for minutes only or other formats
    return cleanedTimestamp;
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
  
  // Handle zoom in/out
  const handleZoom = (increase: boolean) => {
    setZoomLevel(prev => {
      const newZoom = increase ? prev * 1.2 : prev / 1.2;
      // Limit zoom range between 0.5 and 5
      return Math.min(Math.max(newZoom, 0.5), 5);
    });
  };

  // Handle mouse/touch events for dragging
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
  
  // Function to open photo viewer
  const openPhotoViewer = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoUrl(url);
    setIsPhotoViewerOpen(true);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };
  
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
      {/* Delete Comment Confirmation Bottom Sheet */}
      <BottomSheet isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Delete Comment</h2>
            <p className="text-muted-foreground">
              This action is permanent and cannot be reversed - all content and reactions associated with this comment will be permanently deleted.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={handleDeleteComment}
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
            src={activePhotoUrl}
            alt=""
            className="max-h-screen max-w-screen object-contain"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
              cursor: zoomLevel > 1 ? 'grab' : 'default',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            // Add double-click to zoom
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
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center text-white text-sm">
            <div className="bg-black/50 px-3 py-1 rounded-full">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>
        </div>
      )}
      
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
          <div
            key={index} // Reverted to map index to fix lint error
            className={cn(
              "my-3 relative",
              isLastReply && index === replies.length - 1 ? "mb-0" : ""
            )}
          >
            {/* All connector lines and corner pieces have been removed */}
            
            {/* Visual indicator for top-level replies removed */}
            
            {/* Reply post with indentation */}
            <div 
              className={cn(
                "relative max-w-full",
                index > 0 && level === 0 ? "mt-3" : (index > 0 ? "mt-4" : "")
              )}
              style={{ 
                marginLeft: `${leftIndent}px`
              }}
            >
              {/* Custom comment display for cleaner UI */}
              <div 
                className={cn(
                  "flex gap-2 pb-1.5 items-start",
                  level > 0 && "rounded-lg overflow-hidden"
                )}
              >
                <Avatar className="w-8 h-8 flex-shrink-0 self-start mt-1">
                  <AvatarImage src={reply.author.avatar} />
                  <AvatarFallback>{reply.author.firstName[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0 overflow-hidden">
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
                          {reply.author.role && (
                            <Badge variant="default" className="text-[10px] px-1 py-0 h-4">
                              {reply.author.role}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground whitespace-nowrap">· {formatTimestamp(reply.timestamp)}</span>
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
                            {/* Options for all users */}
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(window.location.href);
                                toast({ description: "Link copied to clipboard" });
                              }}
                            >
                              <Link2 className="mr-2 h-4 w-4" />
                              <span>Copy link</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(reply.content);
                                toast({ description: "Text copied to clipboard" });
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Copy text</span>
                            </DropdownMenuItem>
                            
                            {/* Options for comment authors */}
                            {isCurrentUserAuthor(reply.author) && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast({ description: "Edit comment functionality will be implemented soon." });
                                  }}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Edit comment</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setReplyToDelete(index);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete comment</span>
                                </DropdownMenuItem>
                              </>
                            )}
                            
                            {/* Additional options for moderators/admins */}
                            {(CURRENT_USER.role === "admin" || CURRENT_USER.role === "moderator") && 
                             !isCurrentUserAuthor(reply.author) && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setReplyToDelete(index);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete comment</span>
                                </DropdownMenuItem>
                              </>
                            )}
                            
                            {/* Report option (only for non-authors and non-admins/moderators) */}
                            {!isCurrentUserAuthor(reply.author) && 
                             CURRENT_USER.role !== "admin" && 
                             CURRENT_USER.role !== "moderator" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast({ description: "Report functionality will be implemented soon." });
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <AlertOctagon className="mr-2 h-4 w-4" />
                                  <span>Report comment</span>
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="text-base text-foreground">{reply.content}</div>
                      
                      {/* Reply media - now inside the bubble */}
                      {reply.media && (
                        <div className="mt-2 rounded-lg overflow-hidden">
                          {reply.media.type === "image" ? (
                            <img
                              src={reply.media.url}
                              alt=""
                              className="w-full h-[200px] object-cover rounded-lg cursor-pointer"
                              onClick={(e) => openPhotoViewer(reply.media.url, e)}
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
                      
                      {/* Reply mediaItems (carousel) */}
                      {reply.mediaItems && reply.mediaItems.length > 0 && (
                        <div className="mt-2 relative rounded-lg overflow-hidden">
                          <div className="flex overflow-x-auto snap-x scrollbar-hide px-1 -mx-1 space-x-2 max-w-[calc(100vw-60px)]">
                            {reply.mediaItems.map((item, idx) => (
                              <div 
                                key={idx}
                                className="flex-shrink-0 w-full max-w-[calc(100vw-80px)] h-[200px] snap-center px-1"
                              >
                                {item.type === "image" ? (
                                  <img
                                    src={item.url || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=600&fit=crop"}
                                    alt=""
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={(e) => openPhotoViewer(item.url || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=600&fit=crop", e)}
                                    onError={(e) => {
                                      // Fallback to a reliable image if the original one fails to load
                                      const target = e.target as HTMLImageElement;
                                      target.src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=600&fit=crop";
                                    }}
                                  />
                                ) : item.type === "video" && (
                                  <div className="relative w-full aspect-video bg-muted">
                                    <img
                                      src={item.thumbnail || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&fit=crop"}
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
                                          // Handle video playback
                                          console.log("Play video:", item.url);
                                        }}
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                          <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                        </svg>
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Carousel indicators */}
                          {reply.mediaItems.length > 1 && (
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                              {reply.mediaItems.map((_, idx) => (
                                <div 
                                  key={idx}
                                  className={`h-1.5 rounded-full ${idx === 0 ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                                ></div>
                              ))}
                            </div>
                          )}
                          
                          {/* Image counter */}
                          {reply.mediaItems.length > 1 && (
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                              1/{reply.mediaItems.length}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Title badge and category row - outside content like FeedPost */}
                    {(reply.category || reply.author.titleBadge) && (
                      <div className="flex items-center gap-1 ml-2 mt-1 mb-1 flex-wrap">
                        {reply.category && (
                          <Badge variant="outline" className="px-1 py-0 bg-accent/50 text-[10px] flex items-center">
                            {reply.category}
                          </Badge>
                        )}
                        {reply.author.titleBadge && (
                          <TitleBadge
                            title={reply.author.titleBadge.title}
                            tier={reply.author.titleBadge.tier}
                            icon={reply.author.titleBadge.icon}
                            size="sm"
                          />
                        )}
                      </div>
                    )}

                    {/* Timestamp outside the bubble */}
                    <div className="text-xs text-muted-foreground ml-2 mt-1 mb-0.5 flex items-center gap-1.5 justify-between">
                      <div className="flex items-center gap-3">
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Render replies if this reply has them and we haven't reached max nesting level */}
              {reply.replies && reply.replies.length > 0 && level < MAX_LEVEL && (
                <div className="pl-4 relative">
                  {/* Removed disconnected thread connection line */}
                  
                  {/* Render the replies that should be visible */}
                  <PostReplies
                    replies={getRepliesToRender(reply, index)}
                    parentAuthor={`${reply.author.firstName} ${reply.author.lastName}`}
                    level={level + 1}
                    isLastReply={!shouldShowViewRepliesButton(reply, index)}
                    onReply={onReply}
                  />
                  
                  {/* "View n replies" button */}
                  {shouldShowViewRepliesButton(reply, index) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleThreadExpansion(index)}
                      className="ml-2 text-primary hover:text-primary/80 hover:bg-transparent flex items-center gap-1 pl-2 h-8 mt-1"
                    >
                      View {getHiddenRepliesCount(reply)} {getHiddenRepliesCount(reply) === 1 ? 'reply' : 'replies'}
                    </Button>
                  )}
                  
                  {/* "Hide replies" button when expanded */}
                  {expandedThreads[index] && reply.replies && reply.replies.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleThreadExpansion(index)}
                      className="ml-2 text-primary hover:text-primary/80 hover:bg-transparent flex items-center gap-1 pl-2 h-8 mt-1"
                    >
                      <ChevronUp className="h-3.5 w-3.5 mr-1" />
                      Hide replies
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}; 