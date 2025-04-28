import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Edit, Circle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MOCK_CONVERSATIONS, getMessagesByConversationId, getOtherParticipant, formatMessageTime } from "@/data/mockMessages";
import { Conversation } from "@/types/message";

const ConversationItem = ({ conversation }: { conversation: Conversation }) => {
  const otherUser = getOtherParticipant(conversation);
  const navigate = useNavigate();
  
  // Get the last message
  const messages = getMessagesByConversationId(conversation.id);
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  
  if (!otherUser) return null;
  
  let messagePreview = "Start a conversation";
  let time = "";
  
  if (lastMessage) {
    // Create message preview
    if (lastMessage.type === 'text') {
      messagePreview = lastMessage.content;
    } else if (lastMessage.type === 'image') {
      messagePreview = "📷 Image";
      if (lastMessage.content) {
        messagePreview += `: ${lastMessage.content}`;
      }
    } else if (lastMessage.type === 'video') {
      messagePreview = "🎥 Video";
      if (lastMessage.content) {
        messagePreview += `: ${lastMessage.content}`;
      }
    }
    
    // Format time
    time = formatMessageTime(lastMessage.timestamp);
  }
  
  return (
    <div 
      className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => navigate(`/messages/${conversation.id}`)}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
          <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
        </Avatar>
        {otherUser.online && (
          <span className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <div className="font-semibold truncate">{otherUser.name}</div>
          {time && <div className="text-xs text-muted-foreground">{time}</div>}
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
            {messagePreview}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="rounded-full bg-primary text-primary-foreground text-xs font-medium px-1.5 py-0.5 min-w-[1.25rem] text-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const MessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load conversations
    setConversations(MOCK_CONVERSATIONS);
  }, []);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => {
    const otherUser = getOtherParticipant(conv);
    if (!otherUser) return false;
    
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2 p-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate("/community")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-xl flex-1">Messages</h1>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {/* Would open a new message compose screen */}}
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Separator />
      </div>
      
      <div>
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem 
              key={conversation.id} 
              conversation={conversation} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
