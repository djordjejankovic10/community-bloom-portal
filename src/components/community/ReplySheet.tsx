import { useState, useEffect, useRef, useCallback } from "react";
import { useUIPreferences } from "@/context/UIPreferences";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { Search, Video, BookOpen, Book, Calendar, Trophy, Users, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BottomSheet } from "@/components/ui/bottom-sheet";

// Define types for mentions
type MentionType = 'lesson' | 'course' | 'module' | 'meetup' | 'challenge' | 'circle' | 'member';

type MentionItem = {
  id: string;
  type: MentionType;
  title: string;
  subtitle?: string;
  image?: string;
};

type MentionedContent = {
  id: string;
  type: MentionType;
  title: string;
  subtitle?: string;
  image?: string;
};

// Mock data for mentions - simplified version of what's in CreatePost
const MOCK_MENTIONS: MentionItem[] = [
  { id: 'member-1', type: 'member', title: 'John Smith', subtitle: '@johnsmith', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
  { id: 'member-2', type: 'member', title: 'Emma Davis', subtitle: '@emmafitness', image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=300&fit=crop' },
  { id: 'circle-1', type: 'circle', title: 'Weight Training', subtitle: '15k members' },
  { id: 'circle-2', type: 'circle', title: 'Yoga', subtitle: '8k members' },
];

// Simple MentionBottomSheet component
const MentionBottomSheet = ({ 
  isOpen, 
  onClose,
  search,
  onSearchChange,
  onSelect
}: { 
  isOpen: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  mentions?: MentionItem[];
  onSelect: (item: MentionItem) => void;
}) => {
  // Filter mentions based on search
  const filteredMentions = MOCK_MENTIONS.filter(mention => 
    mention.title.toLowerCase().includes(search.toLowerCase()) ||
    (mention.subtitle && mention.subtitle.toLowerCase().includes(search.toLowerCase()))
  );

  // Group mentions by type
  const groupedMentions = filteredMentions.reduce((groups, mention) => {
    const type = mention.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(mention);
    return groups;
  }, {} as Record<MentionType, MentionItem[]>);

  // Sort group keys by predefined order
  const typeOrder: MentionType[] = ['member', 'course', 'lesson', 'module', 'meetup', 'challenge', 'circle'];
  const sortedGroups = Object.keys(groupedMentions)
    .sort((a, b) => {
      const aIndex = typeOrder.indexOf(a as MentionType);
      const bIndex = typeOrder.indexOf(b as MentionType);
      return aIndex - bIndex;
    }) as MentionType[];

  // Format type label for display
  const formatTypeLabel = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1) + 's';
  };

  // Get icon for each type
  const getTypeIcon = (type: MentionType) => {
    switch (type) {
      case 'lesson':
        return <Video className="h-4 w-4" />;
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'module':
        return <Book className="h-4 w-4" />;
      case 'meetup':
        return <Calendar className="h-4 w-4" />;
      case 'challenge':
        return <Trophy className="h-4 w-4" />;
      case 'circle':
        return <Users className="h-4 w-4" />;
      case 'member':
        return <UserCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <BottomSheet open={isOpen} onClose={onClose} className="max-h-[70vh]">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Mention</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search area */}
        <div className="sticky top-0 bg-background mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        
        {/* Results */}
        <div className="overflow-y-auto">
          {filteredMentions.length > 0 ? (
            <div className="space-y-4">
              {sortedGroups.map(type => (
                <div key={type} className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1 px-2 flex items-center gap-1">
                    {getTypeIcon(type)}
                    {formatTypeLabel(type)}
                  </h3>
                  {groupedMentions[type].map((mention) => (
                    <Button
                      key={mention.id}
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 h-auto"
                      onClick={() => onSelect(mention)}
                    >
                      <div className="flex items-center gap-3">
                        {mention.image ? (
                          <img
                            src={mention.image}
                            alt=""
                            className="w-10 h-10 rounded object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary">{mention.title[0]}</span>
                          </div>
                        )}
                        <div className="text-left">
                          <div className="font-medium">{mention.title}</div>
                          {mention.subtitle && (
                            <div className="text-xs text-muted-foreground">{mention.subtitle}</div>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No matches found
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

interface ReplySheetProps {
  open: boolean;
  onClose: () => void;
  onSendReply: (text: string, media: MediaItem[]) => void;
  replyingTo: {
    name: string;
    avatar?: string;
    content?: string;
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaUploaderRef = useRef<MediaUploaderRef>(null);
  
  // Get the setHideBottomNav function from UIPreferences context
  const { setHideBottomNav } = useUIPreferences();
  
  // States for various bottom sheets and functionality
  const [isAISheetOpen, setIsAISheetOpen] = useState(false);
  const [aiNotes, setAiNotes] = useState("");
  const [aiGeneratedContent, setAiGeneratedContent] = useState("");
  const [isMentionBottomSheetOpen, setIsMentionBottomSheetOpen] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [mentionedContent, setMentionedContent] = useState<MentionedContent[]>([]);
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

  const toggleMediaUploader = () => {
    setTimeout(() => {
      mediaUploaderRef.current?.openMediaPicker();
    }, 50);
  };
  
  const handleMentionClick = () => {
    setIsMentionBottomSheetOpen(true);
  };
  
  const handleSelectMention = (item: MentionItem) => {
    // Add the mention to the text input
    setMentionedContent(prev => [...prev, item]);
    
    // Insert the mention at the cursor position or at the end
    const textarea = textareaRef.current;
    if (textarea) {
      const cursorPos = textarea.selectionStart || textarea.value.length;
      const textBefore = textarea.value.substring(0, cursorPos);
      const textAfter = textarea.value.substring(textarea.selectionEnd || cursorPos);
      
      // Format varies by type
      let mentionText = '';
      if (item.type === 'member') {
        mentionText = `@${item.subtitle?.replace('@', '')} `;
      } else {
        mentionText = `@${item.title} `;
      }
      
      const newText = textBefore + mentionText + textAfter;
      setReplyText(newText);
      
      // Close the mention sheet
      setIsMentionBottomSheetOpen(false);
      setMentionSearch("");
      
      // Focus back on textarea and place cursor after the inserted mention
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          const newCursorPos = cursorPos + mentionText.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 100);
    }
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-semibold text-sm">{replyingTo.name}</span>
                    </div>
                    
                    <span className="text-xs text-muted-foreground">5h</span>
                  </div>
                  
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
                <Textarea
                  ref={textareaRef}
                  placeholder="Post your reply"
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
              </div>
            </div>
          </div>
        )}
        
        {/* Media uploader */}
        {selectedMediaItems.length > 0 && (
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
            onClick={toggleMediaUploader}
            title="Media"
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
      
      {/* Mention Bottom Sheet */}
      {isMentionBottomSheetOpen && (
        <MentionBottomSheet
          isOpen={isMentionBottomSheetOpen}
          onClose={() => setIsMentionBottomSheetOpen(false)}
          search={mentionSearch}
          onSearchChange={setMentionSearch}
          onSelect={handleSelectMention}
        />
      )}
    </div>
  );
} 