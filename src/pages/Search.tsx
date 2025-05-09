import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchResultItem } from "@/components/search/SearchResultItem";
import { SearchResult, SearchResultType } from "@/types/search";
import { searchResults } from "@/data/mockSearchResults";
import { Separator } from "@/components/ui/separator";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<SearchResultType | "all">("all");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Handle search as user types
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim()) {
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
          const newResults = searchResults(query, activeTab);
          setResults(newResults);
          setIsLoading(false);
        }, 300);
      } else {
        setResults([]);
      }
    }, 300);
    
    return () => clearTimeout(delaySearch);
  }, [query, activeTab]);
  
  const handleClear = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const handleTabChange = (value: SearchResultType | "all") => {
    setActiveTab(value);
  };
  
  const getResultCountByType = (type: SearchResultType): number => {
    if (!query.trim()) return 0;
    return searchResults(query, type).length;
  };
  
  const renderResults = () => {
    if (isLoading) {
      return (
        <div className="py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Searching...</p>
        </div>
      );
    }
    
    if (query.trim() && results.length === 0) {
      return (
        <div className="py-12 text-center px-4">
          <SearchIcon className="h-8 w-8 mb-4 mx-auto text-muted-foreground" />
          <h3 className="font-semibold text-lg">No results found</h3>
          <p className="text-muted-foreground mt-2">
            We couldn't find anything matching "{query}". Try different keywords or filters.
          </p>
        </div>
      );
    }
    
    if (!query.trim()) {
      return (
        <div className="py-12 text-center px-4">
          <SearchIcon className="h-8 w-8 mb-4 mx-auto text-muted-foreground" />
          <h3 className="font-semibold text-lg">Search across Community Bloom</h3>
          <p className="text-muted-foreground mt-2">
            Type to search for groups, channels, posts, members, challenges, and events.
          </p>
        </div>
      );
    }
    
    return (
      <div>
        {results.map((result) => (
          <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
        ))}
      </div>
    );
  };
  
  const totalResults = query.trim() ? searchResults(query, "all").length : 0;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2 p-3 pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="pl-9 pr-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {query.trim() && !isLoading && (
          <div className="px-3 text-xs text-muted-foreground">
            {totalResults} {totalResults === 1 ? 'result' : 'results'}
          </div>
        )}
        
        <div className="px-2 py-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            <button
              onClick={() => handleTabChange("all")}
              className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                activeTab === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTabChange("post")}
              className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                activeTab === "post" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => handleTabChange("circle")}
              className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                activeTab === "circle" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Circles
            </button>
            <button
              onClick={() => handleTabChange("meetup")}
              className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                activeTab === "meetup" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Meetups
            </button>
            <button
              onClick={() => handleTabChange("member")}
              className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                activeTab === "member" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Members
            </button>
            <button
              onClick={() => handleTabChange("recording")}
              className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                activeTab === "recording" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Recordings
            </button>
          </div>
        </div>
        
        <Separator />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {renderResults()}
      </div>
    </div>
  );
};

export default SearchPage;
