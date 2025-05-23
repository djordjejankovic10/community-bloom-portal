import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const navigate = useNavigate();

  return (
    <div className="py-3 px-4 border-b">
      <div className="flex gap-2 items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
          <AvatarFallback>DJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <input
            type="text"
            placeholder="What's new?"
            className="w-full h-12 py-2 px-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm cursor-pointer"
            onClick={() => navigate("/community/post/create")}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};