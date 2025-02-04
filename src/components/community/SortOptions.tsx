import { Filter, ArrowUpDown, SlidersHorizontal, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type SortOption = "latest" | "newest" | "oldest";

interface SortOptionsProps {
  currentSort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export const SortOptions = ({ currentSort, onSortChange }: SortOptionsProps) => {
  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case "latest":
        return "Latest activity";
      case "newest":
        return "Newest first";
      case "oldest":
        return "Oldest first";
      default:
        return "Sort by";
    }
  };

  return (
    <div className="px-4 py-2 border-b flex justify-end">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {getSortLabel(currentSort)}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Sort by</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <RadioGroup
                defaultValue={currentSort}
                onValueChange={(value) => onSortChange(value as SortOption)}
              >
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="latest" id="latest" />
                  <Label htmlFor="latest">Latest activity</Label>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="newest" id="newest" />
                  <Label htmlFor="newest">Newest first</Label>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="oldest" id="oldest" />
                  <Label htmlFor="oldest">Oldest first</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}; 