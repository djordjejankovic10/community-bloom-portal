## User Stories for Mobile Feed and Post Creation


### Priority 1: Basic Post Component
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

### Priority 2: Content Creation Basics
This priority focuses on the fundamental content creation and editing functionality. It includes creating text posts, editing existing content, and attaching basic media types. These features enable users to contribute and share their own content within the community.

**User Story: Compose Basic Text Post**
As a mobile app user, I want to create a new text post so I can share my thoughts with the community.

**Acceptance Criteria:**
- Post composer accessible on top of feed
- Composer screen includes:
  - Clear header indicating "Create Post"
  - Text input field with appropriate placeholder text
  - Channel/circle selector to choose where to post (if posting from circle feed, then this is hidden)
  - Post button (disabled until text entered)
  - Close/cancel button to exit composer
- Text input supports:
  - Multi-line entry with proper scrolling
  - Auto-correction and spell check
  - Appropriate keyboard type with return key set to new line
  - Input field expands as content is added (up to a limit, then scrollable)
- Basic error handling for failed posts
- Success confirmation and navigation flow:
  - Automatically navigate user back to the feed, auto-scroll to position the new post within the visible area of the feed
  - Momentarily highlight the newly created post with a subtle animation (pulsing highlight) and haptic feedback

**User Story: Edit Existing Basic Text Posts**
As a mobile app user, I want to edit my existing posts so I can correct mistakes, add information, or update content.

**Acceptance Criteria:**
- Access to edit functionality:
  - Edit option available in the post options menu (3-dot icon) for post authors
  - Permission-based access ensures only the original author can edit their posts
  - Clear visual presentation of edit option with edit icon
- Edit interface and experience:
  - Selecting "Edit" transforms post into editable format in line with existing content pre-populated
  - Cancel button is present to cancel edit without saving changes
  - Edit interface matches the post creation composer in appearance and functionality
  - For polls, special handling to maintain poll data while allowing edits to question/options
- Content editing capabilities:
  - Text editing with original message pre-populated
- Edit submission and feedback:
  - Save/Update button to confirm changes
  - Loading state during update submission
  - Momentarily highlight the newly updated post with a subtle animation (pulsing highlight) and haptic feedback
  - Error handling with clear error messages if update fails

**User Story: Mention Users in Posts**
As a mobile app user, I want to @mention other users in my posts to notify them.

**Acceptance Criteria:**
- User can type @ symbol to trigger mention suggestion interface positioned as a mini modal close to where user is typing (like a contextual menu)
- Mention suggestions show:
  - Profile pictures of suggested users (with UserAvatar component)
  - User names with role badges where applicable
  - Empty state when no matches found
- Type-ahead/autocomplete functionality for mentions:
  - Suggestions appear in real-time as user types after @ symbol
  - Suggestions filtered based on typed characters after @:
    - Direct name matching for 1-2 characters (first/last name contains filter)
    - Full text search for 3+ characters
  - Tap to select a suggestion
  - Dismiss suggestions by tapping away
- Suggestions include:
  - Users from same channel/group
  - Special "everyone" mention option for privileged users (admins/moderators)
  - Excludes blocked users and users who have blocked the current user
- Mentions appear as special tokens in the text editor
- Mentions styled distinctly from regular text (with special branding)
- Test: multiple mentions in single post and placing mentions anywhere in post text
- Ability to remove mentions by deleting them as any other text

**User Story: Attach Photos to Posts**
As a mobile app user, I want to attach photos and images to my posts to share visual content.

**Acceptance Criteria:**
- Photo attachment options clearly visible in composer:
  - Camera option to take photo directly
  - Gallery option to select existing images
- Image selection interface supports:
  - Single and multiple selection modes
  - Preview of selected images with appropriate thumbnails
  - Ability to remove selected images before posting
- Support for common image formats:
  - JPEG, PNG for standard photos
  - GIF for animated content
- Image size limits enforced:
  - 40MB maximum per image file
  - Clear error messaging when limit is exceeded
- Multiple image support:
  - Ability to add up to 6 images per post
  - Visual preview of all images in a scrollable/carousel interface
  - Clear indication when image limit is reached
- Image upload process:
  - Progress indicators during upload
  - Ability to cancel individual image uploads
  - Error handling for failed uploads with retry options
  - Support for continuing text composition while images upload

