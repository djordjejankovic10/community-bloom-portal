import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, Loader2, X, RotateCcw, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { BottomSheet } from "@/components/messages/BottomSheet";

interface AIBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuggestionSelect?: (suggestion: string) => void;
  // For post creation
  aiGeneratedContent?: string;
  aiNotes?: string;
  isGenerating?: boolean;
  onAISubmit?: () => void;
  onRegenerateContent?: () => void;
  onConfirmContent?: () => void;
  onNotesChange?: (notes: string) => void;
  mode?: 'message' | 'post';
}

export const AIBottomSheet = ({ 
  isOpen, 
  onClose,
  onSuggestionSelect,
  aiGeneratedContent,
  aiNotes = "",
  isGenerating = false,
  onAISubmit,
  onRegenerateContent,
  onConfirmContent,
  onNotesChange,
  mode = 'message'
}: AIBottomSheetProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock suggestions - in a real app, these would come from an AI API
  const mockSuggestions = [
    "Hey, how's your day going?",
    "I was wondering if you'd like to meet up this weekend?",
    "Have you seen the latest community event?",
    "What do you think about the new feature?",
    "I'd love to hear your thoughts on the project."
  ];

  const generateSuggestions = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
      onClose();
      setPrompt("");
      setSuggestions([]);
    }
  };

  // Render message composer AI assistant
  const renderMessageAI = () => (
    <div className="p-4 space-y-4 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-center flex-1">AI Message Assistant</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <Textarea
          placeholder="What would you like to say? AI will help craft your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] resize-none text-base w-full"
        />
        <div className="flex justify-end">
          <Button 
            onClick={generateSuggestions}
            disabled={isLoading}
            className="gap-2 px-4 py-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate suggestions
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-muted-foreground text-sm">Generating suggestions...</p>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Suggestions</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors flex justify-between items-center group"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <p className="text-sm">{suggestion}</p>
                <Send className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );

  // Render post creation AI assistant
  const renderPostAI = () => (
    <div className="bg-background">
      <div className="flex justify-between items-center p-3 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="text-sm font-medium">AI Assistant</div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* AI generated content display */}
      {aiGeneratedContent && (
        <div className="p-3 border-b">
          <div className="text-sm font-medium mb-1">Generated Content</div>
          <div className="p-2 rounded bg-muted/30 text-sm">
            {aiGeneratedContent}
          </div>
          <div className="flex gap-2 mt-2 justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1"
              onClick={onRegenerateContent}
              disabled={isGenerating}
            >
              <RotateCcw className="h-3 w-3" />
              Regenerate
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="h-8 gap-1"
              onClick={onConfirmContent}
            >
              <CheckCircle className="h-3 w-3" />
              Use This
            </Button>
          </div>
        </div>
      )}
      
      <div className="p-3">
        <div className="text-sm font-medium mb-1">
          {aiGeneratedContent ? "Edit Your Notes" : "Outline Your Thoughts"}
        </div>
        <Textarea
          placeholder="Outline your thoughts in brief notes"
          className="min-h-[100px] resize-none"
          value={aiNotes}
          onChange={(e) => onNotesChange?.(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <Button 
            onClick={onAISubmit} 
            disabled={isGenerating || !aiNotes?.trim()}
            className="gap-1"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                {aiGeneratedContent ? "Update" : "Generate"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} className="h-[90vh]">
      {mode === 'message' ? renderMessageAI() : renderPostAI()}
    </BottomSheet>
  );
};
