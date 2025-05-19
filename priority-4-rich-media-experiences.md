### Priority 4: Rich Media Experiences
This priority enhances how users view and interact with different media types in the feed. It includes support for photos, videos, link previews, and pinned content. These features create a more engaging and visual content experience.

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
  - Same text truncation rules apply (up to 3 lines visible) with "show more" logic.
  - "Show more" button appears below the text and triggers full content view.
  - Full content view displays the entire text
- Photo handling includes:
  - Progressive loading with low-resolution placeholders
    - Initially display a shimmer animation over a light gray placeholder matching image dimensions
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

**User Story: View Videos in Feed Posts**
As a mobile app user, I want to see video content in feed posts so I can engage with dynamic media shared by the community.

**Acceptance Criteria:**
- Video posts display properly in the feed:
  - Video thumbnail displays with play button overlay centered on the thumbnail
  - Similar size constraints as photos (600px max height in feed)
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
    - All videos must maintain their original aspect ratio in playback states, regardless of whether they are portrait (vertical) or landscape (horizontal) orientation. Play both portrait (9:16) and landscape (16:9) videos and verify that no stretching, cropping or distortion occurs in full playback view.
    - When a post contains multiple videos with different orientations (portrait and landscape mixed), all videos must appear with a consistent container size without jarring layout shifts when swiping between them (just like images)
  - Background state properly handled when navigating away from video
- Video handling includes:
  - Loading indicators while video initializes
    - Display a shimmer animation over a light gray video thumbnail placeholder
    - Center a pulsing play button icon that indicates loading state (different from the standard play button)
    - Maintain consistent dimensions to prevent layout shifts when the video loads
    - Transition smoothly from loading state to thumbnail with a brief fade animation
  - Error states for failed video loads
    - Display a placeholder with retry option when videos fail to load, using a light gray background with video icon and brief error message
    - Maintain layout integrity with proper spacing and dimensions matching the expected video size
- Video optimization:
  - Efficient video loading
  - Appropriate video quality based on display size
  - Responsive sizing to fit different screen dimensions
 
**User Story: View Pinned Posts**
As a mobile app user, I want to see important pinned posts at the top of my feed for quick access to essential community information.

**Acceptance Criteria:**
- Pinned posts appear in a dedicated section at the top of the feed, before regular posts
- Pinned posts appear in a horizontal carousel:
  - Cards are ~284px width and ~360px height with proper padding and spacing
  - Users can swipe horizontally to browse through pinned posts
  - Pagination indicator shows current position in the carousel
  - Last slide has right padding to prevent cutoff
- Each pinned post card includes:
  - Unread state with highlighted primary-colored border (2px) for posts not yet viewed
  - Author information with profile picture, name, and role badge when applicable
  - Post timestamp positioned next to the author name to match regular posts
  - Category badge (e.g., "yoga", "weight-training") displayed alongside other badges
  - Role badges for special users (e.g., "founder", "admin", "moderator") displayed consistently with regular posts
  - Post content displayed with 14px font size
  - Content truncated to 5 lines for posts with media
  - No special truncation for text-only posts (displays full content within card constraints)
  - Basic engagement metrics (likes, comments)
- Media handling in pinned posts:
  - Images displayed with w-full and h-full within their container
  - Ensure media fills available space properly
  - Multiple images show all images with a counter indicator (e.g., "1/3") in the top right corner
  - Image-only posts (no text) maximize the image display area
  - Various aspect ratios are supported (landscape, portrait, square)
  - Media is positioned below truncated text with appropriate spacing
- Read/unread state handling:
  - Unread posts have a distinct 2px primary-colored border
  - Read state is tracked per post
  - Read state persists between sessions
  - Posts are only marked as read when explicitly clicked, not when viewed in carousel
- Interaction capabilities:
  - Tapping a pinned post opens the full post view
  - Post is marked as read only when explicitly clicked, not on carousel viewing
- Expand/collapse functionality for the pinned posts section
- Visual pin icon indicating posts are pinned

**User Story: View URL Previews in Posts**
As a mobile app user, I want to see rich previews of URLs shared in posts to get context without leaving the app.

**Acceptance Criteria:**
- URLs in post content are automatically detected using regex pattern
- For detected URLs, a rich preview card is displayed below the post text showing:
  - Preview image from the link (left side of card, square aspect ratio)
  - Link title with proper truncation (max 2 lines)
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