**User Story: Attach Videos to Posts**
As a mobile app user, I want to attach videos to my posts to share dynamic visual content.

**Acceptance Criteria:**
- Video attachment options clearly visible in composer:
  - Add video button to add video
  - Take video button to record video
- Video selection interface supports:
  - Preview thumbnails of videos (always square, center crop) with play button overlay
  - Ability to remove selected videos before posting
- Video specifications:
  - Support for common formats (MP4, MOV)
  - Video size limits enforced (1GB on iOS/web, 500MB on Android)
  - Clear error messaging when limits are exceeded
- Multiple video support:
  - Ability to add up to 6 videos per post (as part of the overall 6 file maximum)
  - Clear indication when limit is reached (disable button, and only allow 6 to select in media library)
- Video upload process:
  - Prominent progress indicators during upload
  - Background uploading support (can continue using app)
  - Error handling for failed uploads with clear error messages
  - Option to retry failed uploads without starting over
- Support for continuing text composition while videos upload
- Test uploading a mix of image/video to ensure the two coexist.

### Priority 3: Commenting Experience
This priority covers the core commenting functionality that enables discussions on posts. It includes viewing, creating, and replying to comments with text and media. These features are essential for user engagement and community interaction around content.

**User Story: View Comments on Posts**
As a mobile app user, I want to view comments on posts so I can follow community discussions.

**Acceptance Criteria:**
- Tapping comment button or comment count opens post details view showing:
  - Original post content at top (fully expanded)
  - Comments section below with chronological ordering (oldest to newest)
  - Each comment includes:
    - Commenter's profile picture (32x32px circular)
    - Commenter's name with appropriate badges
    - Comment timestamp in same format as posts
    - Comment text with proper wrapping
    - Reaction button showing current reaction count
    - Reply button for threaded conversations
  - For many comments, show "View all comments" button initially with limited preview
  - Infinite scroll for loading older comments with loading indicator
  - Reply threads show proper indentation to visualize conversation hierarchy
    - Show only 3 immediate replies by default for each comment
    - Display a "Show replies" button below the third reply when more replies exist
    - Loading indicator appears when fetching additional replies
    - Once expanded, all replies in that thread remain visible
    - Maximum nesting depth of 3 levels (original comment → reply → reply to reply → reply to reply to reply)
  - Empty state when post has no comments with appropriate message
  - Proper handling of media attachments in comments (images, videos, files)

**User Story: Add Comments to Posts**
As a mobile app user, I want to add comments to posts so I can participate in conversations.

**Acceptance Criteria:**
- Comment input field at bottom of screen with:
  - User's avatar showing beside input field
  - Placeholder text ("Write a comment...")
  - Media attachment button for adding images/videos
  - Input field expands as content is added (up to 5 lines, then scrollable)
  - Send button that's disabled until content is entered
- Comment submission:
  - Visual feedback during submission (loading indicator underneath the post)
  - Newly added comment appears immediately in the list
  - Error handling for failed comment submission
  - Momentarily highlight the newly created comment with a subtle animation (pulsing highlight) and haptic feedback
- Media in comments:
  - Support for attaching images to comments (up to 6 per comment)
  - Preview thumbnails of attached media show in input field
  - Error handling for failed media uploads
- Permissions and moderation:
  - Comment editing workflow:
    - Access to edit options through the three-dot menu (...) for each comment
    - Selecting "Edit" transforms the comment into an editable input field with existing content pre-populated
    - "Editing Message" indicator appears above the input field
    - Close button (X) allows canceling the edit without saving
    - Media attachments remain editable (can add/remove)
    - Submit button updates to "Update" text during editing
    - Success confirmation toast displayed after successful edit ("Your comment was updated successfully!")
  - Option to delete own comments with confirmation (accessed through the three-dot menu)
  - When a user attempts to delete a comment, a warning dialog should appear stating: "This action is permanent and cannot be reversed - all content, comments, and reactions associated with this post will be permanently deleted," requiring the user to explicitly tap "Delete" to confirm or "Cancel" to abort the deletion.
    - Deleting posts is allowed for post authors, channel owners, group leaders/founders, and community moderators/admins.
  - Moderators, admins, and group leaders can delete any comment
  - Comments from blocked users are hidden automatically

**User Story: Reply to Comments**
As a mobile app user, I want to reply to specific comments so I can engage in threaded conversations and respond directly to other users.

**Acceptance Criteria:**
- Reply functionality:
  - Reply button visible on each comment
  - Reply button on comments initiates a full screen bottom sheet
  - Reply sheet shows the original comment at the top with a visual connecting line between the original comment and reply area for clear threading context
  - Reply sheet includes the original commenter's avatar and name for context
  - Reply sheet includes a back/close button to return to the post detail view
  - Reply input field auto-focuses when the sheet opens
  - Input field expands as content is added (up to 5 lines, then scrollable)
  - Send button that's disabled until content is entered
- Reply composition features:
  - Mention functionality with @ symbol to tag other users (just this for now, other buttons come later)
  - All buttons appear in a toolbar at the bottom of the sheet
- Reply submission:
  - Visual feedback during submission (loading indicator)
  - Newly added reply appears immediately in the thread with proper indentation
  - Error handling for failed reply submission
  - Sheet automatically closes after successful submission
  - Momentarily highlight the newly created reply with a subtle animation (pulsing highling) and haptic feedback
- Media in replies:
  - Support for attaching images to replies (up to 6 per reply)
  - Preview thumbnails of attached media show in reply composition area
  - Error handling for failed media uploads
- Reply threading and visibility:
  - Replies appear indented under the parent comment with appropriate connecting lines
  - Proper visual hierarchy maintained for deeply nested replies
  - Visual design maintains thread context at all levels of nesting
- Reply editing and moderation:
  - Same editing and deletion capabilities as regular comments
  - Same permission structure applies (own replies editable/deletable, moderators can delete any reply)

### Priority 4: Rich Media Experiences
This priority enhances how users view and interact with different media types in the feed. It includes support for photos, videos, link previews, and pinned content. These features create a more engaging and visual content experience.

**User Story: Filter and Sort Feed Content**
As a mobile app user, I want to filter and sort posts in my feed to more easily find relevant content.

**Acceptance Criteria:**
- Feed includes a prominent sort/filter control at the top of the screen:
  - Sort button shows current sort method with label "Sort by" followed by the active option
  - Sort control appears as a touch target with proper padding (16dp horizontal, 16dp vertical)
  - Visual indicator (chevron down icon) shows the control is tappable
- Tapping the sort/filter control opens a context menu (action sheet) with the following options:
  - Latest Activity - Shows posts ordered by most recent comments/reactions first (available in home feed)
  - Popularity - Shows posts ordered by engagement metrics (available in circle/channel feeds)
  - Newest to oldest - Shows posts ordered by creation date (newest first)
  - Oldest to newest - Shows posts ordered by creation date (oldest first)
- Current selection is visually indicated in the action sheet
- Selecting a different option:
  - Immediately applies the new sort order with loading indicator
  - Updates the button label to reflect the current selection
  - Refreshes the feed content with the new sort order
  - Maintains sort preference between app sessions
- User interface provides clear visual feedback during loading after filter change

**User Story: View Photos in Feed Posts**
As a mobile app user, I want to see photos and image content in feed posts so I can engage with visual content shared by the community.

**Acceptance Criteria:**
- Posts with photo attachments display properly in the feed:
  - Single photo post:
    - Image displays below text with aspect ratio preserved
    - Image height limited to 600px maximum in feed view
    - Image width spans the full post width with no padding on sides
    - Tapping image opens full-screen photo viewer with zoom capability
    - Full-screen viewer includes swipe or X action for dismissal
  - Multiple photos post:
    - First image displays with same rules as single image
    - Visual indicator shows +X more photos in the corner of the first image
    - Pagination dots appear below image if multiple photos exist
    - Tapping opens gallery view with all images and swipe navigation
    - Posts can contain up to 6 images total (part of the overall 6 file maximum per post)
- For posts with both text and photos:
  - Text appears above photos
  - Same text truncation rules apply (up to 3 lines visible)
- Photo handling includes:
  - Progressive loading with low-resolution placeholders
  - Proper handling of portrait vs. landscape orientations
    - Always preserve aspect ratio - Never stretch or distort images
    - Portrait images (taller than wide) must scale to either 300px maximum height or container width (whichever constraint is hit first), while landscape images (wider than tall) must scale to fit the full container width with height determined by aspect ratio. Test: Compare side-by-side rendering of portrait and landscape images to verify consistent, appropriate scaling.
    - All images must be centered horizontally with consistent 8dp rounded corners and proper padding (16dp on sides), with no unnecessary white space or abrupt layout shifts when loading. 
Test edge cases - Very tall/narrow images, panoramas, etc.
  - Proper error states for failed image loads
  - Fallback for unsupported image types
  - Proper handling of animated GIFs
Suggested optimizations
- File size optimization implemented for faster loading
- Image caching implemented for better performance

**User Story: View Videos in Feed Posts**
As a mobile app user, I want to see video content in feed posts so I can engage with dynamic media shared by the community.

**Acceptance Criteria:**
- Video posts display properly in the feed:
  - Video thumbnail displays with play button overlay centered on the thumbnail
  - Similar size constraints as photos (300px max height in feed)
  - Videos don't autoplay in feed
  - For multiple videos, pagination dots appear below content similar to photos
  - Videos appear in same carousel/slider as photos when a post has multiple media items
  - Posts can contain up to 6 videos total (part of the overall 6 file maximum per post)
  - Proper fallback for unsupported video formats
- Video playback behavior:
  - Tapping thumbnail opens appropriate video player based on source
  - Player includes standard controls (play/pause, seek, volume)
  - Option to open fullscreen modal viewer with close button
  - Video player maintains aspect ratio of original video
    - All videos must maintain their original aspect ratio in both thumbnail and playback states, regardless of whether they are portrait (vertical) or landscape (horizontal) orientation. Play both portrait (9:16) and landscape (16:9) videos and verify that no stretching, cropping or distortion occurs in either thumbnail or full playback view.
    - When a post contains multiple videos with different orientations (portrait and landscape mixed), all videos must appear with a consistent container size without jarring layout shifts when swiping between them.
  - Background state properly handled when navigating away from video
- Video handling includes:
  - Loading indicators while video initializes
  - Error states for failed video loads
- Video optimization:
  - Efficient video loading
  - Appropriate video quality based on display size
  - Responsive sizing to fit different screen dimensions


====consider splitting this out , but prioritizing other things 

**User Story: View URL Previews in Posts**
As a mobile app user, I want to see rich previews of URLs shared in posts to get context without leaving the app.

**Acceptance Criteria:**
- URLs in post content are automatically detected using regex pattern
- For detected URLs, a rich preview card is displayed below the post text showing:
  - Preview image from the link (left side of card, square aspect ratio)
  - Link title with proper truncation (max 2 lines)
  - Link description with truncation (max 1 line)
  - Website domain name displayed below description
- Preview card dimensions and styling:
  - Card has light border (1px) with subtle rounded corners (8px radius)
  - Text area has proper padding (12px horizontal, 8px vertical)
  - Max width matches the container width
  - Clear visual hierarchy between title (larger, bold font) and description (regular weight)
  - Domain name in subtle, secondary color
- Visual states:
  - Loading state shows skeleton UI while fetching preview data
  - Error/fallback state shows domain name when preview data unavailable
- Tapping on the preview card opens the URL in in-app browser or external browser based on user settings
- Preview images load efficiently with proper caching
- URL previews gracefully handle long content with appropriate truncation

**User Story: View Pinned Posts**
As a mobile app user, I want to see important pinned posts at the top of my feed for quick access to essential community information.

**Acceptance Criteria:**
- Pinned posts appear in a dedicated section at the top of the feed, before regular posts:
  - Section has a "Pinned Posts" heading with expand/collapse functionality
  - Visual indicator shows whether section is expanded or collapsed
  - User preference for expanded/collapsed state persists between sessions
- Pinned posts appear in a horizontal carousel when multiple exist:
  - Cards are ~284px width and ~360px height with proper padding and spacing
  - Users can swipe horizontally to browse through pinned posts
  - Pagination indicator shows current position in the carousel
  - Carousel supports looping through pinned posts
- Each pinned post card includes:
  - Visual indicator showing it's pinned (pin icon)
  - Unread state with highlighted border for posts not yet viewed (2px border in theme color)
  - Author information with profile picture and name
  - Post content preview (truncated to 3 lines with "show more" indication)
  - First media item (image/video) if present
  - Basic engagement metrics (reactions, comments)
- Special handling based on post type:
  - Poll posts show question and first 2 options in the pinned card
  - Media posts show first image/video with proper aspect ratio
  - Posts with files show file previews with option to see more
- Interaction capabilities:
  - Tapping a pinned post opens the full post view
  - Long-pressing a pinned post opens options menu
  - Post is marked as read after viewing
- Pinned posts appear differently based on context:
  - Global feed shows posts with "globalFeedPinnedAt" value
  - Channel feed shows posts with "channelPinnedAt" value
  - When a feed has only a single pinned post, it's shown inline at the top instead of in a carousel

### Priority 5: Advanced Content Experiences
This priority adds specialized content types and more complex post interactions. It focuses on interactive content like polls and announcement posts. These features provide additional engagement mechanisms beyond standard posts.

**User Story: View and Interact with Poll Posts**
As a mobile app user, I want to view and participate in polls so I can share my opinion and see community responses.

**Acceptance Criteria:**
- Posts containing polls display:
  - Poll question text with appropriate emphasis (larger font, bolder weight)
  - All poll options in a vertical list with proper spacing (12dp between options)
  - Current vote counts and percentages per option (e.g., "42 votes · 63%")
  - Total votes count at the bottom of poll (e.g., "67 total votes")
  - Clear UI for selecting an option (radio buttons for single-select, checkboxes for multi-select)
  - Visual indicator for options I've voted on (highlight, checkmark icon)
  - "See Results" button that appears when appropriate
- Poll-specific states:
  - Closed polls clearly marked as no longer accepting votes ("Poll closed" banner)
  - Single-select vs. multi-select polls visually distinct with helper text
  - Proper handling of when users can/cannot change votes
  - Option to view all voters for each option via a modal dialog
  - "See all options" button when poll exceeds the maximum display count (5 options)
- Poll interactions:
  - Vote submission shows loading state with spinner animation
  - Success confirmation with subtle animation when vote is registered
  - Error handling for failed vote submissions with retry option
  - Poll results update in real-time when votes are cast
  - Animated transitions when changing vote selection
- Proper handling for polls in different contexts:
  - Polls in feed posts
  - Polls in pinned posts (condensed view)
  - Polls in channel-specific contexts

**User Story: View Announcement Posts**
As a mobile app user, I want to view announcement posts so I can stay informed about important community information.

**Acceptance Criteria:**
- Announcements appear in multiple contexts with consistent styling:
  - Banner format at the top of feeds
  - Modal dialog format when directly accessed
  - Slider format when multiple announcements exist
  - Bubble format in channel headers
- Announcement visual styling:
  - Consistent announcement icon (megaphone icon) across all formats
  - Distinct background color to differentiate from regular posts
  - Emphasized title text with proper hierarchy
  - "See announcement" button when in compact formats
- Content presentation:
  - Support for rich text formatting via Lexical editor data
  - "See more" option for truncated announcements
  - Images displayed with proper aspect ratio
  - Link detection and formatting within announcement text
- Special announcement types:
  - Guideline announcements (special styling)
  - Pinned announcements (persistent visibility)
  - Community-wide announcements
- User interaction:
  - "Got it" button to acknowledge viewing
  - "Show me later" option to dismiss temporarily
  - "Don't show again" option for permanent dismissal
  - Reading state tracked per user
- Visibility and permissions:
  - Only shown to group members
  - Can be restricted to specific subscription tiers
  - Can be targeted to specific roles

### Priority 6: Advanced Creation Features
This priority provides power-user content creation capabilities. It includes creating polls, adding rich text formatting, embedding URLs, and attaching various file types. These sophisticated publishing tools enhance content creation for more complex use cases.

**User Story: Create Polls in Posts**
As a mobile app user, I want to create poll posts to gather feedback from the community.

**Acceptance Criteria:**
- Poll creation option available in post composer
- Poll interface includes:
  - Poll question/title field
  - Minimum of 2 option fields, with ability to add more options (up to 10)
  - Remove option capability for unwanted choices
  - Option to allow multiple selections vs. single choice
  - Poll duration selector (1 day, 3 days, 1 week, custom)
- Poll preview shows how poll will appear to users
- Validation ensures:
  - Question field is not empty
  - At least 2 options are provided
  - Option fields are not empty
  - Duration is selected
