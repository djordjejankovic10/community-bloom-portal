import { ArrowLeft, ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

/**
 * EditProfile Component - Figma Design Implementation
 * 
 * UX Notes: Profile editing screen with form controls for:
 * - Profile Photo: Upload and manage profile picture with blue border highlight
 * - Name: Editable name field with inline edit link
 * - Social Links: Add and manage social media links
 * - Time Zone: Dropdown selector for user's time zone
 * - Interests: Section for managing user interests
 * 
 * Design specifications from Figma:
 * - Header: "Edit Profile" with back button and blue "Save" button
 * - Profile photo: Large circular image (96px) with blue border
 * - Blue accent color: #007AFF for links, buttons, and highlights
 * - Form sections: Clear spacing and organization
 * - Typography: Proper hierarchy with labels and descriptions
 */
const EditProfile = () => {
  const navigate = useNavigate();
  
  // Form state
  const [name, setName] = useState("Djordje Jankovic");
  const [isEditingName, setIsEditingName] = useState(false);
  const [timeZone, setTimeZone] = useState("America/Chicago");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving profile changes...");
    navigate(-1);
  };

  const handleAddSocialLink = () => {
    // Handle adding social link logic
    console.log("Add social link");
  };

  const handleProfilePhotoClick = () => {
    // Handle profile photo upload/change
    console.log("Change profile photo");
  };

  return (
    <div className="min-h-screen w-full max-w-none flex flex-col" style={{ backgroundColor: 'var(--figma-background)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 h-[60px] border-b w-full" style={{ borderBottomColor: 'var(--figma-border)' }}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 hover:bg-transparent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" style={{ color: 'var(--figma-text-primary)' }} />
        </Button>
        <h1 
          className="font-medium text-[16px] leading-[1.25] tracking-[0.16px]"
          style={{ 
            color: 'var(--figma-text-primary)',
            fontFamily: '"Greet Standard", sans-serif'
          }}
        >
          Edit Profile
        </h1>
        <Button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80"
          style={{ 
            backgroundColor: 'var(--figma-blue-accent)',
            color: '#ffffff'
          }}
        >
          Save
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-8">
        {/* Profile Photo Section */}
        <div className="space-y-4">
          <div>
            <h2 
              className="font-semibold text-[18px] leading-[1.25] mb-3"
              style={{ 
                color: 'var(--figma-text-primary)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Profile Photo
            </h2>
            <p 
              className="text-[14px] leading-[1.425] tracking-[-0.16px] mb-6"
              style={{ 
                color: 'var(--figma-grey-600)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Choose your profile picture, it will help people to recognize you. Don't forget to show your smile!
            </p>
          </div>
          
          {/* Profile Photo with Blue Border */}
          <div className="flex flex-col items-center space-y-3">
            <button
              onClick={handleProfilePhotoClick}
              className="relative group"
            >
                             <Avatar className="h-24 w-24 ring-2 ring-offset-2 ring-offset-background" style={{ '--tw-ring-color': 'var(--figma-blue-accent)' } as React.CSSProperties}>
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback
                  className="text-xl font-semibold"
                  style={{ backgroundColor: '#B6CDD8' }}
                >
                  DJ
                </AvatarFallback>
              </Avatar>
            </button>
            
            <button
              onClick={handleProfilePhotoClick}
              className="text-[14px] font-medium hover:opacity-70 transition-opacity"
              style={{ 
                color: 'var(--figma-blue-accent)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Main Picture
            </button>
          </div>
        </div>

        {/* Name Section */}
        <div className="space-y-3">
          <h2 
            className="font-semibold text-[18px] leading-[1.25]"
            style={{ 
              color: 'var(--figma-text-primary)',
              fontFamily: '"Inter", sans-serif'
            }}
          >
            Name
          </h2>
          
          <div className="flex items-center justify-between">
            {isEditingName ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
                className="text-[16px] leading-[1.25] bg-transparent border-b outline-none flex-1 mr-4"
                style={{ 
                  borderBottomColor: 'var(--figma-blue-accent)',
                  color: 'var(--figma-text-primary)',
                  fontFamily: '"Inter", sans-serif'
                }}
                autoFocus
              />
            ) : (
              <span 
                className="text-[16px] leading-[1.25] flex-1"
                style={{ 
                  color: 'var(--figma-text-primary)',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                {name}
              </span>
            )}
            
            <button
              onClick={() => setIsEditingName(true)}
              className="text-[14px] font-medium hover:opacity-70 transition-opacity"
              style={{ 
                color: 'var(--figma-blue-accent)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              edit
            </button>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <h2 
            className="font-semibold text-[18px] leading-[1.25]"
            style={{ 
              color: 'var(--figma-text-primary)',
              fontFamily: '"Inter", sans-serif'
            }}
          >
            Social Links
          </h2>
          
          <button
            onClick={handleAddSocialLink}
            className="flex items-center gap-2 py-3 hover:opacity-70 transition-opacity"
          >
            <Plus className="h-4 w-4" style={{ color: 'var(--figma-grey-600)' }} />
            <span 
              className="text-[14px] leading-[1.425]"
              style={{ 
                color: 'var(--figma-grey-600)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Add social link
            </span>
          </button>
        </div>

        {/* Time Zone Section */}
        <div className="space-y-4">
          <div>
            <p 
              className="text-[14px] leading-[1.425] tracking-[-0.16px] mb-3"
              style={{ 
                color: 'var(--figma-grey-600)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Select a time zone
            </p>
            
            <div className="relative">
              <select 
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full p-4 pr-10 rounded-lg border appearance-none text-[16px]"
                style={{ 
                  backgroundColor: 'var(--figma-background)',
                  borderColor: 'var(--figma-border)',
                  color: 'var(--figma-text-primary)',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                <option value="America/Chicago">America/Chicago</option>
                <option value="America/New_York">America/New_York</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Europe/Paris">Europe/Paris</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
                <option value="Australia/Sydney">Australia/Sydney</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" 
                style={{ color: 'var(--figma-text-primary)' }} 
              />
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="space-y-4">
          <h2 
            className="font-semibold text-[18px] leading-[1.25]"
            style={{ 
              color: 'var(--figma-text-primary)',
              fontFamily: '"Inter", sans-serif'
            }}
          >
            Interests
          </h2>
          
          {/* Placeholder for interests functionality */}
          <div className="p-4 rounded-lg border-2 border-dashed" style={{ borderColor: 'var(--figma-border)' }}>
            <p 
              className="text-[14px] leading-[1.425] text-center"
              style={{ 
                color: 'var(--figma-grey-600)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Add your interests to help connect with like-minded people
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile; 