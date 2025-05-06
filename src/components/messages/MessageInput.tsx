import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Send, Plus, X, Sparkles } from "lucide-react";
import { AIBottomSheet } from "@/components/ai/AIBottomSheet";

interface MessageInputProps {
  onSendMessage: (content: string, media?: File) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSend = () => {
    if (message.trim() || mediaFile) {
      onSendMessage(message, mediaFile || undefined);
      setMessage("");
      setMediaPreview(null);
      setMediaFile(null);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearMedia = () => {
    setMediaPreview(null);
    setMediaFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleAISuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };
  
  return (
    <div className="px-3 pb-3 pt-2 border-t bg-background shadow-md">
      {mediaPreview && (
        <div className="mb-2 relative inline-block">
          <img 
            src={mediaPreview} 
            alt="Media preview" 
            className="h-20 rounded-md object-cover"
          />
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6 absolute top-1 right-1 bg-background/80"
            onClick={clearMedia}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10 py-6 border-primary/20 focus-visible:ring-primary/50"
            autoFocus
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="h-5 w-5 text-muted-foreground" />
            </Button>
            
            {/* AI Assistant */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary"
              onClick={() => setIsAIOpen(true)}
            >
              <Sparkles className="h-5 w-5" />
            </Button>
            
            <AIBottomSheet 
              isOpen={isAIOpen} 
              onClose={() => setIsAIOpen(false)} 
              onSuggestionSelect={handleAISuggestion}
              mode="message"
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <Button
          size="icon"
          className="h-10 w-10 rounded-full flex-shrink-0 bg-primary hover:bg-primary/90"
          onClick={handleSend}
          disabled={!message.trim() && !mediaFile}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
