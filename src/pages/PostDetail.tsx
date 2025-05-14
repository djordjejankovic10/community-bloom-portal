import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FeedPost } from "@/components/community/FeedPost";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Image, 
  Plus, 
  Send, 
  ArrowRight, 
  X, 
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Loader2,
  Camera,
  FileImage,
  Video
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_POSTS } from "./Community";
import { PostReplies } from "../components/community/PostReplies";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PostProps } from "@/types/post";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const COMMENTS_PER_PAGE = 5;

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Find the post by its index property
  const post = MOCK_POSTS.find(p => p.index === Number(postId));
  
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [displayedComments, setDisplayedComments] = useState<PostProps[]>([]);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(COMMENTS_PER_PAGE);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ type: string; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Auto-resize input as content is added
  useEffect(() => {
    if (commentInputRef.current) {
      // Reset height to shrink on delete
      commentInputRef.current.style.height = 'auto';
      
      // Set the height based on the scroll height
      const scrollHeight = commentInputRef.current.scrollHeight;
      // Limit height to 5 lines (approximately 115px)
      const maxHeight = 115;
      commentInputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [replyText]);
  
  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any object URLs when the component unmounts
      if (selectedMedia && selectedMedia.url) {
        URL.revokeObjectURL(selectedMedia.url);
      }
    };
  }, []);
  
  // Count total replies including nested ones
  const countAllReplies = useCallback((replies = []) => {
    let count = replies.length;
    for (const reply of replies) {
      if (reply.replies && reply.replies.length > 0) {
        count += countAllReplies(reply.replies);
      }
    }
    return count;
  }, []);

  const totalReplies = post?.replies ? countAllReplies(post.replies) : 0;
  
  // Load more comments when scrolling to the bottom
  const loadMoreComments = useCallback(() => {
    if (!post?.replies || visibleCommentsCount >= post.replies.length) return;
    
    setIsLoading(true);
    
    // Simulate network request delay
    setTimeout(() => {
      setVisibleCommentsCount(prev => Math.min(prev + COMMENTS_PER_PAGE, post.replies.length));
      setIsLoading(false);
    }, 800);
  }, [post?.replies, visibleCommentsCount]);
  
  // Update displayed comments when visibleCommentsCount changes
  useEffect(() => {
    if (!post?.replies) return;
    setDisplayedComments(post.replies.slice(0, visibleCommentsCount));
  }, [post?.replies, visibleCommentsCount]);
  
  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (!commentsEndRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && post?.replies && visibleCommentsCount < post.replies.length) {
          loadMoreComments();
        }
      }, 
      { threshold: 0.5 }
    );
    
    observer.observe(commentsEndRef.current);
    
    return () => {
      if (commentsEndRef.current) {
        observer.unobserve(commentsEndRef.current);
      }
    };
  }, [loadMoreComments, isLoading, post?.replies, visibleCommentsCount]);
  
  // Check URL for replyTo parameter and scrollToComments
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const replyTo = searchParams.get("replyTo");
    const showComments = searchParams.get("showComments");
    
    if (replyTo) {
      setReplyingTo(replyTo.replace("_", " "));
      
      // Focus the comment input field with a slight delay
      setTimeout(() => {
        if (commentInputRef.current) {
          commentInputRef.current.focus();
        }
      }, 300);
    }
    
    if (showComments) {
      // Load more comments initially
      setVisibleCommentsCount(COMMENTS_PER_PAGE);
    }
  }, [location.search]);

  if (!post) return <div>Post not found</div>;

  const clearReplyingTo = () => {
    setReplyingTo(null);
    // Remove replyTo from URL without full page reload
    const url = new URL(window.location.href);
    url.searchParams.delete("replyTo");
    window.history.replaceState({}, "", url);
  };

  const handleReply = () => {
    // In a real app, this would send the reply to an API
    // and update the thread
    console.log("Replying to:", replyingTo || post.author.firstName);
    console.log("Reply text:", replyText);
    console.log("Selected media:", selectedMedia);
    
    // Clear input and media
    setReplyText("");
    setSelectedMedia(null);
    
    // Clear replying to state only if we're replying to a specific comment
    if (replyingTo) {
      clearReplyingTo();
    }
  };

  const handleMediaSelect = (type: string) => {
    // For photo gallery, open the file picker
    if (type === "photo") {
      // Remove capture attribute if present
      if (fileInputRef.current) {
        fileInputRef.current.removeAttribute('capture');
        fileInputRef.current.setAttribute('accept', 'image/*');
      }
      fileInputRef.current?.click();
    } else if (type === "camera") {
      // Set capture attribute to use the camera directly
      if (fileInputRef.current) {
        fileInputRef.current.setAttribute('capture', 'environment');
        fileInputRef.current.setAttribute('accept', 'image/*');
      }
      fileInputRef.current?.click();
    } else if (type === "video") {
      // Configure file input for video
      if (fileInputRef.current) {
        fileInputRef.current.removeAttribute('capture');
        fileInputRef.current.setAttribute('accept', 'video/*');
      }
      fileInputRef.current?.click();
    }
    
    setIsMediaPickerOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    // Check if it's a valid file type
    if (!isImage && !isVideo) {
      alert('Please select an image or video file');
      return;
    }
    
    // Check file size (max 10MB for images, 50MB for videos)
    const maxSize = isImage ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size should not exceed ${isImage ? '10MB' : '50MB'}`);
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay (would be a real upload in production)
    setTimeout(() => {
      // Create a URL for the selected file
      const fileUrl = URL.createObjectURL(file);
      
      setSelectedMedia({
        type: isImage ? "image" : "video",
        url: fileUrl
      });
      
      setIsUploading(false);
      
      // Reset the file input for future selections
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 800); // Simulate network delay
  };

  const removeSelectedMedia = () => {
    // Clean up the object URL to avoid memory leaks
    if (selectedMedia && selectedMedia.url) {
      URL.revokeObjectURL(selectedMedia.url);
    }
    setSelectedMedia(null);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => window.history.back()} className="text-xl">
            ←
          </button>
          <h1 className="font-bold text-xl">{post.author.firstName}'s post</h1>
        </div>
        <Separator />
      </div>

      {/* Original post content (fully expanded) */}
      <FeedPost {...post} isDetail />

      {/* Comments section */}
      <div className="px-4 py-2 pb-24">
        {totalReplies > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">
                {totalReplies > 1 ? `${totalReplies} Comments` : `${totalReplies} Comment`}
              </h2>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span>Oldest first</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => {
                    // In a real app, this would toggle sort order
                    console.log("Toggle sort order");
                  }}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Comments with infinite scroll */}
            <div className="rounded-lg overflow-hidden">
              <PostReplies 
                replies={displayedComments} 
                parentAuthor={post.author.firstName + " " + post.author.lastName} 
              />
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}
              
              {/* Invisible element for intersection observer */}
              <div 
                ref={commentsEndRef} 
                className="h-4 w-full"
              />
              
              {/* Show message when all comments are loaded */}
              {!isLoading && displayedComments.length === post.replies.length && displayedComments.length > COMMENTS_PER_PAGE && (
                <div className="text-center text-sm text-muted-foreground py-2">
                  All comments loaded
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-1">No comments yet</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Be the first to share your thoughts on this post.
            </p>
          </div>
        )}
      </div>

      {/* Fixed comment input at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 pb-safe-area-inset-bottom">
        <div className="flex flex-col gap-2 max-w-2xl mx-auto">
          {/* Hidden file input for uploading images */}
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
          
          {replyingTo && (
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <Badge variant="outline" className="mr-2 px-1 py-0 gap-1 h-5">
                <span>Replying to {replyingTo}</span>
                <button 
                  onClick={clearReplyingTo}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          )}
          
          {/* Selected media preview */}
          {selectedMedia && (
            <div className="relative rounded-lg overflow-hidden mb-2 border">
              {selectedMedia.type === "image" ? (
                <img src={selectedMedia.url} alt="Selected media" className="w-full h-auto max-h-40 object-cover" />
              ) : (
                <div className="relative bg-muted w-full h-40">
                  <video 
                    src={selectedMedia.url} 
                    className="w-full h-full object-contain" 
                    controls
                    preload="metadata"
                  />
                </div>
              )}
              <button 
                onClick={removeSelectedMedia}
                className="absolute top-2 right-2 bg-background/80 rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          
          {/* Loading indicator for media uploads */}
          {isUploading && (
            <div className="flex items-center justify-center py-3 mb-2 rounded-lg border border-dashed">
              <Loader2 className="h-5 w-5 animate-spin mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Uploading media...</span>
            </div>
          )}
          
          <div className="flex items-start gap-2">
            <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <Textarea
                ref={commentInputRef}
                placeholder="Write a comment..."
                className="min-h-[40px] pr-20 py-2 pl-4 rounded-full resize-none overflow-y-auto"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && replyText.trim()) {
                    e.preventDefault();
                    handleReply();
                  }
                }}
                rows={1}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Popover open={isMediaPickerOpen} onOpenChange={setIsMediaPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                    >
                      <Image className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="ghost" 
                        className="flex items-center justify-start"
                        onClick={() => handleMediaSelect("photo")}
                      >
                        <FileImage className="w-4 h-4 mr-2" />
                        <span>Photo Gallery</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex items-center justify-start"
                        onClick={() => handleMediaSelect("camera")}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        <span>Take Photo</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex items-center justify-start"
                        onClick={() => handleMediaSelect("video")}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        <span>Video</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-8 w-8 rounded-full", 
                    replyText.trim() && "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                  disabled={!replyText.trim() && !selectedMedia}
                  onClick={handleReply}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;