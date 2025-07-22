import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

/**
 * Appearance Component - Exact Figma Design Implementation
 * 
 * UX Notes: Theme selection screen with radio-style options:
 * - Use device theme (system preference)
 * - Dark theme (force dark mode)
 * - Light theme (force light mode)
 * 
 * Design specifications from Figma:
 * - Header: Greet Standard Medium 16px, #4d4d4c
 * - Option labels: Inter Medium 14px, #4d4d4c, w-[228px]
 * - Selected state: Red filled circle checkmark (#ff3e14), size-6
 * - Layout: 10px padding, 2.5px gap between options
 * - Each option: flex-row with pl-0 pr-2.5 py-0 padding
 */
const Appearance = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      id: "system",
      label: "Use device theme",
      value: "system"
    },
    {
      id: "dark", 
      label: "Dark theme",
      value: "dark"
    },
    {
      id: "light",
      label: "Light theme", 
      value: "light"
    }
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen w-full max-w-none flex flex-col" style={{ backgroundColor: 'var(--figma-background)' }}>
      {/* Header - Exact Figma measurements */}
      <div className="flex items-center gap-[21px] px-2 pr-5 py-0 h-[49px] border-b w-full" style={{ borderBottomColor: 'var(--figma-border)' }}>
        <div className="flex items-center gap-1 w-[109px]">
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
          Appearance
        </h1>
      </div>

      {/* Theme Options - Exact Figma structure */}
      <div className="w-full" style={{ backgroundColor: 'var(--figma-background)' }}>
        <div className="overflow-clip w-full">
          <div className="box-border flex flex-col gap-2.5 items-start justify-start p-[10px] w-full">
            {themeOptions.map((option) => (
              <div key={option.id} className="w-full">
                <div className="flex flex-row items-center overflow-clip w-full">
                  <button
                    onClick={() => handleThemeChange(option.value)}
                    className="box-border flex flex-row items-center justify-start pl-0 pr-2.5 py-0 w-full hover:opacity-70 transition-opacity"
                  >
                    {/* Content Area - Exact Figma structure */}
                    <div className="basis-0 grow min-h-px min-w-px" style={{ backgroundColor: 'var(--figma-background)' }}>
                      <div className="overflow-clip w-full">
                        <div className="box-border flex flex-col items-start justify-start p-[10px] w-full">
                          <div 
                            className="font-medium text-[14px] leading-[1.425] tracking-[-0.16px] w-[228px]"
                            style={{ 
                              color: 'var(--figma-grey-800)',
                              fontFamily: '"Inter", sans-serif',
                              fontWeight: 500
                            }}
                          >
                            {option.label}
                          </div>
                        </div>
                      </div>
                    </div>

                                         {/* Checkmark Icon - Only show for selected theme, exact Figma SVG */}
                     <div className="flex items-center justify-center shrink-0 size-6">
                       {theme === option.value && (
                         <div className="size-6">
                           <svg
                             className="block size-full"
                             fill="none"
                             preserveAspectRatio="none"
                             viewBox="0 0 22 22"
                           >
                             <path
                               clipRule="evenodd"
                               d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM16.2071 8.70711C16.5976 8.31658 16.5976 7.68342 16.2071 7.29289C15.8166 6.90237 15.1834 6.90237 14.7929 7.29289L9.5 12.5858L7.20711 10.2929C6.81658 9.90237 6.18342 9.90237 5.79289 10.2929C5.40237 10.6834 5.40237 11.3166 5.79289 11.7071L8.79289 14.7071C9.18342 15.0976 9.81658 15.0976 10.2071 14.7071L16.2071 8.70711Z"
                               fill="var(--figma-destructive)"
                               fillRule="evenodd"
                             />
                           </svg>
                         </div>
                       )}
                     </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance; 