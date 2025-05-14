import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bottomSheetVariants = cva(
  "fixed inset-x-0 bottom-0 z-50 flex flex-col bg-background/100 border-t rounded-t-[20px] shadow-lg transition-all duration-300 ease-in-out transform",
  {
    variants: {
      variant: {
        default: "",
        floating: "mx-4 mb-4 shadow-xl",
      },
      size: {
        default: "h-[85vh]",
        sm: "h-[50vh]",
        lg: "h-[95vh]",
        full: "h-screen rounded-t-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BottomSheetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bottomSheetVariants> {
  open?: boolean;
  onClose?: () => void;
}

/**
 * A bottom sheet component for mobile interfaces
 * 
 * UX Notes:
 * - The bottom sheet appears from the bottom of the screen with a smooth animation
 * - Used for secondary actions and focused content entry like replies
 * - Includes a prominent drag handle for intuitive mobile interaction
 * - Contains a close button in the top-right corner
 * - Follows patterns from popular social apps for familiar UX
 */
const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ className, children, variant, size, open, onClose, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    const handleClose = () => {
      setIsOpen(false);
      if (onClose) {
        // Small delay to allow animation to complete
        setTimeout(onClose, 300); 
      }
    };

    if (!isOpen) {
      return null;
    }

    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out"
          onClick={handleClose}
        />

        {/* Bottom Sheet */}
        <div
          ref={ref}
          className={cn(
            bottomSheetVariants({ variant, size }),
            isOpen ? "translate-y-0" : "translate-y-full",
            className
          )}
          {...props}
        >
          {/* Prominent drag handle */}
          <div className="flex justify-center p-2 pt-3">
            <div className="w-16 h-1.5 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 pt-0">
            {children}
          </div>
        </div>
      </>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

export { BottomSheet }; 