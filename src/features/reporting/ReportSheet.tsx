import React, { useState } from "react";
import { BottomSheet } from "@/components/messages/BottomSheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportSheet = ({ isOpen, onClose }: ReportSheetProps) => {
  const [reportReason, setReportReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async () => {
    if (!reportReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for reporting this content.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call to submit the report
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe."
      });
      
      // Reset form and close sheet
      setReportReason("");
      onClose();
    } catch (error) {
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} className="p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Report Content</h2>
        
        <Textarea
          placeholder="Please explain why you're reporting this content..."
          className="min-h-[120px] resize-none"
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          disabled={isSubmitting}
          autoFocus
        />
        
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button 
            className="flex-1"
            onClick={handleSubmit}
            disabled={isSubmitting || !reportReason.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};
