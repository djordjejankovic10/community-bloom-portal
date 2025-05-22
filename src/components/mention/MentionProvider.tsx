import React, { useState, useEffect, useRef, useCallback } from "react";
import { MentionBottomSheet } from "./MentionBottomSheet";
import { MentionContextMenu, MentionItem, MentionType } from "./MentionContextMenu";
import { useUIPreferences } from "@/context/UIPreferences";

interface MentionProviderProps {
  children: React.ReactNode;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  setContent: (content: string) => void;
  onMentionSelect?: (item: MentionItem) => void;
  mentions?: MentionItem[];
  forceContextMenu?: boolean;
}

// Enhanced mock data for mentions with roles
const DEFAULT_MENTIONS: MentionItem[] = [
  { id: 'member-1', type: 'member', title: 'John Smith', subtitle: '@johnsmith', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', role: 'Admin' },
  { id: 'member-2', type: 'member', title: 'Emma Davis', subtitle: '@emmafitness', image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=300&fit=crop', role: 'Moderator' },
  { id: 'member-3', type: 'member', title: 'Maya Patel', subtitle: '@recoverycoach', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=300&fit=crop' },
  { id: 'member-4', type: 'member', title: 'Alex Johnson', subtitle: '@alexfit', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop' },
  { id: 'member-5', type: 'member', title: 'Sam Rodriguez', subtitle: '@samr', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=300&fit=crop' },
  { id: 'member-6', type: 'member', title: 'Everyone', subtitle: '@everyone', role: 'Special' },
  { id: 'circle-1', type: 'circle', title: 'Weight Training', subtitle: '15k members' },
  { id: 'circle-2', type: 'circle', title: 'Yoga', subtitle: '8k members' },
  { id: 'circle-3', type: 'circle', title: 'Nutrition', subtitle: '12k members' },
  { id: 'lesson-1', type: 'lesson', title: 'Proper Squat Form', subtitle: 'Fundamentals of Weightlifting', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
  { id: 'course-1', type: 'course', title: 'Strength Training 101', subtitle: '8-week program', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=300&fit=crop' },
];

export function MentionProvider({
  children,
  textareaRef,
  content,
  setContent,
  onMentionSelect,
  mentions = DEFAULT_MENTIONS,
  forceContextMenu = false
}: MentionProviderProps) {
  const { useMentionContextMenu: userPreference } = useUIPreferences();
  
  // Use context menu if forced or if user prefers it
  const useMentionContextMenu = forceContextMenu || userPreference;
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [mentionedContent, setMentionedContent] = useState<MentionItem[]>([]);
  const [atCharPosition, setAtCharPosition] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect @ symbol for mentions
  useEffect(() => {
    const mentionMatch = content.match(/@(\w*)$/);
    
    if (mentionMatch) {
      // Found a mention at the end of the text
      setMentionSearch(mentionMatch[1]);
      
      // Get position of the text caret
      if (textareaRef.current) {
        const pos = textareaRef.current.selectionStart;
        const matchStartPos = pos - mentionMatch[0].length;
        
        setAtCharPosition(matchStartPos);
        
        // Calculate position for context menu if that mode is active
        if (useMentionContextMenu) {
          calculateMenuPosition();
        }
        
        setIsMentionOpen(true);
      }
    } else {
      // No mention being typed, close the menu
      setIsMentionOpen(false);
      setAtCharPosition(null);
      setMenuPosition(null);
    }
  }, [content, useMentionContextMenu]);

  // With the new fixed positioning in the center of the screen,
  // we don't need to calculate position based on the @ symbol
  const calculateMenuPosition = () => {
    // We're now using fixed positioning in the MentionContextMenu component
    // No need to calculate position here
    setMenuPosition({ x: 0, y: 0 }); // These values aren't used anymore
  };

  // Filter mentions based on search query
  const getFilteredMentions = useCallback(() => {
    const searchLower = mentionSearch.toLowerCase();
    
    // Apply different filtering logic based on search length
    if (searchLower.length <= 2) {
      // For 1-2 characters, do direct name matching
      return mentions.filter(mention => 
        mention.title.toLowerCase().includes(searchLower) ||
        (mention.subtitle && mention.subtitle.toLowerCase().includes(searchLower))
      );
    } else {
      // For 3+ characters, do full text search
      return mentions.filter(mention => 
        mention.title.toLowerCase().includes(searchLower) ||
        (mention.subtitle && mention.subtitle.toLowerCase().includes(searchLower)) ||
        mention.type.toLowerCase().includes(searchLower)
      );
    }
  }, [mentionSearch, mentions]);

  // Handle selecting a mention item
  const handleSelectMention = (item: MentionItem) => {
    // Add the selected mention to the list of mentioned content
    if (onMentionSelect) {
      onMentionSelect(item);
    }
    
    setMentionedContent(prev => [...prev, item]);
    
    // Replace the @ with the mention text in the content
    if (textareaRef.current && atCharPosition !== null) {
      const textBefore = content.substring(0, atCharPosition);
      const textAfter = content.substring(textareaRef.current.selectionStart);
      
      // Format varies by type
      let mentionText = '';
      if (item.type === 'member') {
        mentionText = `@${item.subtitle?.replace('@', '')} `;
      } else {
        mentionText = `@${item.title} `;
      }
      
      // Add the mention with a space after it
      const newContent = textBefore + mentionText + textAfter;
      setContent(newContent);
      
      // Close the mention menu
      setIsMentionOpen(false);
      setMentionSearch('');
      setAtCharPosition(null);
      setMenuPosition(null);
      
      // Move cursor after the inserted mention
      const newPosition = textBefore.length + mentionText.length;
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = newPosition;
          textareaRef.current.selectionEnd = newPosition;
        }
      }, 10);
    }
  };

  // Function to manually trigger mention menu
  const triggerMention = () => {
    // Focus the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
      
      const currentPosition = textareaRef.current.selectionStart;
      const textBefore = content.substring(0, currentPosition);
      const textAfter = content.substring(currentPosition);
      
      // Insert @ at cursor position if not already there
      if (!textBefore.endsWith('@')) {
        // Insert the @ symbol
        setContent(textBefore + '@' + textAfter);
        
        // Store the position of the @ character
        setAtCharPosition(currentPosition);
        
        // Using a timeout to ensure state updates have happened
        setTimeout(() => {
          // Move cursor position after the @ symbol
          if (textareaRef.current) {
            const newCursorPos = currentPosition + 1;
            textareaRef.current.selectionStart = newCursorPos;
            textareaRef.current.selectionEnd = newCursorPos;
            
            // Calculate position for context menu if that mode is active
            if (useMentionContextMenu) {
              calculateMenuPosition();
            }
            
            // Open the mention menu
            setIsMentionOpen(true);
          }
        }, 50);
      } else {
        // If @ is already at cursor, just open the menu
        setIsMentionOpen(true);
        
        // Calculate position for context menu if that mode is active
        if (useMentionContextMenu) {
          calculateMenuPosition();
        }
      }
    }
  };

  return (
    <>
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
      
      {/* Render appropriate mention UI based on preference or forced context menu */}
      {useMentionContextMenu ? (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <MentionContextMenu
            isOpen={isMentionOpen}
            onClose={() => setIsMentionOpen(false)}
            onSelect={handleSelectMention}
            suggestions={getFilteredMentions()}
            position={menuPosition}
            searchTerm={mentionSearch}
          />
        </div>
      ) : (
        <MentionBottomSheet
          isOpen={isMentionOpen}
          onClose={() => setIsMentionOpen(false)}
          search={mentionSearch}
          onSearchChange={setMentionSearch}
          mentions={getFilteredMentions()}
          onSelect={handleSelectMention}
        />
      )}
    </>
  );
}

export function useMention() {
  const [mentionTriggerRef, setMentionTriggerRef] = useState<(() => void) | null>(null);
  
  const registerMentionTrigger = (trigger: () => void) => {
    setMentionTriggerRef(() => trigger);
  };
  
  const triggerMention = () => {
    if (mentionTriggerRef) {
      mentionTriggerRef();
    }
  };
  
  return {
    registerMentionTrigger,
    triggerMention
  };
}