- Options to:
  - Add regular text along with the poll
  - Attach media alongside poll
- Poll settings:
  - Anonymous voting option
  - Show/hide results until closed option
  - Allow/disallow vote changes
- Appropriate keyboard navigation between fields
- Clear completion flow when poll is successfully created

**User Story: Add Rich Text Formatting**
As a mobile app user, I want to format my post text with rich formatting options.

**Acceptance Criteria:**
- Rich text toolbar available above keyboard with formatting options:
  - Bold, italic, underline formatting
  - Bullet points and numbered lists
  - Heading styles (H1, H2, H3)
  - Text alignment options (left, center, right)
- Formatting applied immediately on selection
- Selected text shows visual indicator of applied formatting
- Format options show as toggled when active
- Support for nested formats (e.g., bold + italic)
- Maintaining formatting when editing existing text
- Proper handling of formatting across paragraphs
- Format removal option (clear formatting)
- Keyboard shortcuts for common formatting (if platform supports)
- Interface adapts to screen size and orientation

**User Story: Embed URLs in Posts**
As a mobile app user, I want to embed URLs in my posts to share external resources with rich previews.

**Acceptance Criteria:**
- A dedicated URL embed button in post composer:
  - Located in composer toolbar alongside other media options
- URL entry modal:
  - Clean modal interface with clear title ("Add embed link")
  - Input field with placeholder text ("Paste a link to embed")
  - Validation to ensure URL format is correct
  - Submit and cancel buttons with appropriate states
  - Loading indicator during URL processing
- Integration with web embeds service:
  - Successful URL loading shows preview of link content
  - Preview includes image thumbnail when available
  - Title and description of linked content when available
  - Domain name displayed for context
  - Option to remove preview and try different URL
- Error handling:
  - Clear messaging when URL cannot be embedded
  - Fallback to plain text link if embedding fails

**User Story: Attach Files to Posts**
As a mobile app user, I want to attach different types of files to my posts so I can share various content formats with the community.

**Acceptance Criteria:**
- File attachment button in post composer:
  - Clear attachment/paperclip icon that indicates file upload functionality
  - Properly positioned in the composer toolbar
  - Tap action opens native file picker directly
- Native file picker integration:
  - File picker configured to allow multiple supported file types
  - Support for all common file formats:
    - Images: JPEG, PNG, GIF, WebP, SVG
    - Videos: MP4, MOV and other standard formats
    - Documents: PDF files
    - Audio: MP3, WAV, and other common audio formats
- File upload experience:
  - Progress indicator showing upload status
  - Preview of selected file(s) in composer before posting
  - Option to remove/cancel uploaded files
  - Clear error messages if file upload fails
  - File size limits with appropriate warnings based on file type:
    - Images: 40MB maximum
    - Videos: 1GB maximum on iOS/web, 500MB maximum on Android
    - Documents/PDFs: 1GB maximum
    - Audio files: 1GB maximum
- Multiple file support:
  - Ability to add multiple files to a single post (up to 6 files maximum per post)
  - Visual indication of file count (e.g., "2/6 files")
  - Support for mixed file types in a single post
- Post display with files:
  - Thumbnails for supported file types
  - Document/PDF icon for document uploads
  - Audio player for audio files
  - Indicator of file type and size for non-media files

**Technical Requirements Across All Stories:**
- Implement proper keyboard handling with KeyboardAvoidingView or equivalent
- Implement native components whenever possible in the first pass of feature development
- Support insets for notches, dynamic islands, and rounded corners on all devices
- Support both light and dark mode with appropriate contrast ratios (4.5:1 minimum)
- Maintain responsive layouts across device sizes (iPhone SE to Max, small Android to tablets)
- Implement proper loading states for all network operations
- Implement error handling with specific, user-friendly error messages
- Use proper Analytics event naming convention: noun_verb (e.g., post_created)
- Support offline composition with local storage and background upload queue
- Implement appropriate permissions checks before showing privileged actions
- Performance targets:
  - Feed scrolling: 60fps minimum
  - Image loading: 500ms maximum
  - Post submission: 1s server response maximum
  - App memory usage: <150MB during normal operation
- Optimize bundle size by using proper code splitting and lazy loading
