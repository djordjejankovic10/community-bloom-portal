# PRD - Mobile Community Feed and Post Creation

*Note: Enable Chrome Zoom extension for optimal image viewing*

## TL;DR

This feature introduces a comprehensive mobile-first social feed and post creation system as part of Project Rebase, which merges Kajabi's Branded Mobile App (BMA), Kajabi Member App (KMA), and Kajabi Communities App (KCA) into a single unified codebase. The new native implementation of communities will replace the current webview approach, offering significantly improved performance, enhanced user experience, and seamless integration with other Kajabi products. By implementing a modern interface with support for rich media, polls, replies, and reactions, we'll increase engagement metrics by 35%+ while simplifying the ecosystem for both members and Heroes. This strategic merger impacts over 1 million monthly active users across all three existing apps and addresses a critical customer pain point: the fragmentation between course content and community interactions.

## Narrative

Sarah, a fitness enthusiast, opens her Kajabi mobile app and immediately sees a well-organized feed of posts from her fitness community alongside her enrolled courses. She notices a pinned post from the community founder highlighting an upcoming challenge, which appears directly in her main feed rather than requiring her to switch to a separate app. While scrolling, she sees posts with images showing workout techniques, videos demonstrating exercises, and polls asking about preferred training methods—all loading quickly with native performance.

Sarah decides to share her own progress by creating a post. She taps the compose button, writes about her recent milestone, attaches before-and-after photos, and adds the hashtag #TransformationTuesday. She selects the "Weight Training" category and publishes her post. Shortly after, she receives reactions and comments from community members congratulating her. She engages with these interactions by responding to comments and reacting to others' posts, feeling connected and motivated by the supportive community experience. When she wants to reference course material related to her achievement, she can do so without switching apps, creating a seamless learning and community experience.

## Project Context

This implementation is a critical component of Project Rebase, which aims to merge three separate Kajabi apps into a unified experience:

- **Kajabi Member App**: 811k MAU
- **Kajabi Communities App**: 123k MAU 
- **Kajabi Branded App**: 98k MAU

The current fragmentation creates significant challenges:
- Inconsistent user experience across different apps
- Duplicated development effort and slower release cycles
- Increased bug reports (22% increase in Q1 2025 compared to Q4 2024)
- User confusion about which app to use for what purpose
- Multiple login requirements creating friction

By rebuilding the communities experience with native components instead of webviews, we'll address the top reported issues:
- Media playback issues (26% of bugs)
- UI/UX navigation/scrolling issues (10.2% of bugs)
- Performance and loading problems (10% of bugs)
- Account and login difficulties (8.2% of bugs)

This native implementation will serve as the foundation for both free and branded experiences, with BMA being differentiated through customization, in-app purchases, and push notification capabilities.

## Key Personnel

| Role | Name |
|------|------|
| PM | Djordje Jankovic |
| EM | Patrick MacDowell |
| UX | [TBD] |
| Status | Planning |

## Customer Problems

**Fragmented User Experience Across Multiple Apps**
Members and Heroes currently navigate between multiple apps to access courses and community content, creating significant friction and confusion. This separation leads to reduced engagement as users often abandon one experience rather than switching contexts. Heroes consistently report that having separate apps for courses and communities is their biggest pain point, with many considering competing platforms that offer unified experiences.

**Limited Engagement Options in Mobile Community Spaces**
Mobile users currently lack robust ways to interact with community content, resulting in passive consumption rather than active participation. Without intuitive reaction systems, threaded replies, and visible engagement metrics, users struggle to meaningfully connect with content and other community members, leading to lower retention and engagement metrics.

**Cumbersome Content Creation on Mobile Devices**
Creating rich, engaging content on mobile devices is often frustrating and limited compared to desktop experiences. Users struggle with attaching media, formatting text, and creating interactive content like polls, causing many to delay sharing until they can access a desktop interface. This reduces spontaneous content creation that keeps communities vibrant.

**Poor Media Consumption Experience**
Existing mobile community interfaces (especially in the webview implementation) provide suboptimal experiences for viewing different media types (images, videos, URLs). Media elements are frequently misaligned, improperly sized, or difficult to interact with on smaller screens. This frustrates users and diminishes the impact of visual content that's critical for engagement in fitness and wellness communities.

**Fragmented Discussion Threads**
Community conversations are difficult to follow without proper threading and comment organization. Replies get lost in chronological feeds, making it challenging to track discussions and deterring meaningful conversation. This is particularly problematic for questions, polls, and educational content where discussion context is crucial.

