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
  X,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIBottomSheet } from "@/components/ai/AIBottomSheet";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { MentionProvider } from "@/components/mention/MentionProvider";
import { MentionItem } from "@/components/mention/MentionContextMenu";
import { ComposerToolbar } from "@/components/community/ComposerToolbar";

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
  // Rich text formatting states
  const [isRichTextOpen, setIsRichTextOpen] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

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

  // Rich text formatting functionality
  const handleFormatting = (formatType: string) => {
    if (!textareaRef.current) return;

    // Handle link formatting separately
    if (formatType === 'link') {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = replyText.substring(start, end);
      
      setIsLinkDialogOpen(true);
      if (selectedText) {
        setLinkText(selectedText);
      }
      return;
    }

    // Handle list formatting separately (these are not toggle-able states)
    if (formatType === 'bulletList' || formatType === 'numberedList') {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = replyText.substring(start, end);
      const textBefore = replyText.substring(0, start);
      const textAfter = replyText.substring(end);

      let formattedText = '';
      let newCursorPosition = start;

      if (formatType === 'bulletList') {
        formattedText = selectedText ? `• ${selectedText}` : '• ';
        newCursorPosition = selectedText ? end + 2 : start + 2;
      } else {
        formattedText = selectedText ? `1. ${selectedText}` : '1. ';
        newCursorPosition = selectedText ? end + 3 : start + 3;
      }

      const newContent = textBefore + formattedText + textAfter;
      setReplyText(newContent);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = newCursorPosition;
          textareaRef.current.selectionEnd = newCursorPosition;
        }
      }, 0);
      return;
    }

    // Handle toggleable formatting (bold, italic, underline, strikethrough)
    const newActiveFormats = new Set(activeFormats);
    
    if (newActiveFormats.has(formatType)) {
      // Remove the format
      newActiveFormats.delete(formatType);
    } else {
      // Add the format
      newActiveFormats.add(formatType);
    }
    
    setActiveFormats(newActiveFormats);

    // Focus the textarea to continue typing with the new formatting
    textareaRef.current.focus();
  };

  // Handle content changes with active formatting
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const textarea = e.target;
    const cursorPosition = textarea.selectionStart;
    const lastChar = newValue[cursorPosition - 1];
    
    // Check if user just typed a character (not deleted)
    if (newValue.length > replyText.length && lastChar && activeFormats.size > 0) {
      // Clear formatting on space or newline for natural break points
      if (lastChar === ' ' || lastChar === '\n') {
        setReplyText(newValue);
        setActiveFormats(new Set()); // Clear active formatting
        return;
      }
      
      // Apply active formatting to the newly typed character
      let wrappedChar = lastChar;
      const beforeChar = newValue.substring(0, cursorPosition - 1);
      const afterChar = newValue.substring(cursorPosition);
      
      // Apply formatting in order: bold, italic, underline, strikethrough
      if (activeFormats.has('bold')) {
        wrappedChar = `**${wrappedChar}**`;
      }
      if (activeFormats.has('italic')) {
        wrappedChar = `*${wrappedChar}*`;
      }
      if (activeFormats.has('underline')) {
        wrappedChar = `__${wrappedChar}__`;
      }
      if (activeFormats.has('strikethrough')) {
        wrappedChar = `~~${wrappedChar}~~`;
      }
      
      const formattedContent = beforeChar + wrappedChar + afterChar;
      setReplyText(formattedContent);
      
      // Set cursor position after the formatted text
      const newCursorPos = cursorPosition + wrappedChar.length - 1;
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
        }
      }, 0);
    } else {
      setReplyText(newValue);
    }
  };

  // Handle link dialog actions
  const handleLinkCancel = () => {
    setIsLinkDialogOpen(false);
    setLinkText("");
    setLinkUrl("");
  };

  const handleLinkSave = () => {
    if (!textareaRef.current || !linkUrl.trim()) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = replyText.substring(start, end);
    const textBefore = replyText.substring(0, start);
    const textAfter = replyText.substring(end);

    const displayText = linkText.trim() || selectedText || linkUrl;
    const formattedText = `[${displayText}](${linkUrl})`;
    const newContent = textBefore + formattedText + textAfter;
    
    setReplyText(newContent);
    
    // Close dialog and reset
    setIsLinkDialogOpen(false);
    setLinkText("");
    setLinkUrl("");

    // Set cursor position after the link
    const newCursorPosition = start + formattedText.length;
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = newCursorPosition;
        textareaRef.current.selectionEnd = newCursorPosition;
      }
    }, 0);
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
                    onChange={handleContentChange}
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

      {/* Footer with ComposerToolbar - consistent with CreatePost component */}
      <div className="border-t mt-auto pb-safe-area-inset-bottom">
        <ComposerToolbar
          isRichTextOpen={isRichTextOpen}
          setIsRichTextOpen={(open) => {
            setIsRichTextOpen(open);
            if (!open) {
              setActiveFormats(new Set()); // Clear active formatting when closing
            }
          }}
          activeFormats={activeFormats}
          onFormatting={handleFormatting}
          onMediaUpload={() => toggleMediaUploader({} as React.MouseEvent<HTMLButtonElement>)}
          onMentionClick={() => handleMentionClick()}
          onAIClick={handleAIClick}
          isLinkDialogOpen={isLinkDialogOpen}
          linkText={linkText}
          linkUrl={linkUrl}
          setLinkText={setLinkText}
          setLinkUrl={setLinkUrl}
          onLinkCancel={handleLinkCancel}
          onLinkSave={handleLinkSave}
        />
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