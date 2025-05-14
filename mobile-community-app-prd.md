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

| Priority | User Story | Description | Design |
|----------|------------|-------------|--------|
| P0 | As a mobile app user, I want to see a basic feed of posts so I can browse community content. | - Feed displays scrollable list of posts with recent posts at top<br>- Each post shows author profile picture, name, timestamp<br>- Basic text content with proper wrapping and truncation<br>- Support for "show more" expansion for long posts<br>- Pull-to-refresh functionality<br>- Clear empty state when no posts are available | [TBD] |
| P0 | As a mobile app user, I want to view engagement metrics on posts so I can understand post popularity. | - Each post displays reaction count and comment count<br>- Metrics use appropriate condensed format for large numbers<br>- Tapping reaction count opens reaction details sheet<br>- Tapping comment count navigates to post details<br>- Zero counts are hidden (not displayed as "0") | [TBD] |
| P0 | As a mobile app user, I want to easily interact with posts through intuitive actions. | - Posts have reaction button with 6 emotion options<br>- Long-press on reaction button opens reaction selector<br>- Comment button navigates to post details<br>- All interactions update metrics in real-time<br>- Buttons have appropriate touch states | [TBD] |
| P1 | As a mobile app user, I want to compose a basic text post so I can share my thoughts with the community. | - Post composer accessible via FAB<br>- Text input with auto-expanding capabilities<br>- Channel/circle selector to choose where to post<br>- Post button (disabled until text entered)<br>- Success confirmation with animation highlight<br>- Keyboard handling optimized for mobile | [TBD] |
| P1 | As a mobile app user, I want to view comments on posts so I can follow community discussions. | - Comments section shows chronological ordering<br>- Each comment includes commenter profile, name, timestamp<br>- Reply threads show proper indentation<br>- Support for "Show more replies" expansion<br>- Long-press on comment shows options menu | [TBD] |
| P1 | As a mobile app user, I want to add comments and replies to posts so I can participate in conversations. | - Comment input field at bottom of screen<br>- Reply functionality with clear indication of context<br>- Media attachment support in comments<br>- Visual feedback during submission<br>- Appropriate error handling<br>- Support for editing own comments | [TBD] |
| P2 | As a mobile app user, I want to attach photos and videos to my posts to share visual content. | - Support for up to 6 images/videos per post<br>- Camera integration for taking photos/videos<br>- Gallery selection for existing media<br>- Preview, removal and reordering capabilities<br>- Progress indicators during upload<br>- Background uploading support | [TBD] |
| P2 | As a mobile app user, I want to view photos and videos in feed posts with optimal display. | - Images display with preserved aspect ratio<br>- Videos show thumbnails with play button overlay<br>- Consistent max height (300px) in feed view<br>- Tapping opens full-screen viewer<br>- Progressive loading with placeholders<br>- Support for multiple media with pagination | [TBD] |
| P3 | As a mobile app user, I want to view and interact with poll posts so I can share my opinion and see community responses. | - Clear display of poll question and options<br>- Visual distinction between single/multi-select polls<br>- Real-time results updating<br>- Support for viewing voters per option<br>- Proper handling of closed polls<br>- Success animation when vote registered | [TBD] |
| P3 | As a mobile app user, I want to create poll posts to gather feedback from the community. | - Poll creation interface with question field<br>- Support for 2-10 options with add/remove capability<br>- Single/multi-select toggle<br>- Duration selector with presets<br>- Poll settings for anonymity and result visibility<br>- Preview of how poll will appear | [TBD] |

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