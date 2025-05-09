import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Heart, Medal, Users } from "lucide-react";

const Welcome = () => {
  return (
    <div>
      <CommunityHeader />
      <CommunityTabs activeFilter="all" onFilterChange={() => {}} showFilters={false} />
      
      <div className="p-4 space-y-6">
        <section className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Welcome to ES Fitness Community!</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our supportive community of fitness enthusiasts, from beginners to experts.
              Connect, learn, and grow with like-minded individuals on your health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Connect with Others
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Find workout partners, mentors, and friends who share your fitness goals and interests.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Community Members
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Join the Conversation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Share your journey, ask questions, and offer advice in our community discussions.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Go to Feed
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-primary" />
                  Take on Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Push yourself with our community challenges and celebrate achievements together.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Challenges
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Get Inspired
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Discover success stories and transformations from members who've achieved their goals.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Success Stories
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Meet Our Community Leaders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                name: "John Smith",
                role: "Fitness Coach",
                avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
                bio: "Certified personal trainer specializing in strength and conditioning."
              },
              {
                name: "Sarah Johnson",
                role: "Nutritionist",
                avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
                bio: "Helping members achieve balanced nutrition to support their fitness goals."
              },
              {
                name: "Mark Davis",
                role: "Yoga Instructor",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                bio: "Bringing mindfulness and flexibility training to the community."
              }
            ].map((leader, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={leader.avatar} />
                    <AvatarFallback>{leader.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{leader.name}</CardTitle>
                    <CardDescription>{leader.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li className="text-base">
              <span className="font-medium">Complete your profile</span> - Add a photo and share your fitness interests to connect with like-minded members.
            </li>
            <li className="text-base">
              <span className="font-medium">Join a challenge</span> - Push yourself with our community fitness challenges.
            </li>
            <li className="text-base">
              <span className="font-medium">Attend a meetup</span> - Connect with community members at local fitness events.
            </li>
            <li className="text-base">
              <span className="font-medium">Share your journey</span> - Post updates, questions, and achievements on the community feed.
            </li>
            <li className="text-base">
              <span className="font-medium">Explore resources</span> - Check out our curated collection of articles, videos, and tools.
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Welcome; 