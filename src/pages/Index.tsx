import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  console.log("Index page rendered");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-foreground">Welcome to Community Bloom</h1>
        <p className="text-xl text-muted-foreground">Connect, share, and grow with your community</p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/community")}
            className="w-full"
            size="lg"
          >
            Enter Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;