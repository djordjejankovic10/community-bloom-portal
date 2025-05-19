### Priority 5: Advanced Content Experiences
This priority adds specialized content types and more complex post interactions. It focuses on interactive content like polls and announcement posts. These features provide additional engagement mechanisms beyond standard posts.

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