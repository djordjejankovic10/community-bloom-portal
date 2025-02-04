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

type PostMetrics = {
  likes: number;
  comments: number;
  shares: number;
};

type PostMedia = {
  type: "link" | "image" | "video";
  url: string;
  title?: string;
  domain?: string;
  thumbnail?: string;
};

type PostAuthor = {
  firstName: string;
  lastName: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  role?: "admin" | "founder";
};

type PostProps = {
  author: PostAuthor;
  content: string;
  timestamp: string;
  metrics: PostMetrics;
  media?: PostMedia;
  replies?: PostProps[];
  index?: number;
  pinned?: boolean;
  onUnpin?: () => void;
};

export const FeedPost = ({ author, content, timestamp, metrics, media, replies, index, pinned, onUnpin }: PostProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (!replies && typeof index === 'number') {
      navigate(`/community/post/${index}`);
    }
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
      "border-b",
      pinned && "bg-secondary/30 border-l-2 border-l-primary"
    )}>
      <div 
        className={cn(
          "p-4",
          !replies && "hover:bg-accent cursor-pointer",
          "transition-colors relative"
        )}
        onClick={handleClick}
      >
        {pinned && (
          <div className="flex items-center gap-1.5 mb-2 text-primary text-xs font-medium">
            <Pin className="h-3.5 w-3.5" />
            Pinned post
          </div>
        )}
        <div className="absolute top-4 right-4">
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
        </div>
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
            <p className="mt-0.5 text-base text-foreground">{content}</p>
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
                    <img
                      src={media.url}
                      alt=""
                      className="w-full h-auto"
                    />
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
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="h-5 w-5" />
                <span className="text-sm">{metrics.shares}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};