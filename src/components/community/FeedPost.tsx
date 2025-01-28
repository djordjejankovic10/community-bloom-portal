import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Repeat2, Share, Check, MoreVertical, Link2, Share2, FileText, AlertOctagon } from "lucide-react";
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

interface FeedPostProps {
  author: {
    firstName: string;
    lastName: string;
    handle: string;
    avatar: string;
    verified?: boolean;
    role?: "admin" | "founder";
  };
  content: string;
  timestamp: string;
  metrics: {
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
  };
  media?: {
    type: "image" | "link";
    url: string;
    title?: string;
    domain?: string;
  };
  isDetail?: boolean;
  index?: number;
}

export const FeedPost = ({
  author,
  content,
  timestamp,
  metrics,
  media,
  isDetail,
  index,
}: FeedPostProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (!isDetail && typeof index === 'number') {
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
    <>
      <div 
        className={`px-3 py-2 ${!isDetail ? "hover:bg-accent cursor-pointer" : ""} transition-colors relative`}
        onClick={handleClick}
      >
        <div className="absolute top-2 right-3">
          <Drawer>
            <DrawerTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-2 space-y-2">
                <div className="mx-auto h-1 w-12 rounded-full bg-muted mb-4" />
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
        <div className="flex gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5">
              <span className="font-medium text-foreground text-sm">
                {author.firstName} {author.lastName}
              </span>
              {author.verified && (
                <span className="text-blue-500">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
              {author.role && (
                <Badge variant="default" className="text-[10px] px-1 py-0">
                  {author.role}
                </Badge>
              )}
              <span className="text-muted-foreground text-xs whitespace-nowrap">· {timestamp}</span>
            </div>
            <p className="mt-0.5 text-sm text-foreground">{content}</p>
            {media && (
              <div className="mt-2 rounded-lg overflow-hidden">
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt=""
                    className="w-full h-auto rounded-lg"
                  />
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
            <div className="flex justify-between mt-2 text-primary w-full">
              <button 
                className="flex items-center gap-1 hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart className="w-4 h-4" />
                <span className="text-xs">{metrics.likes}</span>
              </button>
              <button 
                className="flex items-center gap-1 hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{metrics.comments}</span>
              </button>
              <button 
                className="flex items-center gap-1 hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Repeat2 className="w-4 h-4" />
                <span className="text-xs">{metrics.reposts}</span>
              </button>
              <button 
                className="flex items-center gap-1 hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="w-4 h-4" />
                <span className="text-xs">{metrics.shares}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};
