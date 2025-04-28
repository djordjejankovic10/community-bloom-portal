import { Message } from "@/types/message";
import { CURRENT_USER, formatMessageTime } from "@/data/mockMessages";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { useState } from "react";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isCurrentUser = message.senderId === CURRENT_USER.id;
  const time = formatMessageTime(message.timestamp);
  
  return (
    <div className={cn(
      "flex w-full mb-2",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-3 py-2 overflow-hidden",
        isCurrentUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-muted rounded-tl-none"
      )}>
        {message.type === 'text' && (
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        )}
        
        {message.type === 'image' && message.media && (
          <div className="space-y-2">
            {message.content && (
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            )}
            <div 
              className={cn(
                "overflow-hidden rounded-lg relative",
                !imageLoaded && "bg-muted animate-pulse h-36"
              )}
            >
              <img
                src={message.media.url}
                alt="Shared image"
                className={cn(
                  "h-auto max-h-60 w-full object-cover rounded-lg transition-opacity",
                  !imageLoaded && "opacity-0",
                  imageLoaded && "opacity-100"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        )}
        
        {message.type === 'video' && message.media && (
          <div className="space-y-2">
            {message.content && (
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            )}
            <div className="relative overflow-hidden rounded-lg bg-muted/50">
              <img
                src={message.media.thumbnailUrl || message.media.url}
                alt="Video thumbnail"
                className="h-auto max-h-60 w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="h-10 w-10 rounded-full bg-background/80 flex items-center justify-center">
                  <Play className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className={cn(
          "text-xs mt-1 flex justify-end",
          isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {time}
        </div>
      </div>
    </div>
  );
};
