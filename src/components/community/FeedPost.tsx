import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Repeat2, Share, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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

  const handleClick = () => {
    if (!isDetail && typeof index === 'number') {
      navigate(`/community/post/${index}`);
    }
  };

  return (
    <>
      <div 
        className={`px-4 py-3 ${!isDetail ? "hover:bg-accent cursor-pointer" : ""} transition-colors`}
        onClick={handleClick}
      >
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
            <div className="flex justify-between mt-3 text-muted-foreground w-full">
              <button 
                className="flex items-center gap-2 hover:text-red-500"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart className="w-5 h-5" />
                <span>{metrics.likes}</span>
              </button>
              <button 
                className="flex items-center gap-2 hover:text-blue-500"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{metrics.comments}</span>
              </button>
              <button 
                className="flex items-center gap-2 hover:text-green-500"
                onClick={(e) => e.stopPropagation()}
              >
                <Repeat2 className="w-5 h-5" />
                <span>{metrics.reposts}</span>
              </button>
              <button 
                className="flex items-center gap-2 hover:text-blue-500"
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