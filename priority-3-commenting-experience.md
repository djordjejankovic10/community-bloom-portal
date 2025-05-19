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
  - Momentarily highlight the newly created reply with a subtle animation (pulsing highlighting) and haptic feedback
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