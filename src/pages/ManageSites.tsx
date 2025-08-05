import { ArrowLeft, Mail, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMenuPreferences } from "@/context/MenuPreferencesContext";

/**
 * ManageSites Component
 * 
 * UX Notes: This page provides account and site management functionality with:
 * - Clear navigation with back button and page title
 * - Account grouping by email address for multi-account users
 * - Individual site listings under each account
 * - Sign out functionality per account
 * - Option to add new email accounts
 * - Visual hierarchy with proper spacing and typography
 */
const ManageSites = () => {
  const navigate = useNavigate();
  const { sites } = useMenuPreferences();

  // Mock account data - in real app this would come from authentication context
  const accountGroups = [
    {
      email: "email1@kajabi.com",
      sites: sites.slice(0, 3) // First 3 sites
    },
    {
      email: "email2@kajabi.com", 
      sites: sites.slice(3, 6) // Next 3 sites
    }
  ];

  const handleSignOut = (email: string) => {
    // Handle sign out for specific account
    console.log(`Signing out from ${email}`);
  };

  const handleAddAccount = () => {
    // Handle adding new email account
    console.log("Adding new email account");
  };

  const getSiteColorClass = (siteId: string) => {
    const colors = [
      'from-blue-500 to-purple-600',      // Fitness Community
      'from-green-500 to-teal-600',       // Tech Enthusiasts  
      'from-orange-500 to-red-600',       // Book Club
      'from-pink-500 to-rose-600',        // Photography Hub
      'from-indigo-500 to-purple-600',    // Art & Design
      'from-yellow-500 to-orange-600',    // Music Producers
      'from-emerald-500 to-green-600',    // Cooking Club
      'from-cyan-500 to-blue-600',        // Travel Buddies
      'from-lime-500 to-green-600',       // Gardening Group
      'from-violet-500 to-purple-600'     // DIY Projects
    ];
    const colorIndex = parseInt(siteId) - 1;
    return colors[colorIndex] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-[21px] h-[49px] px-2 pr-5">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-start p-0 w-[109px]"
        >
          <ArrowLeft className="w-5 h-5 text-[#4d4d4c]" />
        </button>
        <h1 className="font-medium text-[#4d4d4c] text-[16px] leading-5 tracking-[0.16px]">
          Manage sites
        </h1>
      </div>

      {/* Account Groups */}
      <div className="flex-1 bg-white">
        {accountGroups.map((account, accountIndex) => (
          <div key={account.email} className="px-4 py-2.5">
            {/* Account Header */}
            <div className="flex items-start justify-between py-2.5 mb-2.5">
              <div className="flex items-center gap-[11px]">
                <Mail className="w-5 h-5 text-[#343332]" />
                <span className="font-medium text-[#343332] text-[14px] leading-[20px] tracking-[-0.16px]">
                  {account.email}
                </span>
              </div>
              <button 
                onClick={() => handleSignOut(account.email)}
                className="font-semibold text-[#ff3e14] text-[14px] leading-[20px] tracking-[-0.16px]"
              >
                Sign out
              </button>
            </div>

            {/* Sites List */}
            <div className="space-y-4">
              {account.sites.map((site) => (
                <div key={site.id} className="flex items-center gap-[19px]">
                  {/* Site Thumbnail */}
                  <div className="w-[52px] h-[52px] rounded-lg flex-shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img 
                      src={site.logo} 
                      alt={site.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const colorClass = getSiteColorClass(site.id);
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-lg">${site.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>

                  {/* Site Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#343332] text-[16px] leading-5 tracking-[0.16px] truncate">
                      {site.name}
                    </div>
                    <div className="font-medium text-[#6c6a69] text-[12px] leading-[17px] truncate">
                      http://address.com/site
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Account Section */}
        <div className="px-4 py-2.5">
          <button 
            onClick={handleAddAccount}
            className="flex items-center gap-[11px] py-2.5 w-full"
          >
            <Plus className="w-5 h-5 text-[#343332]" />
            <span className="font-medium text-[#343332] text-[14px] leading-[20px] tracking-[-0.16px]">
              Sign in with another email address
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSites; 