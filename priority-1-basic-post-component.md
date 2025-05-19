## Priority 1: Basic Post Component
This priority includes the core elements needed to display posts in a feed. It covers the basic post UI structure, engagement metrics, and fundamental interaction capabilities. These components form the essential foundation of the social feed experience.

**User Story: View Basic Feed Structure**
As a mobile app user, I want to see a basic feed of posts so I can browse community content.

**Acceptance Criteria:**
- Feed displays a simple scrollable list of posts with the most recent at the top
- Each post card shows:
  - Author's profile picture (circular, 40x40px) and full name (first + last)
  - Post timestamp displayed as relative time for recent posts (e.g., "2m ago", "5h ago") and formatted date for older posts (e.g., "Jan 15")
  - Post timestamp should update dynamically while the app is open (e.g., "Just now" → "1m ago")
  - Basic text content with proper text wrapping and truncation:
    - Display up to 8 lines of text initially, with "show more" link at the end when truncated
    - Full text is visible after tapping "show more" (we could also open post detail views for show more)
    - Appropriate padding around text content (16dp horizontal, 12dp vertical)
    - For text-only posts with no media:
      - Post card can expand to show full content when tapped
      - Text appears with 16px font size, line height 24px
      - Text uses system font with regular weight
- Feed has a clear empty state when no posts are available (need design)
- Basic pull-to-refresh functionality is implemented

**User Story: View Post Engagement Metrics**
As a mobile app user, I want to see engagement metrics on posts so I can understand post popularity.

**Acceptance Criteria:**
- Each post displays post engagement metrics in a footer section below post content:
  - Reaction count showing total number of reactions for each type (e.g., 👍❤️😂), with the order of highest to lowest count left to right.
  - Comments count with comment icon
  - Metrics use appropriate condensed format for large numbers (e.g., "1.2K" instead of "1,234")
  - Tapping on reaction count opens a reaction details bottom sheet
- Metrics are positioned in a clear footer section that separates them from post content
- Metrics use appropriate text styles (smaller than post text, secondary color)
- Metrics footer provides visual spacing between content and interaction buttons below
- Zero counts never display (do not show "0" rather hide reaction/comment metric)
- Highly engaging posts with many reactions/comments don't cause visual issues

**User Story: View Reaction Details**
As a mobile app user, I want to see who reacted to a post so I can understand who engaged with the content.

**Acceptance Criteria:**
- Tapping on reaction count opens a reaction details bottom sheet showing:
  - Tabs for filtering by reaction type ("All", and individual reaction types, sorted highest to lowest count left to right)
  - If there is no reaction (count = 0), hide from the filter view
  - List of users who reacted with their profile pictures, names, reaction emoji and membership tags (admin, founder etc)
  - Ability to load more reactions (lazy loading) when scrolling
  - Sheet is dismissed by pulling it down or tapping outside of it
- Bottom sheet has appropriate styling and animation when appearing/disappearing
- Loading states while fetching reaction data
- Error handling for failed data fetching with retry option

**User Story: View Post Interaction Elements**
As a mobile app user, I want to easily interact with posts through intuitive actions.

**Acceptance Criteria:**
- Posts have an action container below the metrics footer:
  - Reaction button that:
    - Shows appropriate icon based on state (outline when not reacted, filled when user has reacted)
    - Displays "Like" or the name of user's current reaction as text label
    - Long-press opens reaction selection menu showing all available reaction options
    - Reaction options appear in a horizontally scrollable bar with animation
    - Each reaction option shows emoji with tooltip on long-press showing reaction name
    - Available reactions include (note, emojis and names are fully customizable by Heroes, but theres never more than 6 total):
      - Inspired (👍) - Default reaction, also serves as "Like"
      - Love (❤️)
      - Haha (😂)
      - Wow (😮)
      - Sad (😢)
      - Angry (😡)
    - Tapping any reaction applies it immediately (Engagement metrics update in real-time when user interactions occur)
  - All buttons have appropriate touch states (highlight/press effects)

**User Story: Access Post Options Menu**
As a mobile app user, I want to access additional post options so I can manage and share content.

**Acceptance Criteria:**
- Each post includes an options menu accessible via a 3-dot icon in the top-right corner of the post
- Tapping the options icon displays a contextual menu with appropriate options based on permissions:
  - For all users:
    - Copy link to post - Copies post URL to clipboard with success toast notification
    - Report post - (separate user story, make this non functional until other is completed)
  - For post authors:
    - Edit post - Opens post editing interface with original content pre-populated (separate user story, make non functional for now until composer is built)
    - Delete post - Shows confirmation dialog before deletion with clear warning about permanence
    - When a user attempts to delete a post, a warning dialog should appear stating: "This action is permanent and cannot be reversed - all content, comments, and reactions associated with this post will be permanently deleted," requiring the user to explicitly tap "Delete" to confirm or "Cancel" to abort the deletion.
    - Deleting posts is allowed for post authors, channel owners, group leaders/founders, and community moderators/admins.
  - For moderators/admins:
    - Pin/unpin post - (separate user story, make non functional for now until pinning is built)
- Menu appearance (note-using contextual menu is OK if that saves us time):
  - Slides up as a bottom sheet on mobile devices
  - Uses appropriate animations for opening/closing (250ms duration)
  - Has proper spacing between options (min 48dp height per item)
  - Includes icons for each action aligned to the left
  - Shows clear dividers between permission groups
- Proper permission checks implemented to only show relevant options

**User Story: Report Post Content**
As a mobile app user, I want to report inappropriate or violating content so moderators can review and take action.

**Acceptance Criteria:**
- Report option appears in the post options menu for all users (except for their own posts)
- Tapping "Report post" opens a dedicated bottom sheet that:
  - Shows a clear title ("Report Content")
  - Provides a text input field for entering the reason for reporting
  - Text field supports multi-line input
  - Has prominent "Submit Report" and "Cancel" buttons
- Report submission flow:
  - Validation ensures the reason field is not empty before submission
  - Loading state shows while report is being submitted
  - Success confirmation appears when report is successfully submitted
  - Error handling with appropriate error messages and retry option
  - Automatic dismissal and return to feed after successful submission
- User experience considerations:
  - Proper keyboard handling for text input fields

**User Story: View User Roles and Badges in Posts** <!-- check with Michael/Furkan -->
As a mobile app user, I want to see badges and role indicators on posts to identify special users.

**Acceptance Criteria:**
- Feed posts and comments display user roles and badges:
  - Role badges show next to username in post header:
    - Founders/Leaders have distinctive badges (small crown icon SVG) with "Founder" text label
    - Admins have admin badge (shield icon SVG) with "Admin" text label
    - Moderators have moderator badge (SVG) with "Moderator" text label (or custom community demonym)
    - Role badges appear in a pill-shaped container with light background color and appropriate text color
    - Role badges have proper spacing (4px) and padding (horizontal 4px)
  - Subscription tier badges:
    - Display exclusive membership level badges with proper image (from badgeSrc URL)
    - Badge has subscription tier color coding
    - Feed posts: Show subscription badge at 12x12px with badge title text
  - Only one achievement badge shows in feed contexts (vs. all badges in user profiles)