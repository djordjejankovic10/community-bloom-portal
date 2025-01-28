import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Image, Camera, Mic, LineChart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const CIRCLES = [
  "General",
  "Weight Training",
  "Cardio",
  "Yoga",
  "Nutrition",
  "Recovery",
];

interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PostDialog = ({ open, onOpenChange }: PostDialogProps) => {
  const [content, setContent] = useState("");
  const [selectedCircle, setSelectedCircle] = useState(CIRCLES[0]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-0 w-full h-full p-0 max-w-none rounded-none">
        <div className="flex items-center justify-between border-b p-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="font-semibold">New note</div>
          <Button
            size="sm"
            className="rounded-full px-6"
            disabled={!content.trim()}
          >
            Post
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
            <textarea
              placeholder="What's on your mind?"
              className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Image className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Camera className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <LineChart className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>

          <Tabs value={selectedCircle} onValueChange={setSelectedCircle}>
            <TabsList className="w-full justify-start">
              {CIRCLES.map((circle) => (
                <TabsTrigger key={circle} value={circle} className="text-xs">
                  {circle}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};