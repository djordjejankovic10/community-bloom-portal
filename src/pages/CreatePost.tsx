import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Camera, Mic, LineChart, ArrowLeft, X, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FeedPost } from "@/components/community/FeedPost";
import { PostProps } from "@/types/post";
import { MOCK_POSTS } from "./Community";

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

  const isPostButtonEnabled = (content.trim().length > 0 || uploadedImages.length > 0 || isRepost);

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

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col">
              <textarea
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

          <div className="flex gap-1 overflow-x-auto pb-2 mt-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11 flex-shrink-0" 
              onClick={handleImageClick}
              disabled={uploadedImages.length >= 10}
            >
              <Image className="h-6 w-6 text-muted-foreground" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
            />
            <Button variant="ghost" size="icon" className="h-11 w-11 flex-shrink-0">
              <Camera className="h-6 w-6 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-11 w-11 flex-shrink-0">
              <Mic className="h-6 w-6 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-11 w-11 flex-shrink-0">
              <LineChart className="h-6 w-6 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {!isRepost && (
          <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Circle</label>
          <div className="w-full overflow-x-auto">
            <Tabs value={selectedCircle} onValueChange={setSelectedCircle}>
              <TabsList className="w-full justify-start">
                {CIRCLES.map((circle) => (
                  <TabsTrigger key={circle} value={circle} className="text-xs whitespace-nowrap">
                    {circle}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostPage;