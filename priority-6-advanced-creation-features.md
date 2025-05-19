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