## Why Will It Be Successful?

- **Community-Course Integration:** By bringing courses and communities into a single app, we directly address the #1 pain point reported by Heroes and their members, solving a problem that competitor platforms like Circle and Skool are using against us.

- **User-Focused Design:** Our mobile-first approach addresses specific pain points identified through user feedback, with particular attention to engagement and content creation workflows optimized for touch interfaces.

- **Native Performance Gains:** Replacing webviews with native components will dramatically improve load times, responsiveness, and stability, addressing the 46%+ of reported bugs related to performance, media playback, and UI issues.

- **Engagement-Driven Architecture:** Every feature is designed specifically to increase user activity metrics - the reaction system encourages quick interactions, the improved media experience makes content more compelling, and the threading system facilitates deeper conversations.

- **Business Alignment:** While including communities in the free app might seem to reduce BMA's unique value, it actually boosts overall Hero success and long-term Kajabi revenue by providing a better experience to all 1M+ members, not just BMA users (100k MAU). When Heroes succeed in engaging their audience, they're more likely to retain and upgrade their Kajabi subscriptions.

## Success Metrics

### Business Metrics
- **Integrated Community MAU:** Increase from 112k (78k iOS + 34k Android) to 135k (94k iOS + 41k Android) by EOY, achieving 5% month-over-month growth
- **Subscription M1 Retention:** 3 percentage point improvement in subscriber retention
- **Cross-App Migration:** 80% of active Communities App users successfully transition to the unified app within 3 months

### Admin Metrics
- **Content Creation:** 30% increase in daily mobile post creation within 3 months of launch
- **Creator Retention:** 25% improvement in 30-day creator retention rates compared to baseline
- **Admin Engagement:** 40% increase in admin/moderator interactions with community content
- **Rich Media Usage:** 50% of all posts include at least one media element (image, video, poll, etc.)

### Member Metrics
- **Daily Active Users:** 35% increase in DAU/MAU ratio within 3 months of launch
- **Session Length:** Average session duration increases by 40% compared to pre-launch baseline
- **Engagement Rate:** 45% increase in reactions, comments and shares per user per session
- **Response Time:** Average time to first comment on new posts decreases by 50%
- **Mobile Retention:** 28-day retention rate improves by 20% for mobile app users
- **Feature Adoption:** 70% of users engage with at least one new feature (reactions, polls, etc.) within first week

## Proposed Solution

> **Context**: Our solution takes a mobile-first approach to community engagement, prioritizing touch-friendly interfaces, optimized media viewing, and streamlined content creation. The implementation follows a progressive enhancement model, starting with core functionality and building toward more advanced features. The design emphasizes visual clarity, performance optimization, and alignment with mobile platform guidelines. As a key component of Project Rebase, this native communities implementation will replace the current webview approach, ensuring the unified app offers a cohesive, high-quality experience for both free and branded users.

### Requirements

#### Priority 1: Basic Post Component
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
      - Text appears with 16px font size, line height 22px
      - Text uses system font with regular weight
- Feed has a clear empty state when no posts are available (need design)
- Basic pull-to-refresh functionality is implemented

**User Story: View Post Engagement Metrics**  
As a mobile app user, I want to see engagement metrics on posts so I can understand post popularity.

**Acceptance Criteria:**
- Each post displays post engagement metrics in a footer section below post content:
  - Reaction count showing total number of reactions for each type (e.g., 👍❤️😂), with the order of highest to lowest count left to right.
  - Comments count with comment icon
  - Tapping on comments count navigates to post details view focused on comments
  - Metrics use appropriate condensed format for large numbers (e.g., "1.2K" instead of "1,234")
  - Tapping on reaction count opens a reaction details bottom sheet showing:
    - Tabs for filtering by reaction type ("All", and individual reaction types, sorted highest to lowest count left to right)
    - List of users who reacted with their profile pictures, names, reaction emoji and membership tags (admin, founder etc)
    - Ability to load more reactions (lazy loading) when scrolling
    - Sheet is dismissed by pulling it down or tapping outside of it.
