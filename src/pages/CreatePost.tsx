import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Camera, Mic, LineChart, ArrowLeft, X, Repeat2, AtSign, Search, Sparkles, RotateCcw, CheckCircle } from "lucide-react";
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

const CreatePostPage = () => {
  const [content, setContent] = useState("");
  const [selectedCircle, setSelectedCircle] = useState(CIRCLES[0]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = useParams<{ postId?: string }>();
  
  // For repost functionality
  const [originalPost, setOriginalPost] = useState<PostProps | null>(null);
  const [isRepost, setIsRepost] = useState(false);

  // For mention functionality
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [mentionedContent, setMentionedContent] = useState<MentionedContent[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // For AI functionality
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiNotes, setAINotes] = useState("");
  const [aiGeneratedContent, setAIGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageClick = () => {
    if (uploadedImages.length >= 10) return;
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

  // Load the original post if this is a repost
  useEffect(() => {
    if (params.postId) {
      const postIdNum = parseInt(params.postId);
      const foundPost = MOCK_POSTS.find(post => post.index === postIdNum);
      if (foundPost) {
        setOriginalPost(foundPost);
        setIsRepost(true);
      }
    }
  }, [params.postId]);

  const handlePost = () => {
    if (isRepost && originalPost) {
      // Handle repost logic
      console.log("Reposting with comment:", content);
      console.log("Original post:", originalPost);
    } else {
      // Handle regular post logic
      console.log("Posting content:", content);
      console.log("Selected circle:", selectedCircle);
      console.log("Uploaded images:", uploadedImages);
    }
    
    // Navigate back to feed
    navigate("/community");
  };

  const handleRemoveOriginalPost = () => {
    setOriginalPost(null);
    setIsRepost(false);
    navigate('/create');
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

  const isPostButtonEnabled = (content.trim().length > 0 || uploadedImages.length > 0 || isRepost);

  return (
    <div className="fixed inset-0 flex flex-col bg-background" style={{width: '100vw'}}>
      <div className="flex items-center justify-between border-b p-3 shrink-0" style={{width: '100%'}}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="font-semibold">{isRepost ? "Repost" : "New note"}</div>
        <Button
          size="sm"
          className="rounded-full px-4"
          disabled={!isPostButtonEnabled}
          onClick={handlePost}
        >
          {isRepost ? (
            <>
              <Repeat2 className="h-4 w-4 mr-2" />
              Repost
            </>
          ) : "Post"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4" style={{width: '100%'}}>
        {!isRepost && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Circle</label>
            <div className="w-1/2">
              <Select value={selectedCircle} onValueChange={setSelectedCircle}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a circle" />
                </SelectTrigger>
                <SelectContent>
                  {CIRCLES.map((circle) => (
                    <SelectItem key={circle} value={circle}>
                      {circle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <div className="flex flex-col">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col">
              <textarea
                ref={textareaRef}
                placeholder={isRepost ? "Add a comment (optional)" : "What's on your mind?"}
                className="w-full resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm min-h-[120px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              {/* Display original post if this is a repost */}
              {isRepost && originalPost && (
                <div className="relative border rounded-lg overflow-hidden mt-2 mb-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 z-10"
                    onClick={handleRemoveOriginalPost}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <FeedPost {...originalPost} isEmbedded={true} />
                </div>
              )}

              {/* Display thumbnails for mentioned content */}
              {mentionedContent.length > 0 && (
                <div className="space-y-2 mt-2">
                  {mentionedContent.map((item) => (
                    <div key={item.id} className="relative border rounded-lg overflow-hidden bg-muted/20">
                      <div className="flex p-3">
                        {item.image ? (
                          <div className="w-20 h-16 rounded overflow-hidden bg-muted flex-shrink-0 mr-3">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-20 h-16 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mr-3">
                            <span className="text-primary font-medium text-xl">{item.type[0].toUpperCase()}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          {item.subtitle && (
                            <div className="text-xs text-muted-foreground">{item.subtitle}</div>
                          )}
                          <div className="text-xs mt-1 text-primary capitalize">{item.type}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 self-start"
                          onClick={() => handleRemoveMentionedContent(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative aspect-square">
                      <img 
                        src={image.url} 
                        alt="Upload preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 px-1 overflow-x-auto scrollbar-none">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11 flex-shrink-0"
              onClick={handleImageClick}
            >
              <Image className="h-6 w-6 text-muted-foreground" />
            </Button>
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
              className="h-11 w-11 flex-shrink-0"
              onClick={() => {}}
            >
              <Camera className="h-6 w-6 text-muted-foreground" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11 flex-shrink-0"
              onClick={() => {}}
            >
              <Mic className="h-6 w-6 text-muted-foreground" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11 flex-shrink-0"
              onClick={() => {}}
            >
              <LineChart className="h-6 w-6 text-muted-foreground" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11 flex-shrink-0"
              onClick={() => {
                handleMentionClick();
                setIsMentionOpen(!isMentionOpen);
              }}
            >
              <AtSign className="h-6 w-6 text-muted-foreground" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11 flex-shrink-0"
              onClick={handleAIClick}
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </Button>
            
            {/* Custom mention menu that stays within viewport */}
            {isMentionOpen && (
              <div className="fixed inset-x-0 bottom-16 mx-4 bg-background border rounded-lg shadow-lg z-50" style={{ maxHeight: '40vh' }}>
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
            
            {/* AI Assistant bottom sheet */}
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
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;