import { FeedPost } from "@/components/community/FeedPost";
import { PostProps } from "@/types/post";

// Mock post data
const ORIGINAL_POST: PostProps = {
  author: {
    firstName: "Jane",
    lastName: "Smith",
    handle: "janesmith",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    role: "founder"
  },
  content: "Just finished a 5-mile run and feeling great! 🏃‍♀️ What's your favorite post-workout routine?",
  timestamp: "2h ago",
  metrics: {
    likes: 24,
    comments: 8,
    shares: 3
  },
  media: {
    type: "image",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
  },
  index: 0
};

const RepostDemoPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold p-4 border-b">Repost Demo</h1>
      
      {/* Original post */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-muted-foreground p-2">Original Post:</h2>
        <FeedPost {...ORIGINAL_POST} />
      </div>
      
      {/* Repost with comment */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-muted-foreground p-2">Repost with Comment:</h2>
        <FeedPost 
          author={{
            firstName: "Alex",
            lastName: "Johnson",
            handle: "alexj",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
          }}
          content="This is such a great tip! I always stretch for 10 minutes after my runs."
          timestamp="Just now"
          metrics={{
            likes: 12,
            comments: 2,
            shares: 1
          }}
          originalPost={ORIGINAL_POST}
          index={1}
        />
      </div>
      
      {/* Repost without comment */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground p-2">Repost without Comment:</h2>
        <FeedPost 
          author={{
            firstName: "Taylor",
            lastName: "Wilson",
            handle: "taylorw",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
          }}
          content=""
          timestamp="5m ago"
          metrics={{
            likes: 5,
            comments: 0,
            shares: 0
          }}
          originalPost={ORIGINAL_POST}
          index={2}
        />
      </div>
    </div>
  );
};

export default RepostDemoPage;
