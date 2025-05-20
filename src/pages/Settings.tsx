import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MentionToggle } from "@/components/settings/MentionToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center justify-between border-b p-3 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="font-semibold">Settings</div>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>UI Preferences</CardTitle>
            <CardDescription>
              Customize how the app interface behaves
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MentionToggle />
            
            <Separator className="my-2" />
            
            <div className="text-sm text-muted-foreground">
              <p>Toggle between two different @mention menu styles:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Bottom sheet (slides up from bottom)</li>
                <li>Contextual menu (appears near cursor)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
