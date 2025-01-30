import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  image: string;
  count?: string;
};

const CATEGORIES: Category[] = [
  {
    id: "all",
    name: "All",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
    count: "99+"
  },
  {
    id: "weight-training",
    name: "Weight Training",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
    count: "23"
  },
  {
    id: "cardio",
    name: "Cardio",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=400&fit=crop",
    count: "45"
  },
  {
    id: "yoga",
    name: "Yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
  },
  {
    id: "nutrition",
    name: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop",
    count: "78"
  },
  {
    id: "recovery",
    name: "Recovery",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=400&fit=crop",
    count: "12"
  }
];

interface CategoryCirclesProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const CategoryCircles = ({ activeFilter, onFilterChange }: CategoryCirclesProps) => {
  return (
    <div className="overflow-x-auto px-4 py-2 flex gap-3 bg-secondary/50">
      <div className="flex gap-3">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="relative">
              <div 
                className={cn(
                  "w-14 h-14 rounded-full overflow-hidden border-2",
                  activeFilter === category.id 
                    ? "border-primary" 
                    : "border-transparent"
                )}
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {category.count && (
                <div className="absolute -top-0.5 -right-0.5 bg-primary text-[10px] text-primary-foreground rounded-full px-1 min-w-[1.125rem] text-center">
                  {category.count}
                </div>
              )}
            </div>
            <span className="text-[11px] text-center leading-tight line-clamp-2 w-14">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}; 