- Metrics are positioned in a clear footer section that separates them from post content
- Metrics use appropriate text styles (smaller than post text, secondary color)
- Metrics footer provides visual spacing between content and interaction buttons below
- Zero counts never display (do not show "0" rather hide reaction/comment metric)
- Highly engaging posts with many reactions/comments don't cause visual issues

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
    - Available reactions include:
      - Inspired (👍) - Default reaction, also serves as "Like"
      - Love (❤️)
      - Haha (😂)
      - Wow (😮)
      - Sad (😢)
      - Angry (😡)
    - Each reaction is visually distinct with appropriate emoji and color
    - Tapping any reaction applies it immediately (Metrics update in real-time when user interactions occur)
  - Comment button that:
    - Shows comment icon with "Comment" text label
    - Tapping opens post details view and focuses on comment input field (reply comment story)
    - Includes proper spacing between buttons for touch targets
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
    - Deleting posts is allowed for post authors, channel owners, group leaders/founders, and community moderators/admins.
  - For moderators/admins:
    - Pin/unpin post - (separate user story, make non functional for now until pinning is built)
- Menu appearance:
  - Slides up as a bottom sheet on mobile devices
  - Uses appropriate animations for opening/closing (250ms duration)
  - Has proper spacing between options (min 48dp height per item)
  - Includes icons for each action aligned to the left
  - Shows clear dividers between permission groups
- Proper permission checks implemented to only show relevant options
- Success/error handling for each action with appropriate toast messages

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

**User Story: View User Roles and Badges in Posts**  
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
  - Tapping on username/avatar opens user profile with complete badge collection (separate scope)

#### Priority 2: Content Creation Basics
This priority focuses on the fundamental content creation and editing functionality. It includes creating text posts, editing existing content, and attaching basic media types. These features enable users to contribute and share their own content within the community.

**User Story: Compose Basic Text Post**  
As a mobile app user, I want to create a new text post so I can share my thoughts with the community.

**Acceptance Criteria:**
- Post composer accessible via prominent FAB (floating action button) in feed
- Composer screen includes:
  - Clear header indicating "New Post" or "Create Post"
  - Text input field with appropriate placeholder text
  - Channel/circle selector to choose where to post
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

**User Story: Edit Existing Posts**  
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
  - Media management:
    - Existing media files are shown and can be removed
    - New media can be added (up to 6 files total)
  - Support for editing same content types as in post creation:
    - Text content
    - Images/photos
    - Videos
- Edit submission and feedback:
  - Save/Update button to confirm changes
  - Loading state during update submission
  - Momentarily highlight the newly updated post with a subtle animation (pulsing highlight) and haptic feedback
  - Error handling with clear error messages if update fails
  - After successful update, return to feed with updated post visible
- Special case handling:
  - Rich text/lexical data editing includes appropriate warning about formatting loss
  - Poll edits maintain votes while allowing question/option text changes

**User Story: Mention Users in Posts**  
As a mobile app user, I want to @mention other users in my posts to notify them.

**Acceptance Criteria:**
- User can type @ symbol to trigger mention suggestion interface
- Mention suggestions show:
  - Profile pictures of suggested users (with UserAvatar component)
  - User names with role badges where applicable
  - Empty state when no matches found
- Type-ahead/autocomplete functionality for mentions:
  - Suggestions appear in real-time as user types after @ symbol
  - Suggestions filtered based on typed characters after @:
    - Direct name matching for 1-2 characters (first/last name contains filter)
    - Full text search for 3+ characters
  - Up/down keyboard navigation through suggestion list (if supported by platform)
  - Tap or press Enter/Return to select a suggestion
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
  - Reordering of multiple images with drag-and-drop
- Support for common image formats:
  - JPEG, PNG for standard photos
  - GIF for animated content
- Image editing capabilities:
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
  - Camera option to record video directly
  - Gallery option to select existing videos
- Video selection interface supports:
  - Preview thumbnails of videos
  - Ability to play video previews before posting
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

#### Priority 3: Commenting Experience
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
    - Button shows count of remaining replies (e.g., "Show 5 more replies")
    - Loading indicator appears when fetching additional replies
    - Once expanded, all replies in that thread remain visible
  - Empty state when post has no comments with appropriate message
  - Proper handling of media attachments in comments (images, videos, files)
  - Long-press on comment shows options menu (react, reply, copy text, report)

**User Story: Add Comments and Replies to Posts**  
As a mobile app user, I want to add comments and replies to posts so I can participate in conversations.

**Acceptance Criteria:**
- Comment input field at bottom of screen with:
  - User's avatar showing beside input field
  - Placeholder text ("Write a comment...")
  - Media attachment button for adding images/videos
  - Input field expands as content is added (up to 5 lines, then scrollable)
  - Send button that's disabled until content is entered
