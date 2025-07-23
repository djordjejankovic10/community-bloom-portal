import { useState, useEffect, useRef, useCallback } from "react";
import { useUIPreferences } from "@/context/UIPreferences";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TitleBadge } from "@/components/ui/title-badge";
import { MediaUploader, MediaItem, MediaUploaderRef } from "@/components/ui/media-uploader";
import { 
  Image, 
  AtSign,
  Sparkles,
  FileText,
  Link,
  X,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIBottomSheet } from "@/components/ai/AIBottomSheet";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { MentionProvider } from "@/components/mention/MentionProvider";
import { MentionItem } from "@/components/mention/MentionContextMenu";

// Type for mentioned content (using imported MentionItem)

interface ReplySheetProps {
  open: boolean;
  onClose: () => void;
  onSendReply: (text: string, media: MediaItem[]) => void;
  replyingTo: {
    name: string;
    avatar?: string;
    content?: string;
    role?: "founder" | "admin" | "moderator";
    titleBadge?: {
      title: string;
      tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
      icon: string;
    };
  };
  isTopLevel?: boolean; // Flag to indicate if this is a top-level comment
}

/**
 * ReplySheet component for replying to comments
 * 
 * UX Notes:
 * - Full screen view for focused reply composition
 * - Shows which comment is being replied to at the top for context
 * - Visual connecting line between original post and reply for clear threading
 * - Includes media upload capabilities
 * - Auto focuses the text input when opened
 * - Supports cancellation to return to normal commenting view
 * - Send button activates when there is content to send
 * - Includes full composer functionality matching the CreatePost experience
 */
