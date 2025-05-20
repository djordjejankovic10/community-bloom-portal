import React from "react";
import { Search, Video, BookOpen, Book, Calendar, Trophy, Users, UserCircle } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Badge } from "@/components/ui/badge";
import { MentionItem, MentionType } from "./MentionContextMenu";

interface MentionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  mentions: MentionItem[];
  onSelect: (item: MentionItem) => void;
}

export function MentionBottomSheet({
  isOpen,
  onClose,
  search,
  onSearchChange,
  mentions,
  onSelect
}: MentionBottomSheetProps) {
  // Group mentions by type
  const groupedMentions = mentions.reduce((groups, mention) => {
    const type = mention.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(mention);
    return groups;
  }, {} as Record<MentionType, MentionItem[]>);

  // Sort group keys by predefined order
  const typeOrder: MentionType[] = ['member', 'course', 'lesson', 'module', 'meetup', 'challenge', 'circle'];
  const sortedGroups = Object.keys(groupedMentions)
    .sort((a, b) => {
      const aIndex = typeOrder.indexOf(a as MentionType);
      const bIndex = typeOrder.indexOf(b as MentionType);
      return aIndex - bIndex;
    }) as MentionType[];

  // Format type label for display
  const formatTypeLabel = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1) + 's';
  };

  // Get icon for each type
  const getTypeIcon = (type: MentionType) => {
    switch (type) {
      case 'lesson':
        return <Video className="h-4 w-4" />;
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'module':
        return <Book className="h-4 w-4" />;
      case 'meetup':
        return <Calendar className="h-4 w-4" />;
      case 'challenge':
        return <Trophy className="h-4 w-4" />;
      case 'circle':
        return <Users className="h-4 w-4" />;
      case 'member':
        return <UserCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <BottomSheet open={isOpen} onClose={onClose} className="max-h-[70vh]">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Mention</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search area */}
        <div className="sticky top-0 bg-background mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        
        {/* Results */}
        <div className="overflow-y-auto">
          {mentions.length > 0 ? (
            <div className="space-y-4">
              {sortedGroups.map(type => (
                <div key={type} className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1 px-2 flex items-center gap-1">
                    {getTypeIcon(type)}
                    {formatTypeLabel(type)}
                  </h3>
                  {groupedMentions[type].map((mention) => (
                    <Button
                      key={mention.id}
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 h-auto"
                      onClick={() => onSelect(mention)}
                    >
                      <div className="flex items-center gap-3">
                        {mention.image ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={mention.image} alt={mention.title} />
                            <AvatarFallback>{mention.title[0]}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary">{mention.title[0]}</span>
                          </div>
                        )}
                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium">{mention.title}</span>
                            {mention.role && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0 h-4">
                                {mention.role}
                              </Badge>
                            )}
                          </div>
                          {mention.subtitle && (
                            <div className="text-xs text-muted-foreground">{mention.subtitle}</div>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No matches found
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
