import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUIPreferences } from "@/context/UIPreferences";

export function MentionToggle() {
  const { useMentionContextMenu, setUseMentionContextMenu } = useUIPreferences();

  return (
    <div className="flex items-center">
      <p className="text-xs text-muted-foreground mr-3">
        {useMentionContextMenu 
          ? "Contextual" 
          : "Bottom sheet"}
      </p>
      <Switch
        id="mention-toggle"
        checked={useMentionContextMenu}
        onCheckedChange={setUseMentionContextMenu}
      />
    </div>
  );
}