- Reply functionality:
  - Reply button on comments initiates a reply in a full screen bottom sheet
  - Reply interface includes which comment is being replied to
  - User can cancel reply to return to standard commenting
  - Replies appear properly threaded in the comment view
- Comment/reply submission:
  - Visual feedback during submission (loading indicator underneath the post)
  - Newly added comment appears immediately in the list
  - Error handling for failed comment submission
  - Momentarily highlight the newly created reply with a subtle animation (pulsing highlight) and haptic feedback.
- Media in comments:
  - Support for attaching images to comments (up to 6 per comment)
  - Preview thumbnails of attached media show in input field
  - Error handling for failed media uploads
  - Permissions and moderation:
    - Comment editing workflow:
      - Long-press on own comment reveals action sheet with "Edit" option
      - Selecting "Edit" transforms the comment into an editable input field with existing content pre-populated
      - "Editing Message" indicator appears above the input field
      - Close button (X) allows canceling the edit without saving
      - Media attachments remain editable (can add/remove)
      - Submit button updates to "Update" text during editing
      - Success confirmation toast displayed after successful edit ("Your comment was updated successfully!")
    - Option to delete own comments with confirmation
    - Moderators, admins, and group leaders can delete any comment
    - Comments from blocked users are hidden automatically

#### Priority 4: Rich Media Experiences
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
    - Image height limited to 300px maximum in feed view
    - Image width spans the full post width with 16dp padding on sides
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

#### Priority 5: Advanced Content Experiences
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
  - Option selection behaves appropriately for poll type:
    - Single-select: tapping an option selects it (radio button) and automatically deselects prior choice
    - Multi-select: tapping an option toggles its selection state (checkbox)
  - Vote button shows clear CTA text (e.g., "Vote" or "Submit Choices")
  - Vote button is disabled until valid selection(s) made
  - Real-time update of results after voting
  - Appropriate loading and success states during/after vote submission
  - Error handling for failed vote submission with retry option
  - Anonymous polls show only counts/percentages, not voter lists
  - Non-anonymous polls allow seeing specific users who voted for each option
- Voting limitations and permissions:
  - Users can vote only once in single-select polls
  - Users can select up to the maximum allowed options in multi-select polls
  - Clear indication when user has already voted
  - Permissions check to ensure user can vote in the poll
  - Appropriate feedback when poll is closed or user doesn't have permission

**User Story: Create Poll Posts**  
As a mobile app user, I want to create poll posts to gather feedback from the community.

**Acceptance Criteria:**
- Poll creation interface accessible from post composer:
  - Poll icon/button clearly visible in composer toolbar
  - Tapping poll icon transforms composer to poll creation mode with appropriate layout changes
  - User can still add text content above poll
- Poll creation interface includes:
  - Question field with appropriate placeholder text
  - Minimum of 2 option fields pre-populated
  - "Add Option" button to add more options (up to 10 total)
  - "Remove" button next to each option to delete it (minimum 2 options required)
  - Option to toggle between single-select and multi-select poll types
  - For multi-select polls, ability to set maximum number of choices allowed
  - Duration selector with preset options (1 day, 3 days, 1 week, 2 weeks, 1 month, Never)
  - Settings for poll visibility:
    - Anonymous voting option toggle
    - Results visibility toggle (show results before/after voting)
- UI components and validation:
  - Question field has character limit with counter
  - Each option field has character limit with counter
  - Submit button disabled until minimum requirements met:
    - Question field not empty
    - At least 2 option fields not empty
  - Error messaging for invalid poll configurations
- Poll preview section shows how poll will appear in feed
- Creation and posting flow:
  - Post button shows appropriate loading state during submission
  - Error handling for failed poll creation with specific messages
  - Success confirmation returns user to feed with new poll visible
  - Newly created poll highlighted momentarily in feed

**User Story: Create Announcement Posts**  
As a community admin or creator, I want to create special announcement posts that stand out in the feed and reach more members.

**Acceptance Criteria:**
- Announcement creation option:
  - Available only to admin/moderator roles
  - Accessible from post composer via "Announcement" toggle or special post type selector
  - Clear visual indication when announcement mode is active
- Announcement post creation includes:
  - All standard post creation capabilities (text, media, mentions, etc.)
  - Additional announcement-specific fields:
    - Priority level selector (Normal, Important, Urgent) with appropriate visual treatments
    - Duration options (how long to keep as announcement: 1 day, 3 days, 1 week, 2 weeks, permanent)
    - Target audience selector (all members, specific groups/channels)
    - Option to send push notification to members based on priority
    - Option to pin to top of feed
  - Preview of how announcement will appear in feed
