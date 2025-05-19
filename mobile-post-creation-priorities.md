# Mobile Post Creation Priorities

| Priority | Description | User Stories | Documentation |
|----------|-------------|--------------|--------------|
| 1: Basic Post Component | This priority includes the core elements needed to display posts in a feed. It covers the basic post UI structure, engagement metrics, and fundamental interaction capabilities. These components form the essential foundation of the social feed experience. | - View Basic Feed Structure<br>- View Post Engagement Metrics<br>- View Reaction Details<br>- View Post Interaction Elements<br>- Access Post Options Menu<br>- Report Post Content<br>- View User Roles and Badges in Posts | [Documentation](https://docs.google.com/document/d/1DOAHEm0F69Na0QZ5ndFiW2IwWVNlvWM1L64eS_8iVf4/edit?usp=sharing) |
| 2: Content Creation Basics | This priority focuses on the fundamental content creation and editing functionality. It includes creating text posts, editing existing content, and attaching basic media types. These features enable users to contribute and share their own content within the community. | - Compose Basic Text Post<br>- Edit Existing Basic Text Posts<br>- Mention Users in Posts<br>- Attach Photos to Posts<br>- Attach Videos to Posts | [Documentation](https://docs.google.com/document/d/1A_mGhWn0hmy_IGLw6DKSTCbmY-rWzEDlb2BuJGGCk7s/edit?usp=sharing) |
| 3: Commenting Experience | This priority covers the core commenting functionality that enables discussions on posts. It includes viewing, creating, and replying to comments with text and media. These features are essential for user engagement and community interaction around content. | - View Comments on Posts<br>- View Media in Comments<br>- Add Comments to Posts<br>- Add Media to Comments<br>- Reply to Comments<br>- Edit Comments/Replies | [Documentation](https://docs.google.com/document/d/1BYwBsOZWqTGI8evSvRfBMzWAk7EEvqspHSObYrSgIaI/edit?usp=sharing) |
| 4: Rich Media Experiences | This priority enhances how users view and interact with different media types in the feed. It includes support for photos, videos, link previews, and pinned content. These features create a more engaging and visual content experience. | - View Photos in Feed Posts<br>- View Videos in Feed Posts<br>- View URL Previews in Posts<br>- View Pinned Posts with Read/Unread States | [Documentation](https://docs.google.com/document/d/1kGW26AkBu6n327LYNUFQfa1OjzNt9EjxO7RcYCGDzqY/edit?usp=sharing) |
| 5: Advanced Content Experiences | This priority adds specialized content types and more complex post interactions. It focuses on interactive content like polls and announcement posts. These features provide additional engagement mechanisms beyond standard posts. | - Filter and Sort Feed Content<br>- View and Interact with Poll Posts<br>- View Announcement Posts | |
| 6: Advanced Creation Features | This priority provides power-user content creation capabilities. It includes creating polls, adding rich text formatting, embedding URLs, and attaching various file types. These sophisticated publishing tools enhance content creation for more complex use cases. | - Create Polls in Posts<br>- Add Rich Text Formatting<br>- Embed URLs in Posts<br>- Attach Files to Posts | |

## Additional Scope for Launch

| Category | Description | Components |
|----------|-------------|------------|
| Navigation | Platform integration and web view handling for various features | - Handle native vs web view (JS bridge)<br>- Meetup web view<br>- Chat based circle web view<br>- Challenges web view<br>- Going live web view<br>- Member profile web view (community profile)<br>- User settings view (profile - combined with existing settings)<br>- DMs web view<br>- Member list view |
| Site Switcher | Community selection functionality | - Site switcher (KMA only) |
| Deep Linking | Routing for notifications | - Re-route email notifications and push notifications |
| Notifications | Notification management | - Notification inbox<br>- Push notifications<br>- Deleted post empty page state |
| Analytics | Tracking user interactions | - Analytics events |
| Localization | Language support | - Support for multiple languages |
| Feed Add-ons | Additional feed enhancements | - Channel header Images<br>- Community Guidelines |
| Color and Theme | Visual customization | - Dark mode throughout the app (vs community only)<br>- Theme Color Handling -> KMA vs BMA | 

## App Promotion and Deprecation

| Category | Description | Components |
|----------|-------------|------------|
| Web Promotion Touchpoints | Creating meaningful touchpoints to encourage members to download the app on the web | - Banners promoting the new mobile app<br>- Intelligent placements throughout web experience<br>- Strategic CTAs at high-engagement points |
| React Native App Deprecation | Creating a build that will replace the existing one with seamless transition | - Replacement build strategy<br>- Redirect flows into the new app<br>- Seamless transition experience for existing users | 