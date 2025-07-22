import { 
  ArrowLeft, 
  Bell, 
  Play, 
  Lightbulb, 
  Shield, 
  FileText, 
  Info, 
  ArrowRight, 
  Trash2,
  Edit,
  Code
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

/**
 * Profile Component - Figma Design Implementation
 * 
 * UX Notes: Pixel-perfect implementation based on Figma design specifications:
 * - Primary text color: #343332 (dark gray from Figma)
 * - Secondary text: #3C3C43 and rgba(60,60,67,0.6) for muted text
 * - Typography: Greet Standard for name (28px), Inter Medium for menu items (14px)
 * - Precise spacing: 25px between items, 20px horizontal padding
 * - 96px avatar with 25px edit button
 * - Proper icon sizing (20px) and colors matching design system
 * - White background (#ffffff) with subtle borders (#d2d1d1)
 * - Destructive actions in red (#ff3e14)
 * - Appearance links to proper theme selection screen
 * - Developer Options section provides easy access to debug features
 */
const Profile = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  // Simple version info display
  const handleVersionClick = () => {
    // Just a placeholder for version info - no hidden functionality needed
    console.log("App version: t3.19.0");
  };

  const profileMenuItems = [
    {
      section: "SETTINGS",
      items: [
                      {
                icon: Bell,
                label: "Notifications",
                action: () => navigate('/settings/notifications'),
                rightText: ""
              },
        {
          icon: Play,
          label: "Playback preferences", 
          action: () => navigate('/settings/playback'),
          rightText: ""
        },
        {
          icon: Lightbulb,
          label: "Appearance",
          action: () => navigate('/settings/appearance'),
          rightText: ""
        }
      ]
    },
    {
      section: "LEGAL",
      items: [
        {
          icon: Shield,
          label: "Privacy policy",
          action: () => navigate('/legal/privacy'),
          rightText: ""
        },
        {
          icon: FileText,
          label: "Terms of Service",
          action: () => navigate('/legal/terms'),
          rightText: ""
        }
      ]
    },
    {
      section: "ACCOUNT", 
      items: [
        {
          icon: Info,
          label: "App version",
          action: handleVersionClick,
          rightText: "t3.19.0"
        },
        {
          icon: ArrowRight,
          label: "Log out",
          action: () => {
            // Handle logout logic here
            console.log("Logging out...");
          },
          rightText: ""
        },
        {
          icon: Trash2,
          label: "Delete Account",
          action: () => {
            // Handle account deletion logic here
            console.log("Delete account...");
          },
          rightText: "",
          destructive: true
        }
      ]
    },
    {
      section: "DEVELOPER",
      items: [
        {
          icon: Code,
          label: "Developer Options",
          action: () => navigate('/debug'),
          rightText: ""
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full max-w-none flex flex-col" style={{ backgroundColor: 'var(--figma-background)' }}>
      {/* Header - Matches Figma specs */}
              <div className="flex items-center justify-between px-2 pr-5 py-0 h-[49px] border-b w-full" style={{ borderBottomColor: 'var(--figma-border)' }}>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 hover:bg-transparent"
            onClick={() => navigate(-1)}
          >
                          <ArrowLeft className="h-5 w-5" style={{ color: 'var(--figma-text-primary)' }} />
          </Button>
        </div>
      </div>

      {/* Profile Section - Exact Figma measurements */}
      <div className="flex flex-col items-center px-5 pt-0 pb-5 w-full relative">
        <div className="flex flex-col gap-4 items-center pt-4">
          {/* Profile Picture with Edit Button */}
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b5ad?w=400&h=400&fit=crop" 
                alt="Sophia Perez" 
                className="object-cover"
              />
              <AvatarFallback 
                className="text-2xl font-semibold"
                style={{ backgroundColor: '#B6CDD8' }}
              >
                SP
              </AvatarFallback>
            </Avatar>
            
            {/* Edit Button - Exact Figma positioning and styling */}
                                                  <button
                     className="absolute rounded-full h-[25px] w-[25px] flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(26,26,25,0.05)] border"
                     style={{ 
                       backgroundColor: 'var(--figma-background)',
                       borderColor: 'var(--figma-border)',
                       bottom: '-1px',
                       right: '-1px'
                     }}
                                   onClick={() => navigate('/profile/edit')}
            >
              <Edit className="h-4 w-4" style={{ color: 'var(--figma-grey-800)' }} />
            </button>
          </div>
          
          {/* Profile Info - Exact typography from Figma */}
          <div className="flex flex-col gap-2 items-center px-0 py-2 text-center w-[202px]">
            <h1 
              className="font-semibold text-[28px] leading-[1.25] tracking-[0.26px]"
                                 style={{
                     color: 'var(--figma-text-primary)',
                     fontFamily: '"Greet Standard", sans-serif'
                   }}
            >
              Sophia Perez
            </h1>
            <p 
              className="text-[17px] leading-[22px] tracking-[-0.43px]"
                                 style={{
                     color: 'var(--figma-text-secondary-opacity)',
                     fontFamily: '"SF Pro", sans-serif'
                   }}
            >
              sophia@email.com
            </p>
          </div>
        </div>
      </div>

      {/* Settings Sections - Exact Figma spacing and styling */}
      <div className="flex-1 w-full px-5 py-2.5 space-y-[25px] max-w-none">
        {profileMenuItems.map((section, sectionIndex) => (
          <div key={section.section} className="flex flex-col gap-[5px] w-full">
            {/* Section Header - Exact Figma typography */}
            <h2 
              className="text-[12px] leading-[16px] tracking-[-0.4px] w-full"
                                 style={{
                     color: 'var(--figma-text-primary)',
                     fontFamily: '"SF Pro", sans-serif',
                     fontWeight: 400
                   }}
            >
              {section.section}
            </h2>
            
            {/* Menu Items Container */}
            <div className="flex flex-col px-0 py-2.5 gap-[25px] w-full">
              {section.items.map((item, itemIndex) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center gap-[11px] p-0 w-full text-left hover:opacity-70 transition-opacity"
                >
                  <item.icon 
                    className="h-5 w-5 flex-shrink-0"
                                             style={{
                           color: item.destructive ? 'var(--figma-destructive)' : 'var(--figma-text-primary)'
                         }} 
                  />
                  <span 
                    className="font-medium text-[14px] leading-[1.425] tracking-[-0.16px] flex-shrink-0"
                                             style={{
                           color: item.destructive ? 'var(--figma-destructive)' : 'var(--figma-text-primary)',
                           fontFamily: '"Inter", sans-serif',
                           fontWeight: 500
                         }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Spacer */}
                  {item.rightText && (
                    <div className="flex-1 min-w-0" />
                  )}
                  
                  {/* Right Text */}
                  {item.rightText && (
                    <span 
                      className="font-medium text-[14px] leading-[1.425] tracking-[-0.16px] flex-shrink-0"
                                                 style={{
                             color: 'var(--figma-text-secondary-opacity)',
                             fontFamily: '"Inter", sans-serif',
                             fontWeight: 500
                           }}
                    >
                      {item.rightText}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Profile;