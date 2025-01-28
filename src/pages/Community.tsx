import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { BottomNav } from "@/components/layout/BottomNav";
import { FeedPost } from "@/components/community/FeedPost";

const MOCK_POSTS = [
  {
    author: {
      name: "Wired",
      handle: "wired",
      avatar: "https://pbs.twimg.com/profile_images/1679157854607613952/7Z0-0FeJ_400x400.jpg",
      verified: true,
    },
    content: "Amid ongoing fears over TikTok, Chinese generative AI platform DeepSeek says it's sending heaps of US user data straight to its home country, potentially setting the stage for greater scrutiny.",
    timestamp: "8h",
    metrics: {
      likes: 212,
      comments: 152,
      reposts: 40,
      shares: 22,
    },
    media: {
      type: "link",
      url: "https://www.wired.com/story/deepseek-ai-data-china",
      title: "DeepSeek's Popular AI App Is Explicitly Sending US Data to China",
      domain: "wired.com",
    },
  },
  {
    author: {
      name: "MKBHD",
      handle: "mkbhd",
      avatar: "https://pbs.twimg.com/profile_images/1468001914302390278/B_Xv_8gu_400x400.jpg",
      verified: true,
    },
    content: "We made MKBHD's Dream Phone",
    timestamp: "12h",
    metrics: {
      likes: 3500,
      comments: 184,
      reposts: 89,
      shares: 105,
    },
    media: {
      type: "link",
      url: "https://youtube.com/mkbhd",
      title: "MKBHD's Dream Phone Revealed",
      domain: "youtube.com",
    },
  },
];

const Community = () => {
  return (
    <div className="min-h-screen pb-20">
      <CommunityHeader />
      <CommunityTabs />
      <main className="p-4">
        {MOCK_POSTS.map((post, index) => (
          <FeedPost key={index} {...post} />
        ))}
      </main>
      <BottomNav />
    </div>
  );
};

export default Community;