export function ReplySheet({ open, onClose, onSendReply, replyingTo, isTopLevel = false }: ReplySheetProps) {
  const [replyText, setReplyText] = useState("");
  const [selectedMediaItems, setSelectedMediaItems] = useState<MediaItem[]>([]);
  const [showMediaUploader, setShowMediaUploader] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaUploaderRef = useRef<MediaUploaderRef>(null);
  
  // Get the setHideBottomNav function from UIPreferences context
  const { setHideBottomNav } = useUIPreferences();
  
  // States for various bottom sheets and functionality
  const [isAISheetOpen, setIsAISheetOpen] = useState(false);
  const [aiNotes, setAiNotes] = useState("");
  const [aiGeneratedContent, setAiGeneratedContent] = useState("");
  const [mentionedContent, setMentionedContent] = useState<MentionItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-focus the textarea when the sheet opens
  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 400); // Delay to allow animation to complete
    }
  }, [open]);

  // Auto-resize input as content is added
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to shrink on delete
      textareaRef.current.style.height = 'auto';
      
      // Set the height based on the scroll height
      const scrollHeight = textareaRef.current.scrollHeight;
      // Limit height to approximately 5 lines
      const maxHeight = 115;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [replyText]);

  // Body scroll lock effect and hide bottom nav when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Hide bottom navigation when the sheet is open
      setHideBottomNav(true);
    } else {
      document.body.style.overflow = "";
      // Show bottom navigation when the sheet is closed
      setHideBottomNav(false);
    }
    return () => {
      document.body.style.overflow = "";
      // Ensure bottom navigation is shown when component unmounts
      setHideBottomNav(false);
    };
  }, [open, setHideBottomNav]);

  const handleReply = () => {
    if (replyText.trim() || selectedMediaItems.length > 0) {
      onSendReply(replyText, selectedMediaItems);
      setReplyText("");
      setSelectedMediaItems([]);
      onClose();
    }
  };

  const toggleMediaUploader = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowMediaUploader(true);
    setTimeout(() => {
      mediaUploaderRef.current?.openMediaPicker();
    }, 50);
  };
  
  // Reference to the mention trigger function
  const mentionTriggerRef = useRef<() => void>();
  
  const handleMentionClick = () => {
    if (mentionTriggerRef.current) {
      mentionTriggerRef.current();
    }
  };
  
  const handleSelectMention = (item: MentionItem) => {
    // Add the mention to the list of mentioned content
    setMentionedContent(prev => [...prev, item]);
  };
  
  const handleAIClick = () => {
    setIsAISheetOpen(true);
  };
  
  const handleAISubmit = () => {
    if (aiNotes.trim()) {
      setIsGenerating(true);
      // Generate content based on AI notes
      setTimeout(() => {
        const generatedContent = generateRefinedContent(aiNotes);
        setAiGeneratedContent(generatedContent);
        setIsGenerating(false);
      }, 1000);
    }
  };
  
  const handleConfirmAIContent = () => {
    if (aiGeneratedContent) {
      setReplyText(aiGeneratedContent);
      setIsAISheetOpen(false);
      setAiNotes("");
      setAiGeneratedContent("");
    }
  };
  
  // Mock function to simulate AI content generation
  const generateRefinedContent = (notes: string): string => {
    // In a real app, this would call an AI service
    const refinedPhrases = [
      "Based on your input, I'd suggest that ",
      "Research shows that ",
      "Many experts agree that ",
      "It's important to note that ",
      "What's interesting about this topic is that ",
    ];
    
    const randomPhrase = refinedPhrases[Math.floor(Math.random() * refinedPhrases.length)];
    return randomPhrase + notes.trim() + ".";
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header with back button and Reply title */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-bold">{isTopLevel ? "Comment" : "Reply"}</h2>
        <Button 
          size="sm"
          onClick={handleReply}
          disabled={!replyText.trim() && selectedMediaItems.length === 0}
          className={cn(
            "rounded-full px-4 font-semibold",
            replyText.trim() 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "bg-primary/70 text-primary-foreground/70"
          )}
        >
          {isTopLevel ? "Post" : "Reply"}
        </Button>
      </div>
      
      {/* Content with original post and reply input */}
      <div className="flex-1 overflow-auto px-4 py-3">
        {replyingTo.content && (
          <div className="pb-4 relative">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={replyingTo.avatar} />
                  <AvatarFallback>{replyingTo.name[0]}</AvatarFallback>
                </Avatar>
                
                {/* Connecting line between post and reply */}
                <div className="w-[2px] flex-grow bg-border/60 mt-2 mb-0" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">{replyingTo.name}</span>
                    {replyingTo.role && (
                      <Badge variant="default" className="text-[10px] px-1 py-0 h-4">
                        {replyingTo.role}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground whitespace-nowrap">· 5h</span>
                  </div>
                  
                  {/* Title badge row - separate line for title badges only */}
                  {replyingTo.titleBadge && (
                    <div className="flex items-center gap-1 mt-1 mb-2">
                      <TitleBadge
                        title={replyingTo.titleBadge.title}
                        tier={replyingTo.titleBadge.tier}
                        icon={replyingTo.titleBadge.icon}
                        size="sm"
                      />
                    </div>
                  )}
                  
                  <div className="mt-1 text-base text-foreground">{replyingTo.content}</div>
                </div>
              </div>
            </div>
            
            {/* Reply input directly below original post */}
            <div className="mt-3 flex gap-3">
              <div className="w-10 flex-shrink-0 flex items-start justify-center">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1 relative">
                <MentionProvider
                  textareaRef={textareaRef}
                  content={replyText}
                  setContent={setReplyText}
                  onMentionSelect={handleSelectMention}
                >
                  <Textarea
                    ref={textareaRef}
                    placeholder={isTopLevel ? "Post your comment" : "Post your reply"}
                    className="min-h-[80px] pl-0 pr-0 py-0 resize-none overflow-y-auto bg-transparent border-none shadow-none focus-visible:ring-0 text-base placeholder:text-muted-foreground/60"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && replyText.trim()) {
                        e.preventDefault();
                        handleReply();
                      }
                    }}
                    rows={3}
                  />
                </MentionProvider>
              </div>
            </div>
          </div>
        )}
        
        {/* Media uploader */}
        {showMediaUploader && (
          <div className="mt-3 mb-4">
            <MediaUploader 
              mediaItems={selectedMediaItems}
              onChange={setSelectedMediaItems}
              maxItems={4}
              previewSize="md"
              ref={mediaUploaderRef}
            />
          </div>
        )}
      </div>

      {/* Footer with action buttons - matching the CreatePost component */}
      <div className="flex items-center border-t p-3 py-4 mt-auto pb-safe-area-inset-bottom">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={(e) => toggleMediaUploader(e)}
          >
            <Image className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleMentionClick}
            title="Mention"
          >
            <AtSign className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleAIClick}
            title="AI Assist"
          >
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            title="Document"
          >
            <FileText className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            title="Link"
          >
            <Link className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* AI Assistant Bottom Sheet */}
      <AIBottomSheet
        isOpen={isAISheetOpen}
        onClose={() => setIsAISheetOpen(false)}
        aiNotes={aiNotes}
        aiGeneratedContent={aiGeneratedContent}
        onNotesChange={setAiNotes}
        onAISubmit={handleAISubmit}
        onRegenerateContent={handleAISubmit}
        onConfirmContent={handleConfirmAIContent}
        isGenerating={isGenerating}
        mode="post"
      />
      
      {/* Mention functionality is now handled by MentionProvider */}
    </div>
  );
} 