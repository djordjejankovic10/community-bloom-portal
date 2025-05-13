import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Camera, Mic, LineChart, ArrowLeft, X, Repeat2, AtSign, Search, Sparkles, RotateCcw, CheckCircle, ChevronDown } from "lucide-react";
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

const CIRCLES = [
  "General",
  "Weight Training",
  "Cardio",
  "Yoga",
  "Nutrition",
  "Recovery",
];

type UploadedImage = {
  id: string;
  url: string;
};

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
                <CheckCircle className="h-4 w-4 ml-auto text-primary" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};

const CreatePostPage = () => {
  const [content, setContent] = useState("");
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null);
  const [isCircleOpen, setIsCircleOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [mentionedContent, setMentionedContent] = useState<MentionedContent[]>([]);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiNotes, setAINotes] = useState("");
  const [aiGeneratedContent, setAIGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      setMentionSearch(mentionMatch[1]);
      setIsMentionOpen(true);
    } else {
      setIsMentionOpen(false);
    }
  }, [content]);
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const remainingSlots = 10 - uploadedImages.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    const newImages = filesToProcess.map(file => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file)
    }));

    setUploadedImages(prev => [...prev, ...newImages]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (idToRemove: string) => {
    setUploadedImages(prev => {
      const filtered = prev.filter(img => img.id !== idToRemove);
      // Cleanup URL object
      const removedImage = prev.find(img => img.id === idToRemove);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.url);
      }
      return filtered;
    });
  };

  const handlePost = () => {
    // Handle regular post logic
    console.log("Posting content:", content);
    console.log("Selected circle:", selectedCircle);
    console.log("Uploaded images:", uploadedImages);
    
    // Navigate back to feed
    navigate("/community");
  };

  // Filter mentions based on search query
  const filteredMentions = MOCK_MENTIONS.filter(mention => {
    const searchLower = mentionSearch.toLowerCase();
    return (
      mention.title.toLowerCase().includes(searchLower) ||
      (mention.subtitle && mention.subtitle.toLowerCase().includes(searchLower)) ||
      mention.type.toLowerCase().includes(searchLower)
    );
  });

  // Handle mention button click
  const handleMentionClick = () => {
    setIsMentionOpen(true);
    // Add @ symbol to content if not already there
    if (textareaRef.current) {
      const currentPosition = textareaRef.current.selectionStart;
      const textBefore = content.substring(0, currentPosition);
      
      // Check if we're already typing a mention
      if (!textBefore.endsWith('@')) {
        const textAfter = content.substring(currentPosition);
        setContent(textBefore + '@' + textAfter);
        
        // Move cursor after the @ symbol
        setTimeout(() => {
          if (textareaRef.current) {
            const newPosition = currentPosition + 1;
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(newPosition, newPosition);
          }
        }, 0);
      }
    }
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

  // Handle selecting a mention item
  const handleSelectMention = (item: MentionItem) => {
    // Add the selected mention to the list of mentioned content
    setMentionedContent([...mentionedContent, item]);
    
    // Replace the @ with the mention text in the content
    if (textareaRef.current) {
      const currentPosition = textareaRef.current.selectionStart;
      const textBefore = content.substring(0, currentPosition).replace(/@[^\s]*$/, '');
      const textAfter = content.substring(currentPosition);
      
      // Add the mention with a space after it
      setContent(textBefore + `@${item.title} ` + textAfter);
      
      // Close the mention popover
      setIsMentionOpen(false);
      setMentionSearch('');
      
      // Focus and move cursor after the inserted mention
      setTimeout(() => {
        if (textareaRef.current) {
          const newPosition = textBefore.length + `@${item.title} `.length;
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
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
            <AvatarFallback>DJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-normal h-7 gap-1"
              onClick={() => setIsCircleOpen(true)}
            >
              {selectedCircle ? (
                <>
                  <CircleIcon size={14} /> {selectedCircle}
                </>
              ) : (
                <>
                  <CircleIcon size={14} /> Select circle
                </>
              )}
              <ChevronDownIcon size={14} />
            </Button>
            
            <textarea
              ref={textareaRef}
              className="w-full resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={1}
            />
            
            {/* Display uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {uploadedImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(img.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Display mentioned content */}
            {mentionedContent.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {mentionedContent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                  >
                    <span>@{item.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full hover:bg-primary/20"
                      onClick={() => handleRemoveMentionedContent(item.id)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between p-3 shrink-0 bg-background">
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleImageClick}
          >
            <Image className="h-5 w-5 text-emerald-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleMentionClick}
          >
            <AtSign className="h-5 w-5 text-blue-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleAIClick}
          >
            <Sparkles className="h-5 w-5 text-purple-500" />
          </Button>
        </div>
        
        <Badge
          variant="outline"
          className="flex items-center gap-1 h-7 px-3 rounded-full text-xs font-normal"
        >
          <Globe className="h-3 w-3" />
          <span>Public</span>
        </Badge>
      </div>

      <CircleBottomSheet
        isOpen={isCircleOpen}
        onClose={() => setIsCircleOpen(false)}
        selectedCircle={selectedCircle}
        onSelect={setSelectedCircle}
      />
      
      {isMentionOpen && (
        <div className="fixed inset-x-0 bottom-16 mx-0 sm:mx-4 bg-background border rounded-lg shadow-lg z-50" style={{ maxHeight: '40vh' }}>
          <div className="flex justify-between items-center p-3 border-b">
            <div className="text-sm font-medium">Mention</div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setIsMentionOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for lessons, courses, etc."
                className="pl-8"
                value={mentionSearch}
                onChange={(e) => setMentionSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(40vh - 110px)' }}>
            {filteredMentions.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No results found
              </div>
            ) : (
              filteredMentions.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => {
                    handleSelectMention(item);
                    setIsMentionOpen(false);
                  }}
                >
                  {item.image ? (
                    <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-medium">{item.type[0].toUpperCase()}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.title}</div>
                    {item.subtitle && (
                      <div className="text-xs text-muted-foreground truncate">{item.subtitle}</div>
                    )}
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-muted capitalize">
                    {item.type}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      <AIBottomSheet
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        mode="post"
        aiGeneratedContent={aiGeneratedContent}
        aiNotes={aiNotes}
        isGenerating={isGenerating}
        onAISubmit={handleAISubmit}
        onRegenerateContent={handleRegenerateContent}
        onConfirmContent={handleConfirmAIContent}
        onNotesChange={(notes) => setAINotes(notes)}
      />
    </div>
  );
};

export default CreatePostPage;