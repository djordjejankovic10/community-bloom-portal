import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { X, Plus, Loader2, Camera, FileImage, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type MediaItem = {
  type: string;
  url: string;
  isLoading?: boolean;
};

export type MediaUploaderRef = {
  openMediaPicker: () => void;
};

interface MediaPickerProps {
  onSelect: (type: string) => void;
  onClose: () => void;
  iconPosition: { x: number; y: number } | null;
}

// Separate MediaPicker component for cleaner code
const MediaPicker = ({ onSelect, onClose, iconPosition }: MediaPickerProps) => {
  useEffect(() => {
    // Close picker when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".media-picker-menu")) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Calculate position style based on iconPosition
  const getPositionStyle = () => {
    if (!iconPosition) return {};
    
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Determine if we should position above or below the icon
    // For comments section at bottom of screen, position above
    const isNearBottom = viewportHeight - iconPosition.y < 200;
    
    // Base position - for bottom bar comments, position above the icon
    let top = isNearBottom 
      ? iconPosition.y - 160 // Position above icon for bottom comments
      : iconPosition.y + 10; // Position below icon for regular usage
      
    // Make sure it doesn't go offscreen
    top = Math.max(10, Math.min(viewportHeight - 170, top));
    
    // Horizontal position, ensure it doesn't go off right edge
    let left = iconPosition.x - 10;
    if (left + 180 > viewportWidth) {
      left = viewportWidth - 190;
    }
    
    return {
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 9999
    };
  };

  return (
    <div 
      className="media-picker-menu fixed shadow-lg rounded-lg border bg-background p-2 w-44"
      style={getPositionStyle() as React.CSSProperties}
    >
      <div className="flex flex-col gap-2">
        <Button 
          variant="ghost" 
          className="flex items-center justify-start"
          onClick={() => onSelect("photo")}
        >
          <FileImage className="w-4 h-4 mr-2" />
          <span>Photo Library</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex items-center justify-start"
          onClick={() => onSelect("camera")}
        >
          <Camera className="w-4 h-4 mr-2" />
          <span>Take Photo or Video</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex items-center justify-start"
          onClick={() => onSelect("file")}
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>Choose Files</span>
        </Button>
      </div>
    </div>
  );
};

interface MediaUploaderProps {
  mediaItems: MediaItem[];
  onChange: (items: MediaItem[]) => void;
  maxItems?: number;
  previewSize?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export const MediaUploader = forwardRef<MediaUploaderRef, MediaUploaderProps>(({
  mediaItems,
  onChange,
  maxItems = 6,
  previewSize = "md",
  disabled = false,
  className
}, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [iconPosition, setIconPosition] = useState<{ x: number; y: number } | null>(null);

  // Expose methods to parent component through ref
  useImperativeHandle(ref, () => ({
    openMediaPicker: () => {
      // Get position of the clicked icon from the active element
      const activeElement = document.activeElement;
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        setIconPosition({
          x: rect.left,
          y: rect.top
        });
      }
      setIsMediaPickerOpen(true);
    }
  }));

  // Get size class based on previewSize prop
  const getSizeClass = () => {
    switch(previewSize) {
      case "sm": return "w-16 h-16";
      case "lg": return "w-32 h-32";
      default: return "w-24 h-24";  // md (default)
    }
  };
  
  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any object URLs when the component unmounts
      mediaItems.forEach(item => {
        if (item.url) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [mediaItems]);

  const handleMediaSelect = (type: string) => {
    // For photo gallery, open the file picker
    if (type === "photo") {
      // Remove capture attribute if present
      if (fileInputRef.current) {
        fileInputRef.current.removeAttribute('capture');
        fileInputRef.current.setAttribute('accept', 'image/*');
        fileInputRef.current.setAttribute('multiple', 'multiple');
      }
      fileInputRef.current?.click();
    } else if (type === "camera") {
      // Set capture attribute to use the camera directly
      // For camera, we only want one photo at a time
      if (fileInputRef.current) {
        fileInputRef.current.setAttribute('capture', 'environment');
        fileInputRef.current.setAttribute('accept', 'image/*');
        fileInputRef.current.removeAttribute('multiple');
      }
      fileInputRef.current?.click();
    } else if (type === "video") {
      // Configure file input for video
      if (fileInputRef.current) {
        fileInputRef.current.removeAttribute('capture');
        fileInputRef.current.setAttribute('accept', 'video/*');
        fileInputRef.current.setAttribute('multiple', 'multiple');
      }
      fileInputRef.current?.click();
    }
    
    setIsMediaPickerOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Check if adding more files would exceed the limit
    if (mediaItems.length >= maxItems) {
      alert(`Maximum of ${maxItems} media items allowed`);
      return;
    }
    
    // Convert FileList to array and process each file
    const fileArray = Array.from(files);
    const validFiles = fileArray.slice(0, maxItems - mediaItems.length);
    
    // Create placeholder loading items first
    const loadingItems = validFiles.map(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      // Check if it's a valid file type
      if (!isImage && !isVideo) {
        return null;
      }
      
      // Check file size (max 10MB for images, 50MB for videos)
      const maxSize = isImage ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
      if (file.size > maxSize) {
        return null;
      }
      
      // Create loading placeholder items
      return {
        type: isImage ? "image" : "video",
        url: "", // Will be populated when loaded
        isLoading: true
      };
    }).filter(item => item !== null) as MediaItem[];
    
    // Add the loading placeholders immediately
    const updatedItems = [...mediaItems, ...loadingItems];
    onChange(updatedItems);
    
    // Process each file and update the items with actual URLs
    validFiles.forEach((file, index) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) return;
      
      // Create a URL for the selected file
      const fileUrl = URL.createObjectURL(file);
      
      // Simulate network delay for each file
      setTimeout(() => {
        // Find the index of this loading item in the current state
        const currentItems = [...updatedItems];
        const loadingItemIndex = mediaItems.length + index;
        
        // Update the item with the actual URL and remove loading state
        if (currentItems[loadingItemIndex]) {
          currentItems[loadingItemIndex] = {
            type: isImage ? "image" : "video",
            url: fileUrl,
            isLoading: false
          };
          onChange(currentItems);
        }
      }, 800);
    });
    
    // Reset the file input for future selections
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeMediaItem = (index: number) => {
    // Create a copy of the array
    const newItems = [...mediaItems];
    
    // Get the item to remove so we can revoke its URL
    const itemToRemove = newItems[index];
    if (itemToRemove && itemToRemove.url) {
      URL.revokeObjectURL(itemToRemove.url);
    }
    
    // Remove the item at the specified index
    newItems.splice(index, 1);
    onChange(newItems);
  };

  return (
    <div className={cn("", className)}>
      {/* Hidden file input for uploading media */}
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*"
        onChange={handleFileUpload}
        multiple
        disabled={disabled}
      />
      
      {/* No global loading indicator - we now use per-item loading states */}
      
      {/* Selected media preview - horizontally scrollable */}
      {mediaItems.length > 0 && (
        <div className="mb-2 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {mediaItems.map((media, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative rounded-lg overflow-hidden border flex-shrink-0",
                  getSizeClass()
                )}
              >
                {media.isLoading ? (
                  // Loading placeholder with spinner
                  <div className="w-full h-full flex items-center justify-center bg-muted/30">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : media.type === "image" ? (
                  <img 
                    src={media.url} 
                    alt={`Media ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="relative bg-muted w-full h-full">
                    <video 
                      src={media.url} 
                      className="w-full h-full object-contain" 
                      controls
                      preload="metadata"
                    />
                  </div>
                )}
                {!disabled && !media.isLoading && (
                  <button 
                    onClick={() => removeMediaItem(index)}
                    className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Media picker menu (rendered directly in the DOM) */}
      {isMediaPickerOpen && (
        <MediaPicker 
          onSelect={handleMediaSelect}
          onClose={() => setIsMediaPickerOpen(false)}
          iconPosition={iconPosition}
        />
      )}
    </div>
  );
}); 