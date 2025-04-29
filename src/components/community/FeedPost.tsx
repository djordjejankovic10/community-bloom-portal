import { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Repeat2, Share, MoreVertical, Link2, Share2, FileText, AlertOctagon, Play, Pin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
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

export const FeedPost = ({ author, content, timestamp, metrics, media, replies, index, pinned, onUnpin, isEmbedded = false, originalPost }: PostProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isContentTruncated, setIsContentTruncated] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  
  // Check if content is longer than 10 lines
  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
      const height = contentRef.current.scrollHeight;
      const lines = Math.floor(height / (lineHeight || 20)); // fallback to 20px if lineHeight is not available
      
      setIsContentTruncated(lines > 10);
    }
  }, [content]);

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
      isEmbedded ? "" : "border-b",
      pinned && "bg-secondary/30 border-l-2 border-l-primary"
    )}>
      <div 
        className={cn(
          isEmbedded ? "p-2" : "p-4",
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
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5">
              <span className="font-medium text-foreground text-sm">
                {author.firstName} {author.lastName}
              </span>
              {author.role && (
                <Badge variant="default" className="text-[10px] px-1 py-0">
                  {author.role}
                </Badge>
              )}
              <span className="text-muted-foreground text-xs whitespace-nowrap">· {timestamp}</span>
            </div>
            <div>
              <p 
                ref={contentRef}
                className={`mt-0.5 text-base text-foreground py-[10px] my-[3px] ${isContentTruncated && !showFullContent ? 'line-clamp-10 max-h-[300px] overflow-hidden' : ''}`}
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
                    }
                  }}
                >
                  See more
                </Button>
              )}
            </div>
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
            
            {/* Embedded original post (if this is a repost) */}
            {originalPost && !isEmbedded && (
              <div className="mt-3 border rounded-lg overflow-hidden">
                <div className="p-3">
                  <div className="flex gap-3">
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
            
            {!isEmbedded && (
              <div className="flex items-center gap-6 mt-3">
                <button 
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{metrics.likes}</span>
                </button>
                <button 
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{metrics.comments}</span>
                </button>
                <button 
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof index === 'number') {
                      navigate(`/community/repost/${index}`);
                    }
                  }}
                >
                  <Repeat2 className="h-5 w-5" />
                </button>
                <button 
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share className="h-5 w-5" />
                  <span className="text-sm">{metrics.shares}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isEmbedded && <Separator />}
    </div>
  );
};