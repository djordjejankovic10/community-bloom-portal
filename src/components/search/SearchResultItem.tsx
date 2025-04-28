import { SearchResult } from "@/types/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Hash, FileText, User, Trophy, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchResultItemProps {
  result: SearchResult;
}

export const SearchResultItem = ({ result }: SearchResultItemProps) => {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (result.type) {
      case "group":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "channel":
        return <Hash className="h-5 w-5 text-green-500" />;
      case "post":
        return <FileText className="h-5 w-5 text-amber-500" />;
      case "member":
        return <User className="h-5 w-5 text-purple-500" />;
      case "challenge":
        return <Trophy className="h-5 w-5 text-red-500" />;
      case "event":
        return <Calendar className="h-5 w-5 text-cyan-500" />;
    }
  };
  
  const renderAvatar = () => {
    if (result.image) {
      return (
        <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
          <img src={result.image} alt={result.title} className="h-full w-full object-cover" />
        </div>
      );
    }
    
    if (result.type === "member") {
      const memberResult = result as any;
      return (
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={memberResult.avatar} alt={result.title} />
          <AvatarFallback>{result.title.charAt(0)}</AvatarFallback>
        </Avatar>
      );
    }
    
    if (result.type === "post" && (result as any).author?.avatar) {
      const postResult = result as any;
      return (
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={postResult.author.avatar} alt={postResult.author.name} />
          <AvatarFallback>{postResult.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
      );
    }
    
    return (
      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
        {getIcon()}
      </div>
    );
  };
  
  const renderMetadata = () => {
    switch (result.type) {
      case "group":
        return (
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3 w-3 mr-1" />
            <span>{(result as any).memberCount} members</span>
          </div>
        );
      
      case "channel":
        return (
          <div className="flex items-center text-xs text-muted-foreground">
            <span>in {(result as any).group.name}</span>
          </div>
        );
      
      case "post":
        return (
          <div className="flex items-center text-xs text-muted-foreground">
            <span>by {(result as any).author.name} • {(result as any).timestamp}</span>
          </div>
        );
      
      case "member":
        return (
          <div className="flex items-center text-xs text-muted-foreground">
            <span>@{(result as any).handle} • {(result as any).followers} followers</span>
          </div>
        );
      
      case "challenge":
        return (
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{(result as any).participants} participants • {(result as any).startDate.split('-')[1]}/{(result as any).startDate.split('-')[2]} - {(result as any).endDate.split('-')[1]}/{(result as any).endDate.split('-')[2]}</span>
          </div>
        );
      
      case "event":
        return (
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{(result as any).date.split('-')[1]}/{(result as any).date.split('-')[2]} • {(result as any).time} • {(result as any).attendees} attending</span>
          </div>
        );
    }
  };
  
  const handleClick = () => {
    navigate(result.linkTo);
  };
  
  return (
    <div 
      className="flex items-start gap-3 p-3 border-b cursor-pointer hover:bg-muted/20 transition-colors"
      onClick={handleClick}
    >
      {renderAvatar()}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {getIcon()}
          <div className="font-medium line-clamp-1">{result.title}</div>
        </div>
        
        {result.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
            {result.description}
          </p>
        )}
        
        <div className="mt-1">
          {renderMetadata()}
        </div>
      </div>
    </div>
  );
};
