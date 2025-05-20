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
  - Support for continuing text composition while images upload
- Proper error states for failed image loads:
  - Display a placeholder with retry option when images fail to load, using a light gray background with broken image icon and brief error message
  - Maintain layout integrity with proper spacing and dimensions matching the expected image size
- Photo handling includes:
  - Progressive loading with low-resolution placeholders
    - Initially display a shimmer animation over a light gray placeholder matching image dimensions
    - As soon as available, show a very low-resolution thumbnail (10-20% of original size) that fills the entire container
    - Gradually transition to higher resolution versions as they load (LQIP - Low Quality Image Placeholder technique)
    - Maintain consistent dimensions to prevent layout shifts during the progressive loading process
    - Use a subtle cross-fade transition between loading states to avoid jarring visual changes
  - Proper handling of portrait vs. landscape orientations
    - Always preserve aspect ratio - Never stretch or distort images
    - Portrait images (taller than wide) must scale to either 600px maximum height or container width (whichever constraint is hit first), while landscape images (wider than tall) must scale to fit the full container width with height determined by aspect ratio. Test: Compare side-by-side rendering of portrait and landscape images to verify consistent, appropriate scaling.
    - For carousels with mixed portrait and landscape images, maintain a consistent height for all images if any portrait image (aspect ratio < 1) is present. This approach uses a fixed 600px height with center-cropping for landscape images to maintain visual consistency during swiping.
    - When all images in a carousel are landscape orientation, maintain natural height with a maximum of 600px.
    - Extremely tall images (beyond 9:16 aspect ratio or less than 0.5625 ratio) should be center-cropped with a fixed height of 600px to ensure the width is always maximized while maintaining the center focus of the image. This prevents very narrow displays of tall vertical images.
    - All images must be centered horizontally with consistent 8dp rounded corners and proper padding (16dp on sides), with no unnecessary white space or abrupt layout shifts when loading. 
Test edge cases - Very tall/narrow images, panoramas, etc.
  - Proper error states for failed image loads
    - Display a placeholder with retry option when images fail to load, using a light gray background with broken image icon and brief error message
    - Maintain layout integrity with proper spacing and dimensions matching the expected image size
  - Fallback for unsupported image types
  - Proper handling of animated GIFs
Suggested optimizations
- File size optimization implemented for faster loading
- Image caching implemented for better performance

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