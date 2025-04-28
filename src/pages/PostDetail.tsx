import { useParams } from "react-router-dom";
import { FeedPost } from "@/components/community/FeedPost";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_POSTS } from "./Community";

const PostDetail = () => {
  const { postId } = useParams();
  // Find the post by its index property instead of array position
  const post = MOCK_POSTS.find(p => p.index === Number(postId));

  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => window.history.back()} className="text-xl">
            ←
          </button>
          <h1 className="font-bold text-xl">{post.author.firstName}'s post</h1>
        </div>
        <Separator />
      </div>

      <FeedPost {...post} isDetail />

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Input 
              placeholder="Reply to wired..."
              className="pr-24"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Image className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        {post.replies && post.replies.length > 0 && (
          <>
            <h2 className="font-bold mb-4">Replies</h2>
            {post.replies.map((reply, index) => (
              <div key={index} className="mb-4">
                <FeedPost {...reply} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;