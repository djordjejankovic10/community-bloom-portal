import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface FeedPostProps {
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
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
        className={`px-4 py-3 ${!isDetail ? "hover:bg-gray-50 cursor-pointer" : ""} transition-colors`}
        onClick={handleClick}
      >
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">{author.name}</span>
              {author.verified && (
                <span className="text-blue-500">
                  <svg
                    viewBox="0 0 22 22"
                    className="w-4 h-4 fill-current"
                  >
                    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                  </svg>
                </span>
              )}
              <span className="text-gray-500">@{author.handle}</span>
              <span className="text-gray-500">· {timestamp}</span>
            </div>
            <p className="mt-1 text-gray-900">{content}</p>
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
                    className="block border rounded-xl overflow-hidden hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={media.url}
                      alt=""
                      className="w-full h-auto"
                    />
                    <div className="p-3">
                      <div className="text-gray-900 font-medium">
                        {media.title}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {media.domain}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            )}
            <div className="flex justify-between mt-3 text-gray-500 w-full">
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