- Announcement post appearance in feed:
  - Distinctive visual styling based on priority level:
    - Normal: subtle branded background color
    - Important: more prominent background color with border
    - Urgent: high-visibility background color with alert icon
  - "Announcement" badge clearly visible in post header
  - Time-sensitive announcements show expiration countdown when applicable
  - Dismissible by user with "Mark as read" option
  - Once dismissed, announcement returns to normal post styling
- Metrics and management:
  - View count tracking for admins/creators
  - Ability to edit/update announcement without losing metrics
  - Option to extend/shorten duration or change priority
  - Analytics dashboard for viewing announcement effectiveness (separate scope)

## Phased Approach

### Milestone 0: Internal TestFlight/Play Store Release (Target: May 12, 2025)
- Basic post component with text and engagement metrics
- Post interaction elements (reactions, comments)
- View comments and add basic text comments
- Simple post creation with text only
- Report and moderation features
- Internal testing across Kajabi team

### Milestone 1: App Store Submission (Target: May 26, 2025)
- Submit iOS and Android builds with Communities hidden
- Complete all core feed components
- Finalize comment system
- Ensure cross-platform consistency
- Verify backward compatibility

### Milestone 2: Beta with Select Heroes (Target: July 14, 2025)
- Release update with Communities enabled for beta participants
- Navigation menu for Communities
- View/sort/filter feed and comments
- Create/edit/delete posts and comments
- Post reactions (likes)
- Announcements and new user guidelines
- Notifications system
- Rich media support (photos, videos, links)
- Everything else remains in webview (DMs, meetups, challenges, settings)

### Milestone 3: Native DMs (Target: August 15, 2025)
- Replace webview DMs with native implementation
- Photo and video attachments in posts
- URL previews in posts
- Pinned posts
- Advanced sorting and filtering
- Address beta feedback

### Milestone 4: Full Public Release (Target: September 15, 2025)
- Full public rollout
- Communities App redirect to Kajabi Member App
- Communities App store listing removal
- Final optimizations based on beta feedback
- Complete transition to native components for core features

### Future Enhancements (Post-September 2025)
- Poll creation and interaction
- Rich text formatting
- Enhanced file attachments
- Advanced analytics for creators
- Premium community features

## Development Estimates

| Task | Estimate (days) |
|------|-----------------|
| Core Feed Components | 12 days |
| Post Interaction System | 8 days |
| Comment System | 10 days |
| Media Upload and Display | 14 days |
| Post Creation Interface | 9 days |
| Navigation Integration | 5 days |
| Notifications System | 6 days |
| Native DMs | 15 days |
| User Testing & Refinement | 10 days |
| **Total** | **89** days |

## Risks & Dependencies

| Risk/Dependency | Mitigation Strategy |
|-----------------|---------------------|
| We're replacing the live Communities app entirely — which means once we ship, we can't roll back or run A/B tests | Extend internal testing period before production deployment. Implement feature flags to enable gradual rollout. Conduct extensive QA with real-world usage patterns. Create a comprehensive monitoring dashboard to catch issues early. |
| User transition from Communities App to unified app could cause disruption and potential member churn | Create seamless migration path with automatic authentication between apps. Implement clear in-app guidance for transitioning users. Provide Heroes with communication templates to help their members through the transition. Monitor transition metrics closely and rapidly address any friction points. |
| Apple App Store rejection risk as community features may remove reader app exemption | Implement in-app purchase options for Kajabi courses to satisfy App Store requirements. Ensure app reviewer can access community content. If needed, develop a marketplace approach for monthly content access to satisfy IAP requirements. |
| Android development capacity constraints creating feature parity risks | Prioritize core features to ensure both platforms launch with equivalent functionality. Consider temporary contractors for Android development if timeline requires. Create cross-platform components where possible to maximize code reuse. |
| Performance degradation with media-heavy feeds | Implement progressive loading, media compression, and virtualized lists. Set up performance monitoring with alerts for degradation. Conduct load testing with simulated high-volume feeds of mixed content types. |
| Media upload failures in poor connectivity | Develop robust offline support with background uploading and retry logic. Implement chunked uploads for larger files. Add clear visual indicators for upload status and temporarily store draft posts locally. | 