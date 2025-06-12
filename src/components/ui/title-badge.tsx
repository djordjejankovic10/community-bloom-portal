import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TitleBadgeProps {
  title: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  icon: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * TitleBadge Component
 * 
 * Displays gamification title badges earned by users through various achievements.
 * These badges appear next to user names in posts and comments to show their 
 * accomplishments and engagement level within the community.
 * 
 * UX Notes:
 * - Users feel recognition and pride when their badges are displayed
 * - Creates aspirational motivation for other users to earn badges
 * - Helps identify accomplished community members at a glance
 * - Bronze tier provides entry-level achievement recognition
 * - Higher tiers (silver, gold, platinum, diamond) show progression
 */
export const TitleBadge: React.FC<TitleBadgeProps> = ({ 
  title, 
  tier, 
  icon, 
  size = "sm",
  className 
}) => {
  const sizeStyles = {
    sm: "text-[9px] px-1 py-0 h-4",
    md: "text-[10px] px-2 py-0.5 h-5", 
    lg: "text-xs px-2 py-1 h-6"
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "bg-accent/50 flex items-center gap-1 font-medium",
        sizeStyles[size],
        className
      )}
    >
      <span className={iconSizes[size]}>{icon}</span>
      <span className="font-semibold">{title}</span>
      <span className="uppercase font-bold opacity-75">{tier}</span>
    </Badge>
  );
}; 