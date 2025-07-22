import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";

/**
 * PlaybackPreferences Component - Figma Design Implementation
 * 
 * UX Notes: Video playback settings screen with toggle controls for:
 * - Continuous Playback: Auto-advance to next lesson after video completion
 * - Autoplay: Start videos automatically when lesson loads
 * 
 * Design specifications from Figma:
 * - Header: Greet Standard Medium 16px, #4d4d4c
 * - Setting titles: Inter Semi Bold 14px, #4d4d4c  
 * - Descriptions: Inter Regular 14px, #828180
 * - Toggle active color: #ff3e14 (red accent)
 * - Proper spacing and layout matching native mobile patterns
 */
const PlaybackPreferences = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [continuousPlayback, setContinuousPlayback] = useState(true);
  const [autoplay, setAutoplay] = useState(true);

  const settings = [
    {
      id: "continuous-playback",
      title: "Continuous Playback",
      description: "Automatically moves to the next lesson within a course when a video has completed.",
      enabled: continuousPlayback,
      onToggle: setContinuousPlayback
    },
    {
      id: "autoplay", 
      title: "Autoplay",
      description: "Starts a video playing once a lesson has loaded media",
      enabled: autoplay,
      onToggle: setAutoplay
    }
  ];

  return (
    <div className="min-h-screen w-full max-w-none flex flex-col" style={{ backgroundColor: 'var(--figma-background)' }}>
      {/* Header - Exact Figma measurements */}
              <div className="flex items-center gap-[21px] px-2 pr-5 py-0 h-[49px] border-b w-full" style={{ borderBottomColor: 'var(--figma-border)' }}>
        <div className="flex items-center gap-1 w-[73px]">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 hover:bg-transparent"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" style={{ color: 'var(--figma-text-primary)' }} />
          </Button>
        </div>
        <h1 
          className="font-medium text-[16px] leading-[1.25] tracking-[0.16px] text-nowrap"
                     style={{
             color: 'var(--figma-grey-800)',
             fontFamily: '"Greet Standard", sans-serif'
           }}
        >
          Playback preferences
        </h1>
      </div>

      {/* Settings Content */}
      <div className="w-full p-[10px]">
        <div className="flex flex-col w-full">
          {settings.map((setting, index) => (
            <div
              key={setting.id}
              className="flex items-center gap-2.5 p-0 w-full"
            >
              {/* Content Area */}
              <div className="flex-1 min-w-0" style={{ backgroundColor: 'var(--figma-background)' }}>
                <div className="p-[10px] flex flex-col gap-[5px] w-full">
                  {/* Setting Title */}
                  <h2
                    className="font-semibold text-[14px] leading-[1.425] tracking-[-0.16px] w-[228px]"
                                             style={{
                           color: 'var(--figma-grey-800)',
                           fontFamily: '"Inter", sans-serif',
                           fontWeight: 600
                         }}
                  >
                    {setting.title}
                  </h2>
                  
                  {/* Setting Description */}
                  <p
                    className="text-[14px] leading-[20px] min-w-full"
                                             style={{
                           color: 'var(--figma-grey-600)',
                           fontFamily: '"Inter", sans-serif',
                           fontWeight: 400,
                           width: 'min-content'
                         }}
                  >
                    {setting.description}
                  </p>
                </div>
              </div>

              {/* Custom Toggle - Exact Figma styling */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => setting.onToggle(!setting.enabled)}
                                           className="relative h-[31px] w-[51px] rounded-full transition-colors duration-200 ease-in-out overflow-hidden"
                         style={{
                           backgroundColor: setting.enabled ? 'var(--figma-destructive)' : 'var(--figma-toggle-bg)'
                         }}
                  aria-pressed={setting.enabled}
                  aria-label={`Toggle ${setting.title}`}
                >
                  {/* Toggle Knob - Exact Figma measurements with theme-aware shadow */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 rounded-full size-[27px] transition-all duration-200 ease-in-out ${
                      setting.enabled ? 'right-0.5' : 'left-0.5'
                    }`}
                    style={{ 
                      backgroundColor: 'var(--figma-background)',
                      boxShadow: theme === 'dark' 
                        ? '0px 0px 0px 1px rgba(255,255,255,0.1), 0px 3px 8px 0px rgba(0,0,0,0.3), 0px 3px 1px 0px rgba(0,0,0,0.1)'
                        : '0px 0px 0px 1px rgba(0,0,0,0.04), 0px 3px 8px 0px rgba(0,0,0,0.15), 0px 3px 1px 0px rgba(0,0,0,0.06)'
                    }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaybackPreferences; 