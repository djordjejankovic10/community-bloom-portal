import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Camera, Mic, LineChart, ArrowLeft, X, Repeat2, AtSign, Search, Sparkles, RotateCcw, CheckCircle, ChevronDown, FileText, Link } from "lucide-react";
import { Book, BookOpen, Calendar, Trophy, Users, UserCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FeedPost } from "@/components/community/FeedPost";
import { PostProps } from "@/types/post";
import { MOCK_POSTS } from "./Community";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { AIBottomSheet } from "@/components/ai/AIBottomSheet";
import { BottomSheet } from "@/components/messages/BottomSheet";
import { CircleIcon, ChevronDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MediaUploader, MediaItem, MediaUploaderRef } from "@/components/ui/media-uploader";
import { cn } from "@/lib/utils";

const CIRCLES = [
  "General",
  "Weight Training",
  "Cardio",
  "Yoga",
  "Nutrition",
  "Recovery",
];

type UploadedImage = MediaItem;

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

// Mock data for mentions
const MOCK_MENTIONS: MentionItem[] = [
  // Lessons
  { id: 'lesson-1', type: 'lesson', title: 'Proper Squat Form', subtitle: 'Fundamentals of Weightlifting', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
  { id: 'lesson-2', type: 'lesson', title: 'HIIT Basics', subtitle: 'Cardio Essentials', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop' },
  { id: 'lesson-3', type: 'lesson', title: 'Meditation for Recovery', subtitle: 'Mind-Body Connection', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop' },
  
  // Courses
  { id: 'course-1', type: 'course', title: 'Strength Training 101', subtitle: '8-week program', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=300&fit=crop' },
  { id: 'course-2', type: 'course', title: 'Yoga for Beginners', subtitle: '4-week program', image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=300&fit=crop' },
  
  // Modules
  { id: 'module-1', type: 'module', title: 'Nutrition Fundamentals', subtitle: 'Course: Healthy Eating' },
  { id: 'module-2', type: 'module', title: 'Recovery Techniques', subtitle: 'Course: Injury Prevention' },
  
  // Meetups
  { id: 'meetup-1', type: 'meetup', title: 'Saturday Morning Run', subtitle: 'Central Park, 8am', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop' },
  { id: 'meetup-2', type: 'meetup', title: 'Yoga in the Park', subtitle: 'Sunset Park, Sunday 9am', image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop' },
  
  // Challenges
  { id: 'challenge-1', type: 'challenge', title: '30-Day Push-up Challenge', subtitle: '3,000 participants', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop' },
  { id: 'challenge-2', type: 'challenge', title: 'Summer Hydration Challenge', subtitle: '1,500 participants' },
  
  // Circles
  { id: 'circle-1', type: 'circle', title: 'Weight Training', subtitle: '15k members' },
  { id: 'circle-2', type: 'circle', title: 'Yoga', subtitle: '8k members' },
  { id: 'circle-3', type: 'circle', title: 'Nutrition', subtitle: '12k members' },
  
  // Members
  { id: 'member-1', type: 'member', title: 'John Smith', subtitle: '@fitnesspro', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
  { id: 'member-2', type: 'member', title: 'Emma Davis', subtitle: '@emmafitness', image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=300&fit=crop' },
  { id: 'member-3', type: 'member', title: 'Maya Patel', subtitle: '@recoverycoach', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=300&fit=crop' },
];

// Add a CircleBottomSheet component
const CircleBottomSheet = ({ 
  isOpen, 
  onClose, 
  selectedCircle, 
  onSelect 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  selectedCircle: string | null; 
  onSelect: (circle: string) => void;
}) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} className="max-h-[50vh]">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Circle</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {CIRCLES.map((circle) => (
            <Button
              key={circle}
              variant="ghost"
              className={`w-full justify-start text-left h-auto py-3 ${selectedCircle === circle ? 'bg-muted' : ''}`}
              onClick={() => {
                onSelect(circle);
                onClose();
              }}
            >
              {circle}
              {selectedCircle === circle && (
                <CircleIcon className="h-4 w-4 ml-auto text-primary" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};

// Replace the MentionDropdown component with a MentionBottomSheet component
// Simple React component for the mention bottom sheet
const MentionBottomSheet = ({ 
  isOpen, 
  onClose,
  search,
  onSearchChange,
  mentions,
  onSelect
}: { 
  isOpen: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  mentions: MentionItem[];
  onSelect: (item: MentionItem) => void;
}) => {
  // Group mentions by type
  const groupedMentions = mentions.reduce((groups, mention) => {
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
    <BottomSheet isOpen={isOpen} onClose={onClose} className="max-h-[70vh]">
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
          {mentions.length > 0 ? (
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
                            <div className="text-xs text-muted-foreground">
                              {mention.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-center text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

// Create a rich media preview component for mentions
const MentionPreview = ({ item, onRemove }: { item: MentionedContent; onRemove: (id: string) => void }) => {
  // Only show rich preview for content types (not members)
  if (item.type === 'member') {
    return null;
  }

  // Get appropriate icon for the type
  const getTypeIcon = () => {
    switch (item.type) {
      case 'lesson':
        return <Video className="h-4 w-4 text-muted-foreground" />;
      case 'course':
        return <BookOpen className="h-4 w-4 text-muted-foreground" />;
      case 'module':
        return <Book className="h-4 w-4 text-muted-foreground" />;
      case 'meetup':
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
      case 'challenge':
        return <Trophy className="h-4 w-4 text-muted-foreground" />;
      case 'circle':
        return <Users className="h-4 w-4 text-muted-foreground" />;
      default:
        return <AtSign className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="mt-2 border rounded-lg overflow-hidden hover:bg-accent/5 transition-colors relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full absolute top-2 right-2 bg-background/80 z-10"
        onClick={() => onRemove(item.id)}
      >
        <X className="h-3 w-3" />
      </Button>
      <div className="flex">
        {item.image ? (
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-primary/5 flex items-center justify-center flex-shrink-0">
            {getTypeIcon()}
          </div>
        )}
        <div className="p-3 flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            {getTypeIcon()}
            <span className="text-xs text-muted-foreground font-medium uppercase">
              {item.type}
            </span>
          </div>
          <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
          {item.subtitle && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {item.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CreatePostPage = () => {
  const [content, setContent] = useState("");
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null);
  const [isCircleOpen, setIsCircleOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<MediaItem[]>([]);
  const [showMediaUploader, setShowMediaUploader] = useState(false);
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [mentionedContent, setMentionedContent] = useState<MentionedContent[]>([]);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiNotes, setAINotes] = useState("");
  const [aiGeneratedContent, setAIGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mediaUploaderRef = useRef<MediaUploaderRef>(null);
  const [atCharPosition, setAtCharPosition] = useState<number | null>(null);
  const textareaDivRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);

  // Track textarea height for autoresizing
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  // Detect @ symbol for mentions
  useEffect(() => {
    const mentionMatch = content.match(/@(\w*)$/);
    
    if (mentionMatch) {
      // Found a mention at the end of the text
      setMentionSearch(mentionMatch[1]);
      
      // Get position of the text caret
      if (textareaRef.current) {
        const pos = textareaRef.current.selectionStart;
        const matchStartPos = pos - mentionMatch[0].length;
        
        setAtCharPosition(matchStartPos);
        setIsMentionOpen(true);
      }
    } else if (atCharPosition !== null && !content.includes('@')) {
      // No mention being typed, close the dropdown
      setIsMentionOpen(false);
      setAtCharPosition(null);
    }
    
  }, [content]);

  // Filter mentions based on search query
  const filteredMentions = MOCK_MENTIONS.filter(mention => {
    const searchLower = mentionSearch.toLowerCase();
    return (
      mention.title.toLowerCase().includes(searchLower) ||
      (mention.subtitle && mention.subtitle.toLowerCase().includes(searchLower)) ||
      mention.type.toLowerCase().includes(searchLower)
    );
  });

  // Handle media uploader toggling
  const toggleMediaUploader = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowMediaUploader(true);
    setTimeout(() => {
      mediaUploaderRef.current?.openMediaPicker();
    }, 50);
  };

  // Handle mention button click
  const handleMentionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Focus the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
      
      const currentPosition = textareaRef.current.selectionStart;
      const textBefore = content.substring(0, currentPosition);
      const textAfter = content.substring(currentPosition);
      
      // Insert @ at cursor position if not already there
      if (!textBefore.endsWith('@')) {
        // Insert the @ symbol
        setContent(textBefore + '@' + textAfter);
        
        // Store the position of the @ character
        setAtCharPosition(currentPosition);
        
        // Using a timeout to ensure state updates have happened
        setTimeout(() => {
          // Move cursor position after the @ symbol
          if (textareaRef.current) {
            const newCursorPos = currentPosition + 1;
            textareaRef.current.selectionStart = newCursorPos;
            textareaRef.current.selectionEnd = newCursorPos;
            
            // Open the mention dropdown
            setIsMentionOpen(true);
          }
        }, 50);
      } else {
        // If @ is already at cursor, just open the dropdown
        setIsMentionOpen(true);
      }
    }
  };

  // Handle selecting a mention item
  const handleSelectMention = (item: MentionItem) => {
    // Add the selected mention to the list of mentioned content
    setMentionedContent([...mentionedContent, item]);
    
    // Replace the @ with the mention text in the content
    if (textareaRef.current && atCharPosition !== null) {
      const textBefore = content.substring(0, atCharPosition);
      const textAfter = content.substring(textareaRef.current.selectionStart);
      
      // Add the mention with a space after it
      const newContent = textBefore + `@${item.title} ` + textAfter;
      setContent(newContent);
      
      // Close the mention popover
      setIsMentionOpen(false);
      setMentionSearch('');
      setAtCharPosition(null);
      
      // Move cursor after the inserted mention
      const newPosition = textBefore.length + `@${item.title} `.length;
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = newPosition;
          textareaRef.current.selectionEnd = newPosition;
        }
      }, 10);
    }
  };

  // Handle post logic
  const handlePost = () => {
    // Handle regular post logic
    console.log("Posting content:", content);
    console.log("Selected circle:", selectedCircle);
    console.log("Uploaded images:", uploadedImages);
    
    // Navigate back to feed
    navigate("/community");
  };

  // AI feature handlers
  const handleAIClick = () => {
    setIsAIOpen(true);
    setAINotes("");
    setAIGeneratedContent("");
  };
  
  // Mock AI generation function - in a real app, this would call an API
  const generateAIContent = async (notes: string) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock content based on notes
    const refinedContent = generateRefinedContent(notes);
    setAIGeneratedContent(refinedContent);
    setIsGenerating(false);
  };
  
  // Mock function to generate refined content
  const generateRefinedContent = (notes: string): string => {
    // This would be replaced with an actual AI model in production
    const sentences = [
      "I've been reflecting on this topic extensively.",
      "This has been a transformative experience for me.",
      "I wanted to share my thoughts with the community.",
      "After careful consideration, I've come to some important realizations.",
      "This journey has taught me valuable lessons I'd like to share."
    ];
    
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    const expandedNotes = notes
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.trim())
      .join('. ');
    
    return `${randomSentence} ${expandedNotes}.`.replace(/\.\.+/g, '.');
  };
  
  const handleAISubmit = () => {
    if (!aiNotes.trim()) {
      toast({
        title: "Notes required",
        description: "Please enter some notes for the AI to work with.",
        variant: "destructive"
      });
      return;
    }
    
    generateAIContent(aiNotes);
  };
  
  const handleRegenerateContent = () => {
    generateAIContent(aiNotes);
  };
  
  const handleConfirmAIContent = () => {
    // Add the AI content to the post
    if (textareaRef.current) {
      const currentPosition = textareaRef.current.selectionStart;
      const textBefore = content.substring(0, currentPosition);
      const textAfter = content.substring(currentPosition);
      
      setContent(textBefore + aiGeneratedContent + textAfter);
      
      // Close the AI popover and reset
      setIsAIOpen(false);
      setAINotes("");
      setAIGeneratedContent("");
      
      // Focus the textarea
      setTimeout(() => {
        if (textareaRef.current) {
          const newPosition = textBefore.length + aiGeneratedContent.length;
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    }
  };

  // Remove a mentioned content
  const handleRemoveMentionedContent = (id: string) => {
    setMentionedContent(mentionedContent.filter(mention => mention.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center justify-between border-b p-3 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="font-semibold">Create Post</div>
        <Button
          size="sm"
          className="rounded-full px-4"
          disabled={!content.trim() && uploadedImages.length === 0}
          onClick={handlePost}
        >
          Post
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <div className="flex gap-3" ref={composerRef}>
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
            <AvatarFallback>DJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2" ref={textareaDivRef}>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-normal h-7 gap-1"
              onClick={() => setIsCircleOpen(true)}
            >
              {selectedCircle ? (
                <>
                  {selectedCircle}
                </>
              ) : (
                <>
                  Select circle
                </>
              )}
              <ChevronDownIcon size={14} />
            </Button>
            
            <textarea
              ref={textareaRef}
              className="w-full resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none pt-[10px]"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={1}
            />
            
            {/* Media uploader component */}
            {showMediaUploader && (
              <MediaUploader 
                mediaItems={uploadedImages}
                onChange={setUploadedImages}
                maxItems={10}
                previewSize="lg"
                ref={mediaUploaderRef}
              />
            )}
            
            {/* Display mentioned content */}
            {mentionedContent.length > 0 && (
              <div className="space-y-2 mt-2">
                {/* Then show rich previews for content types */}
                <div className="space-y-2">
                  {mentionedContent
                    .filter(item => item.type !== 'member')
                    .map(item => (
                      <MentionPreview key={item.id} item={item} onRemove={handleRemoveMentionedContent} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between p-3 shrink-0 bg-background">
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
            onClick={(e) => handleMentionClick(e)}
          >
            <AtSign className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleAIClick}
          >
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
          >
            <FileText className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
          >
            <Link className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Custom mention dropdown */}
      <MentionBottomSheet
        isOpen={isMentionOpen}
        onClose={() => setIsMentionOpen(false)}
        search={mentionSearch}
        onSearchChange={setMentionSearch}
        mentions={filteredMentions}
        onSelect={handleSelectMention}
      />

      {/* Other bottom sheets and modals */}
      <CircleBottomSheet
        isOpen={isCircleOpen}
        onClose={() => setIsCircleOpen(false)}
        selectedCircle={selectedCircle}
        onSelect={setSelectedCircle}
      />
      
      <AIBottomSheet
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        mode="post"
        aiNotes={aiNotes}
        onNotesChange={(notes) => setAINotes(notes)}
        aiGeneratedContent={aiGeneratedContent}
        isGenerating={isGenerating}
        onAISubmit={handleAISubmit}
        onRegenerateContent={handleRegenerateContent}
        onConfirmContent={handleConfirmAIContent}
      />
    </div>
  );
};

export default CreatePostPage;