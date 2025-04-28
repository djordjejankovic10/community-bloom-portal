import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { MessageInput } from "@/components/messages/MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Phone, VideoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Message } from "@/types/message";
import { 
  CURRENT_USER, 
  getConversationById, 
  getMessagesByConversationId,
  getOtherParticipant
} from "@/data/mockMessages";

const ChatPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const [otherUser, setOtherUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load conversation and messages
  useEffect(() => {
    if (conversationId) {
      const conv = getConversationById(conversationId);
      if (conv) {
        setConversation(conv);
        setOtherUser(getOtherParticipant(conv));
        
        // Load messages
        const msgs = getMessagesByConversationId(conversationId);
        setMessages(msgs);
        
        // Mark messages as read
        setMessages(prevMessages => 
          prevMessages.map(msg => ({
            ...msg,
            isRead: true
          }))
        );
      } else {
        navigate('/messages');
      }
    }
  }, [conversationId, navigate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (content: string, media?: File) => {
    if (!content.trim() && !media) return;
    
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: CURRENT_USER.id,
      type: media ? 'image' : 'text',
      content: content.trim(),
      timestamp: new Date().toISOString(),
      isRead: true,
      ...(media && {
        media: {
          url: URL.createObjectURL(media),
          type: media.type.startsWith('image/') ? 'image' : 'video',
        }
      })
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  if (!conversation || !otherUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b bg-background/80 backdrop-blur-sm z-10 sticky top-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate('/messages')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
            <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{otherUser.name}</div>
            <div className="text-xs text-muted-foreground">
              {otherUser.online ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <VideoIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="font-semibold text-lg mb-1">{otherUser.name}</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Start a conversation with {otherUser.name}. Send a message below.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Message input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
