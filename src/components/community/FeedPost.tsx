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
        className={`px-4 py-3 ${!isDetail ? "hover:bg-accent cursor-pointer" : ""} transition-colors relative`}
        onClick={handleClick}
      >
        <div className="absolute top-3 right-4">
          <Drawer>
            <DrawerTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4 space-y-4">
                <div className="mx-auto h-1.5 w-12 rounded-full bg-muted mb-8" />
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors"
                >
                  <Link2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Copy link</span>
                </button>
                <button
                  onClick={handleShareLink}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors"
                >
                  <Share2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Share link</span>
                </button>
                <button
                  onClick={handleCopyText}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors"
                >
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Copy text</span>
                </button>
                <Separator className="my-2" />
                <button
                  onClick={handleReport}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors text-destructive"
                >
                  <AlertOctagon className="h-5 w-5" />
                  <span className="text-sm font-medium">Report</span>
                </button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
              <span className="font-medium text-foreground">
                {author.firstName} {author.lastName}
              </span>
              {author.verified && (
                <span className="text-blue-500">
                  <Check className="w-4 h-4" />
                </span>
              )}
              {author.role && (
                <Badge variant={author.role === "founder" ? "default" : "secondary"} className="text-xs">
                  {author.role}
                </Badge>
              )}
              <span className="text-muted-foreground whitespace-nowrap">· {timestamp}</span>
            </div>
            <p className="mt-1 text-foreground">{content}</p>
            {media && (
              <div className="mt-3 rounded-xl overflow-hidden">
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt=""
                    className="w-full h-auto rounded-xl"
                  />
                ) : (
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border rounded-xl overflow-hidden hover:bg-accent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={media.url}
                      alt=""
                      className="w-full h-auto"
                    />
                    <div className="p-3">
                      <div className="text-foreground font-medium">
                        {media.title}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {media.domain}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            )}
            <div className="flex justify-between mt-3 text-primary w-full">
              <button 
                className="flex items-center gap-2 hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart className="w-5 h-5" />
                <span>{metrics.likes}</span>
              </button>
              <button 
                className="flex items-center gap-2 hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{metrics.comments}</span>
              </button>
              <button 
                className="flex items-center gap-2 hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Repeat2 className="w-5 h-5" />
                <span>{metrics.reposts}</span>
              </button>
              <button 
                className="flex items-center gap-2 hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Share className="w-5 h-5" />
                <span>{metrics.shares}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};