import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export const NotificationBadge = ({ count, className }: NotificationBadgeProps) => {
  if (count <= 0) return null;
  
  const displayCount = count > 99 ? "99+" : count.toString();
  
  return (
    <div 
      className={cn(
        "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs min-w-[18px] h-[18px] px-1",
        className
      )}
    >
      {displayCount}
    </div>
  );
};
