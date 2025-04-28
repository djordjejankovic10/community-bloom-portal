import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Repeat2 } from "lucide-react";
import { FeedPost } from "@/components/community/FeedPost";
import { PostProps } from "@/types/post";
import { MOCK_POSTS } from "./Community";

const RepostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  
  // Find the post to repost by its index property
  const postIdNum = postId ? parseInt(postId) : 0;
  const originalPost = MOCK_POSTS.find(post => post.index === postIdNum);
  
  if (!originalPost) {
    return <div>Post not found</div>;
  }

  const handleRepost = () => {
    // In a real app, this would send the repost to an API
    console.log("Reposting with comment:", comment);
    console.log("Original post:", originalPost);
    
    // Navigate back to feed
    navigate("/community");
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
        <div className="font-semibold">Repost</div>
        <Button
          size="sm"
          className="rounded-full px-4"
          onClick={handleRepost}
        >
          <Repeat2 className="h-4 w-4 mr-2" />
          Repost
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
            <AvatarFallback>DJ</AvatarFallback>
          </Avatar>
          <textarea
            placeholder="Add a comment (optional)"
            className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm min-h-[80px]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <FeedPost {...originalPost} isEmbedded={true} />
        </div>
      </div>
    </div>
  );
};

export default RepostPage;
