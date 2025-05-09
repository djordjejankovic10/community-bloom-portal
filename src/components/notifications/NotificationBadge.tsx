import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export const NotificationBadge = ({ count, className }: NotificationBadgeProps) => {
  if (count <= 0) return null;
  
  return (
    <div 
      className={cn(
        "absolute top-0 right-0 flex items-center justify-center rounded-full bg-red-500 w-3 h-3 border-2 border-[#28292D] translate-x-1/4 translate-y-0",
        className
      )}
    >
      {/* No number displayed */}
    </div>
  );
};
