import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  Image, 
  AtSign, 
  Sparkles, 
  FileText, 
  X,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Code,
  Paperclip
} from "lucide-react";

interface ComposerToolbarProps {
  isRichTextOpen: boolean;
  setIsRichTextOpen: (open: boolean) => void;
  activeFormats: Set<string>;
  onFormatting: (formatType: string) => void;
  onMediaUpload: () => void;
  onAttachFile: () => void;
  onMentionClick: () => void;
  onAIClick: () => void;
  onEmbedClick: () => void;
  // Link dialog props
  isLinkDialogOpen: boolean;
  linkText: string;
  linkUrl: string;
  setLinkText: (text: string) => void;
  setLinkUrl: (url: string) => void;
  onLinkCancel: () => void;
  onLinkSave: () => void;
  // Embed dialog props
  isEmbedDialogOpen: boolean;
  embedContent: string;
  setEmbedContent: (content: string) => void;
  onEmbedCancel: () => void;
  onEmbedSave: () => void;
}

/**
 * Reusable ComposerToolbar component for consistent formatting across post and reply composers
 * 
 * UX Notes:
 * - Maintains consistency between different composer interfaces
 * - Provides seamless toggle between core tools and rich text formatting
 * - Mobile-optimized with touch-friendly buttons
 * - Clear visual distinction between active and inactive formatting states
 */
export const ComposerToolbar: React.FC<ComposerToolbarProps> = ({
  isRichTextOpen,
  setIsRichTextOpen,
  activeFormats,
  onFormatting,
  onMediaUpload,
  onAttachFile,
  onMentionClick,
  onAIClick,
  onEmbedClick,
  isLinkDialogOpen,
  linkText,
  linkUrl,
  setLinkText,
  setLinkUrl,
  onLinkCancel,
  onLinkSave,
  isEmbedDialogOpen,
  embedContent,
  setEmbedContent,
  onEmbedCancel,
  onEmbedSave,
}) => {
  return (
    <>
      <div className="flex justify-between px-3 py-3 w-full shrink-0 bg-background">
        {!isRichTextOpen ? (
          // Core toolbar
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={onMediaUpload}
            >
              <Image className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={onAttachFile}
              aria-label="Attach file"
              title="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => setIsRichTextOpen(true)}
            >
              <span className="text-base font-semibold">Aa</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={onMentionClick}
            >
              <AtSign className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={onAIClick}
            >
              <Sparkles className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={onEmbedClick}
            >
              <Code className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          // Rich text formatting toolbar
          <div className="flex gap-4 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-primary/10"
              onClick={() => setIsRichTextOpen(false)}
            >
              <X className="h-5 w-5 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-full",
                activeFormats.has('bold') && "bg-primary text-primary-foreground"
              )}
              onClick={() => onFormatting('bold')}
            >
              <Bold className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-full",
                activeFormats.has('italic') && "bg-primary text-primary-foreground"
              )}
              onClick={() => onFormatting('italic')}
            >
              <Italic className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-full",
                activeFormats.has('underline') && "bg-primary text-primary-foreground"
              )}
              onClick={() => onFormatting('underline')}
            >
              <Underline className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-full",
                activeFormats.has('strikethrough') && "bg-primary text-primary-foreground"
              )}
              onClick={() => onFormatting('strikethrough')}
            >
              <Strikethrough className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => onFormatting('bulletList')}
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => onFormatting('numberedList')}
            >
              <ListOrdered className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => onFormatting('link')}
            >
              <Link className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Link Dialog */}
      {isLinkDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-background rounded-2xl w-full max-w-sm mx-4 shadow-xl">
            {/* Header */}
            <div className="px-6 py-4 border-b text-center">
              <h3 className="text-lg font-semibold">Add Link</h3>
            </div>
            
            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <Input
                  placeholder="Text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  placeholder="Link"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full"
                  type="url"
                />
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex border-t">
              <Button
                variant="ghost"
                className="flex-1 h-12 rounded-none border-r text-primary"
                onClick={onLinkCancel}
              >
                Cancel
              </Button>
              <Button
                variant="ghost"
                className="flex-1 h-12 rounded-none text-primary font-semibold"
                onClick={onLinkSave}
                disabled={!linkUrl.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Embed Dialog */}
      {isEmbedDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-background rounded-2xl w-full max-w-md mx-4 shadow-xl">
            {/* Header */}
            <div className="px-6 py-4 border-b text-center">
              <h3 className="text-lg font-semibold">Embed Content</h3>
            </div>
            
            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <Textarea
                  placeholder="Paste a URL (e.g., YouTube, Twitter, Instagram)"
                  value={embedContent}
                  onChange={(e) => setEmbedContent(e.target.value)}
                  className="w-full min-h-[100px] resize-none"
                  rows={4}
                />
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex border-t">
              <Button
                variant="ghost"
                className="flex-1 h-12 rounded-none border-r text-primary"
                onClick={onEmbedCancel}
              >
                Cancel
              </Button>
              <Button
                variant="ghost"
                className="flex-1 h-12 rounded-none text-primary font-semibold"
                onClick={onEmbedSave}
                disabled={!embedContent.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 