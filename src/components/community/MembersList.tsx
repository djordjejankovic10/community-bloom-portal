import { Search, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

type Member = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role?: "admin" | "founder";
  bio?: string;
};

const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "David Johnson",
    handle: "davidj",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
    role: "founder",
    bio: "Fitness enthusiast & community builder. Creating spaces for people to grow stronger together 💪"
  },
  {
    id: "2",
    name: "Sarah Chen",
    handle: "sarahc",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    role: "admin",
    bio: "Nutrition specialist | Helping you fuel your fitness journey 🥗"
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    handle: "mikefit",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Personal trainer | HIIT specialist | Coffee addict ☕️"
  },
  {
    id: "4",
    name: "Emma Wilson",
    handle: "emmaw",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    role: "admin",
    bio: "Yoga instructor & mindfulness coach 🧘‍♀️"
  },
  {
    id: "5",
    name: "James Lee",
    handle: "jameslee",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    bio: "Powerlifting enthusiast | 500lb deadlift club 🏋️‍♂️"
  },
  {
    id: "6",
    name: "Lisa Patel",
    handle: "lisap",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Marathon runner | Plant-based athlete 🌱"
  },
  {
    id: "7",
    name: "Alex Thompson",
    handle: "alext",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Calisthenics & bodyweight fitness coach 💫"
  },
  {
    id: "8",
    name: "Maria Garcia",
    handle: "mariag",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    bio: "Dance fitness instructor | Making workouts fun! 💃"
  },
  {
    id: "9",
    name: "Tom Wilson",
    handle: "tomw",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Recovery specialist | Sleep science nerd 😴"
  },
  {
    id: "10",
    name: "Nina Patel",
    handle: "ninap",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    bio: "Pilates instructor | Posture specialist 🤸‍♀️"
  },
  {
    id: "11",
    name: "Chris Martinez",
    handle: "chrism",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    bio: "CrossFit coach | Former college athlete 🏈"
  },
  {
    id: "12",
    name: "Sophie Kim",
    handle: "sophiek",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    bio: "Mobility specialist | Helping you move better 🎯"
  },
  {
    id: "13",
    name: "Ryan Cooper",
    handle: "ryanc",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
    bio: "Boxing coach | 10+ years experience 🥊"
  },
  {
    id: "14",
    name: "Ava Williams",
    handle: "avaw",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
    bio: "Nutritionist | Meal prep queen 👩‍🍳"
  },
  {
    id: "15",
    name: "Daniel Kim",
    handle: "danielk",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop",
    bio: "Strength coach | Helping you build muscle 💪"
  },
  {
    id: "16",
    name: "Rachel Chen",
    handle: "rachelc",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "Wellness coach | Mind-body connection specialist 🧠"
  },
  {
    id: "17",
    name: "Marcus Johnson",
    handle: "marcusj",
    avatar: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&h=400&fit=crop",
    bio: "Running coach | Marathon PB: 2:45 🏃‍♂️"
  },
  {
    id: "18",
    name: "Olivia Brown",
    handle: "oliviab",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    bio: "Flexibility coach | Former gymnast 🤸‍♀️"
  }
];

export const MembersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredMembers = MOCK_MEMBERS.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="font-semibold">Members</div>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredMembers.map((member) => (
          <div 
            key={member.id}
            className="flex items-center gap-3 p-4 border-b hover:bg-accent transition-colors cursor-pointer"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{member.name}</span>
                {member.role && (
                  <Badge variant="default" className="text-[10px] px-1 py-0">
                    {member.role}
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">@{member.handle}</div>
              {member.bio && (
                <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {member.bio}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 