import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Image, Camera, Mic, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const navigate = useNavigate();

  return (
    <div className="py-2 px-4 border-b">
      <div className="flex gap-2 items-start">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
          <AvatarFallback>DJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <input
            type="text"
            placeholder="What's new?"
            className="w-full py-1.5 px-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm cursor-pointer"
            onClick={() => navigate("/community/post/create")}
            readOnly
          />
          <div className="flex gap-1 mt-1">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Image className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Camera className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <LineChart className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};