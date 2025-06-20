import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LocationSearchProps {
  onSearch: (location: string) => void;
  defaultLocation?: string;
}

const popularLocations = [
  "North Sydney, NSW",
  "Manly, Northern Beaches",
  "Bondi Junction, Eastern Suburbs",
  "Neutral Bay, North Shore",
  "Mosman, NSW",
  "Dee Why, Northern Beaches",
  "Paddington, Eastern Suburbs",
  "Cremorne, North Shore"
];

export default function LocationSearch({ onSearch, defaultLocation = "North Sydney, NSW" }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState(defaultLocation);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredLocations = popularLocations.filter(location =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLocationSelect = (location: string) => {
    setSearchQuery(location);
    setShowSuggestions(false);
    onSearch(location);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter your location (e.g., North Sydney, Manly, Bondi)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(true)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500"
            />
          </div>
          
          {showSuggestions && filteredLocations.length > 0 && (
            <Card className="absolute top-full left-0 right-0 z-10 mt-1 border-2 border-gray-200 shadow-lg">
              <CardContent className="p-0">
                {filteredLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{location}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        
        <Button 
          onClick={handleSearch}
          className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700"
        >
          <Search className="h-5 w-5 mr-2" />
          Find Contractors
        </Button>
      </div>
      
      <div className="mt-3 text-sm text-gray-600">
        <span className="font-medium">Popular areas:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {popularLocations.slice(0, 4).map((location) => (
            <button
              key={location}
              onClick={() => handleLocationSelect(location)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              {location.split(',')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}