import React, { useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, BookOpen, Calendar, Trophy, Users, UserCircle, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type MentionType = 'lesson' | 'course' | 'module' | 'meetup' | 'challenge' | 'circle' | 'member';

export type MentionItem = {
  id: string;
  type: MentionType;
  title: string;
  subtitle?: string;
  image?: string;
  role?: string; // Added role for badge display
};

interface MentionContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MentionItem) => void;
  suggestions: MentionItem[];
  position: { x: number; y: number } | null;
  searchTerm: string;
}

export const MentionContextMenu: React.FC<MentionContextMenuProps> = ({
  isOpen,
  onClose,
  onSelect,
  suggestions,
  position,
  searchTerm
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Helper function to calculate viewport center position
  const getViewportCenterPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    return {
      x: (viewportWidth - 264) / 2, // 264px is the width of the menu (w-64 = 16rem = 256px + 8px for borders)
      y: viewportHeight / 2 - 100 // Position it slightly above center
    };
  };

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Get icon for each type
  const getTypeIcon = (type: MentionType) => {
    switch (type) {
      case 'lesson':
        return <Video className="h-3 w-3" />;
      case 'course':
        return <BookOpen className="h-3 w-3" />;
      case 'module':
        return <Book className="h-3 w-3" />;
      case 'meetup':
        return <Calendar className="h-3 w-3" />;
      case 'challenge':
        return <Trophy className="h-3 w-3" />;
      case 'circle':
        return <Users className="h-3 w-3" />;
      case 'member':
        return <UserCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute z-50 bg-background border rounded-md shadow-lg overflow-y-auto pointer-events-auto"
      style={{
        top: '135px', // Position in the red box area
        left: '100px', // Position in the red box area
        width: '80%', // Take up most of the width
        maxWidth: '280px', // Maximum width
        maxHeight: '300px' // Maximum height
      }}
    >
      {suggestions.length > 0 ? (
        <div className="py-1">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-muted cursor-pointer"
              onClick={() => onSelect(item)}
            >
              {item.type === 'member' ? (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.image} alt={item.title} />
                  <AvatarFallback>{item.title[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-6 w-6 flex items-center justify-center bg-primary/10 rounded-full">
                  {getTypeIcon(item.type)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium truncate">{item.title}</span>
                  {item.role && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0 h-4">
                      {item.role}
                    </Badge>
                  )}
                </div>
                {item.subtitle && (
                  <div className="text-xs text-muted-foreground truncate">{item.subtitle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 text-center text-sm text-muted-foreground">
          No matches found for "{searchTerm}"
        </div>
      )}
    </div>
  );
}
