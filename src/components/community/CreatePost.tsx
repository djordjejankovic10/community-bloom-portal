import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Image, Camera, Mic, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CreatePost = () => {
  return (
    <div className="p-4 border-b">
      <div className="flex gap-3 items-start">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
          <AvatarFallback>DJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <input
            type="text"
            placeholder="What's new?"
            className="w-full p-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
          />
          <div className="flex gap-1 mt-2">
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
        </div>
      </div>
    </div>
  );
};