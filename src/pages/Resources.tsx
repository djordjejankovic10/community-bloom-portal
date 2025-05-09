import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, Dumbbell, Heart, StretchVertical, Apple, Battery } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Resources = () => {
  const resources = [
    {
      category: "weight-training",
      items: [
        {
          type: "article",
          title: "The Complete Guide to Progressive Overload",
          description: "Learn how to gradually increase the stress placed on your muscles to promote growth and strength gains.",
          source: "ES Fitness Blog",
          date: "May 15, 2023",
          url: "#",
          image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&h=300&fit=crop"
        },
        {
          type: "video",
          title: "Perfect Form: The Big 5 Compound Lifts",
          description: "Detailed walkthrough of proper form for squats, deadlifts, bench press, overhead press, and rows.",
          duration: "32 min",
          source: "ES Fitness YouTube",
          url: "#",
          image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=300&fit=crop"
        },
        {
          type: "pdf",
          title: "8-Week Hypertrophy Program for Beginners",
          description: "A complete workout plan designed to build muscle mass for those new to resistance training.",
          pages: 24,
          source: "ES Fitness Premium",
          url: "#"
        }
      ]
    },
    {
      category: "cardio",
      items: [
        {
          type: "article",
          title: "The Benefits of Zone 2 Training",
          description: "Understanding low-intensity cardio and its impact on cardiovascular health and fat metabolism.",
          source: "ES Fitness Blog",
          date: "June 3, 2023",
          url: "#",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop"
        },
        {
          type: "video",
          title: "30-Minute HIIT Workout - No Equipment Needed",
          description: "High-intensity interval training to boost cardio fitness and burn calories.",
          duration: "30 min",
          source: "ES Fitness YouTube",
          url: "#",
          image: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=600&h=300&fit=crop"
        },
        {
          type: "pdf",
          title: "Beginner's Guide to Running",
          description: "From couch to 5K - a step-by-step guide for new runners.",
          pages: 18,
          source: "ES Fitness Premium",
          url: "#"
        }
      ]
    },
    {
      category: "yoga",
      items: [
        {
          type: "article",
          title: "Yoga for Strength Athletes",
          description: "How yoga can complement your strength training and improve overall athletic performance.",
          source: "ES Fitness Blog",
          date: "July 11, 2023",
          url: "#",
          image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=300&fit=crop"
        },
        {
          type: "video",
          title: "20-Minute Morning Yoga Flow",
          description: "Start your day with this energizing sequence to improve flexibility and focus.",
          duration: "20 min",
          source: "ES Fitness YouTube",
          url: "#",
          image: "https://images.unsplash.com/photo-1593164842264-854604db2260?w=600&h=300&fit=crop"
        },
        {
          type: "pdf",
          title: "Yoga Poses for Recovery",
          description: "A guide to restorative yoga poses to help with muscle recovery and stress reduction.",
          pages: 15,
          source: "ES Fitness Premium",
          url: "#"
        }
      ]
    },
    {
      category: "nutrition",
      items: [
        {
          type: "article",
          title: "Protein Intake: How Much Do You Really Need?",
          description: "Evidence-based recommendations for protein consumption based on activity level and goals.",
          source: "ES Fitness Blog",
          date: "August 5, 2023",
          url: "#",
          image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=600&h=300&fit=crop"
        },
        {
          type: "video",
          title: "Meal Prep 101: A Week of Healthy Meals",
          description: "Step-by-step guide to preparing nutritious meals for an entire week in under 2 hours.",
          duration: "45 min",
          source: "ES Fitness YouTube",
          url: "#",
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=300&fit=crop"
        },
        {
          type: "pdf",
          title: "Complete Nutrition Guide for Fitness",
          description: "Understanding macros, micros, meal timing, and supplements for optimal performance.",
          pages: 32,
          source: "ES Fitness Premium",
          url: "#"
        }
      ]
    },
    {
      category: "recovery",
      items: [
        {
          type: "article",
          title: "The Science of Sleep and Athletic Performance",
          description: "How sleep quality and quantity affects your workouts, recovery, and progress.",
          source: "ES Fitness Blog",
          date: "September 12, 2023",
          url: "#",
          image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=600&h=300&fit=crop"
        },
        {
          type: "video",
          title: "Foam Rolling Masterclass",
          description: "Learn proper foam rolling techniques to reduce muscle tension and improve mobility.",
          duration: "25 min",
          source: "ES Fitness YouTube",
          url: "#",
          image: "https://images.unsplash.com/photo-1570655652364-2e0a67455ac6?w=600&h=300&fit=crop"
        },
        {
          type: "pdf",
          title: "Recovery Strategies for Enhanced Performance",
          description: "A complete guide to active and passive recovery methods for athletes of all levels.",
          pages: 22,
          source: "ES Fitness Premium",
          url: "#"
        }
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "weight-training":
        return <Dumbbell className="h-5 w-5" />;
      case "cardio":
        return <Heart className="h-5 w-5" />;
      case "yoga":
        return <StretchVertical className="h-5 w-5" />;
      case "nutrition":
        return <Apple className="h-5 w-5" />;
      case "recovery":
        return <Battery className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "pdf":
        return <BookOpen className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <CommunityHeader />
      <CommunityTabs activeFilter="all" onFilterChange={() => {}} showFilters={false} />
      
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Fitness Resources</h1>
          <p className="text-muted-foreground">
            Explore our curated collection of articles, videos, and guides to support your fitness journey.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {resources.map((category, index) => (
              <div key={index} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  {getCategoryIcon(category.category)}
                  <h2 className="text-2xl font-bold capitalize">{category.category.replace("-", " ")}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex}>
                      {item.image && (
                        <div className="w-full h-40 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getResourceIcon(item.type)}
                            <span className="capitalize">{item.type}</span>
                          </Badge>
                          {item.duration && (
                            <Badge variant="secondary">{item.duration}</Badge>
                          )}
                          {item.pages && (
                            <Badge variant="secondary">{item.pages} pages</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="flex justify-between">
                          <span>{item.source}</span>
                          {item.date && <span>{item.date}</span>}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View {item.type}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {index < resources.length - 1 && (
                  <Separator className="my-8" />
                )}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.flatMap(category => 
                category.items.filter(item => item.type === "article")
              ).map((item, index) => (
                <Card key={index}>
                  {item.image && (
                    <div className="w-full h-40 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit mb-2">
                      <FileText className="h-5 w-5" />
                      <span>Article</span>
                    </Badge>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="flex justify-between">
                      <span>{item.source}</span>
                      {item.date && <span>{item.date}</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Read Article
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.flatMap(category => 
                category.items.filter(item => item.type === "video")
              ).map((item, index) => (
                <Card key={index}>
                  {item.image && (
                    <div className="w-full h-40 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-background/80 hover:bg-background/90">
                          <Video className="h-6 w-6" />
                        </Button>
                      </div>
                      {item.duration && (
                        <Badge className="absolute bottom-2 right-2 bg-black/70">{item.duration}</Badge>
                      )}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.source}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Watch Video
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.flatMap(category => 
                category.items.filter(item => item.type === "pdf")
              ).map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <BookOpen className="h-5 w-5" />
                        <span>Guide</span>
                      </Badge>
                      {item.pages && (
                        <Badge variant="secondary">{item.pages} pages</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.source}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Download Guide
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources; 