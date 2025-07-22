import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * NotificationSettings Component - Figma Design Implementation
 * 
 * UX Notes: Notification preferences screen with toggle controls for:
 * - Announcements: Push and Email notifications for community updates
 * - Channels: Push notifications for posts, mentions, replies, and likes
 * - Connect and Product: Dropdown selectors for message preferences
 * 
 * Design specifications from Figma:
 * - Header: "Notifications" with back button and Save button
 * - Sections: "Announcements" and "Channels" with descriptions
 * - Toggle switches: iOS-style with proper colors and animations
 * - Dropdowns: Select boxes for Connect and Product options
 */
const NotificationSettings = () => {
  const navigate = useNavigate();
  
  // Announcement toggles
  const [announcementPush, setAnnouncementPush] = useState(true);
  const [announcementEmail, setAnnouncementEmail] = useState(true);
  
  // Channel toggles
  const [channelPush, setChannelPush] = useState(true);
  
  // Dropdown selections
  const [connectSelection, setConnectSelection] = useState("All messages");
  const [productSelection, setProductSelection] = useState("All messages");

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving notification settings...");
    navigate(-1);
  };

  const CustomToggle = ({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) => (
    <div className="flex items-center justify-between py-3">
      <span 
        className="font-medium text-[16px] leading-[1.25] tracking-[-0.16px]"
        style={{ 
          color: 'var(--figma-text-primary)',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 500
        }}
      >
        {label}
      </span>
      <button
        onClick={onToggle}
        className="relative h-[31px] w-[51px] rounded-full transition-colors duration-200 ease-in-out overflow-hidden"
        style={{
          backgroundColor: enabled ? 'var(--figma-text-primary)' : 'var(--figma-toggle-bg)'
        }}
        aria-pressed={enabled}
        aria-label={`Toggle ${label}`}
      >
        {/* Toggle Knob */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 rounded-full size-[27px] transition-all duration-200 ease-in-out ${
            enabled ? 'right-0.5' : 'left-0.5'
          }`}
          style={{ 
            backgroundColor: 'var(--figma-background)',
            boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.04), 0px 3px 8px 0px rgba(0,0,0,0.15), 0px 3px 1px 0px rgba(0,0,0,0.06)'
          }}
        />
      </button>
    </div>
  );

  const CustomDropdown = ({ value, label, options, onChange }: { 
    value: string; 
    label: string; 
    options: string[];
    onChange: (value: string) => void;
  }) => (
    <div className="py-3">
      <div className="flex flex-col gap-2">
        <span 
          className="font-medium text-[14px] leading-[1.425] tracking-[-0.16px]"
          style={{ 
            color: 'var(--figma-text-primary)',
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600
          }}
        >
          {label}
        </span>
        <div className="relative">
          <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 pr-10 rounded-lg border appearance-none"
            style={{ 
              backgroundColor: 'var(--figma-background)',
              borderColor: 'var(--figma-border)',
              color: 'var(--figma-text-primary)'
            }}
          >
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" 
            style={{ color: 'var(--figma-text-primary)' }} 
          />
        </div>
      </div>
    </div>
  );

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
          Notifications
        </h1>
        <Button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ 
            backgroundColor: 'var(--figma-text-primary)',
            color: 'var(--figma-background)'
          }}
        >
          Save
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-8">
        {/* Announcements Section */}
        <div className="space-y-4">
          <div>
            <h2 
              className="font-semibold text-[18px] leading-[1.25] mb-2"
              style={{ 
                color: 'var(--figma-text-primary)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Announcements
            </h2>
            <p 
              className="text-[14px] leading-[1.425] tracking-[-0.16px]"
              style={{ 
                color: 'var(--figma-grey-600)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Stay updated about the latest announcements in your community.
            </p>
          </div>
          
          <div className="space-y-2">
            <CustomToggle 
              enabled={announcementPush}
              onToggle={() => setAnnouncementPush(!announcementPush)}
              label="Push Notifications"
            />
            <CustomToggle 
              enabled={announcementEmail}
              onToggle={() => setAnnouncementEmail(!announcementEmail)}
              label="Email Notifications"
            />
          </div>
        </div>

        {/* Channels Section */}
        <div className="space-y-4">
          <div>
            <h2 
              className="font-semibold text-[18px] leading-[1.25] mb-2"
              style={{ 
                color: 'var(--figma-text-primary)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Channels
            </h2>
            <p 
              className="text-[14px] leading-[1.425] tracking-[-0.16px]"
              style={{ 
                color: 'var(--figma-grey-600)',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Get updates on new posts, mentions, replies to your comments, or likes.
            </p>
          </div>
          
          <div className="space-y-2">
            <CustomToggle 
              enabled={channelPush}
              onToggle={() => setChannelPush(!channelPush)}
              label="Push Notifications"
            />
            
            <CustomDropdown 
              value={connectSelection}
              label="CONNECT 💡"
              options={["All messages", "Direct messages only", "Mentions only", "None"]}
              onChange={setConnectSelection}
            />
            
            <CustomDropdown 
              value={productSelection}
              label="PRODUCT 📱"
              options={["All messages", "Digest only", "Major updates only", "None"]}
              onChange={setProductSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 