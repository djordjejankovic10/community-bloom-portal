### Priority 3: Commenting Experience
This priority covers the core commenting functionality that enables discussions on posts. It includes viewing, creating, and replying to comments with text and media. These features are essential for user engagement and community interaction around content.

**User Story: View Comments on Posts**
As a mobile app user, I want to view comments on posts so I can follow community discussions.

**Acceptance Criteria:**
- Tapping comment button or comment count opens post details view showing:
  - Original post content at top (fully expanded)
  - Comments section below with chronological ordering (oldest to newest)
  - Each comment includes:
    - Commenter's profile picture
    - Commenter's name with appropriate badges
    - Comment timestamp in same format as posts
    - Comment text with proper wrapping
    - Reaction button showing current reaction count
    - Tapping on reaction counter opens up the bottom sheet with profiles who reacted (just like the main post component)
    - Reply button for threaded conversations
  - Show all comments with lazy loading when scrolling (infinite scroll)
  - Loading indicator appears when fetching additional comments
  - Reply threads show proper indentation to visualize conversation hierarchy
    - Show only the first reply in each thread by default
    - Display a "View n replies" button below the first reply when additional replies exist
    - For nested replies (replies to replies), follow the same pattern: show only first nested reply with "View n replies" below it
    - Loading indicator appears when fetching additional replies
    - Animate expansion so its smooth (avoid choppy experience).
    - Once expanded, all replies in that thread remain visible
    - Maximum nesting depth of 3 levels (original comment → reply → reply to reply → reply to reply to reply)
  - Empty state when post has no comments with appropriate message

**User Story: View Media in Comments**
As a mobile app user, I want to view media attachments in comments so I can fully engage with visual content shared in discussions.

**Acceptance Criteria:**
- Media display within comments:
  - Media attachments appear within the comment "bubble" with rounded corners (8px radius) matching the comment styling
  - Single photo/video displays at full width of the comment with aspect ratio preserved (max height 400px)
  - Multiple media handling:
    - For multiple media items (up to 6), pagination dots appear below content
    - Visual indicator shows "+X more" in the corner when there are multiple items
    - Consistent height maintained for mixed orientation images in carousel
  - Proper handling of portrait vs. landscape orientations:
    - Always preserve aspect ratio - never stretch or distort images
    - Portrait images scale to max height or container width (whichever constraint is hit first)
    - Landscape images scale to fit full container width with height determined by aspect ratio
    - Extremely tall images (beyond 9:16 aspect ratio) should be center-cropped with fixed height
  - Videos show play button overlay centered on the thumbnail
  - Video thumbnails maintain same size constraints as photos
  - Videos don't autoplay in comments
- Media interaction:
  - Tapping image opens full-screen photo viewer with zoom capability
  - For multiple media items, swipe navigation between items in full-screen mode
  - Position indicator shows current position (e.g., "2/5") for multiple items
  - Videos play in appropriate player when tapped
  - Video player includes standard controls (play/pause, seek, volume)
  - Tap X or swipe down to dismiss full-screen viewer
- Loading and error states:
  - Progressive loading with low-resolution placeholders
  - Initially display shimmer animation over light gray placeholder
  - Maintain consistent dimensions during loading to prevent layout shifts
  - Error states for failed media loads with retry option
- Optimizations:
  - Lazy loading media only when scrolled into view
  - Image caching implemented for better performance


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

**User Story: Add Media to Comments**
As a mobile app user, I want to attach media to my comments so I can share visual content in discussions and better express my ideas.

**Acceptance Criteria:**
- Media attachment interface:
  - Media attachment button in comment input field shows media picker when tapped
  - Media picker offers options to select from gallery or capture new media
  - Support for attaching up to 6 media items per comment (part of overall 6 file maximum)
  - Media preview thumbnails appear in the input area before sending
  - Counter indicator shows current media count (e.g., "3/6")
- Media selection and editing:
  - Gallery selection allows choosing multiple media items at once
  - Camera/video capture integrates with native device capabilities
  - Each selected media item shows remove button (X) for deletion before sending
  - Warning appears when attempting to exceed maximum media count
  - Error messages for invalid file types or oversized files
- Upload process:
  - Loading indicators display while media uploads:
    - Progress indicator shows upload status with percentage or visual progress
    - Comment send button disabled until upload completes
  - Error handling for failed uploads with retry option
  - Size constraints and optimization:
    - File size limits enforced (10MB for images, 50MB for videos)
    - Automatic compression offered for large files
    - Image quality optimized for mobile viewing
  - Background uploading allows continuing to type comment during media upload
- Media display follows same specifications as in "View Media in Comments"
  - Consistent rendering between preview and final posted appearance
  - Proper handling of different media orientations and aspect ratios

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
  - Send button that's disabled until content is entered
- Reply composition features:
  - Mention functionality with @ symbol to tag other users (just this for now, other buttons come later)
  - All buttons appear in a toolbar at the bottom of the sheet
- Reply submission:
  - Visual feedback during submission (loading indicator)
  - Newly added reply appears immediately in the thread with proper indentation
  - Error handling for failed reply submission
  - Sheet automatically closes after successful submission
  - Momentarily highlight the newly created reply with a subtle animation (pulsing highlighting) and haptic feedback
- Media in replies:
  - Support for attaching up to 6 media items per reply (part of overall 6 file maximum)
  - Same media selection, preview, and upload process as regular comments
  - Media picker integrated in the reply bottom sheet
  - Preview thumbnails appear in reply composition area before sending
  - Loading indicators show upload progress with percentage or visual indicator
  - Error handling for failed uploads with retry option
  - Media displays in replies following same specifications as in comments
  - Size constraints and optimization consistent with comment media
- Reply threading and visibility:
  - Replies appear indented under the parent comment with appropriate connecting lines
  - Proper visual hierarchy maintained for deeply nested replies
  - Visual design maintains thread context at all levels of nesting
- Reply editing and moderation:
  - Same editing and deletion capabilities as regular comments
  - Same permission structure applies (own replies editable/deletable, moderators can delete any reply)

