## ADDED Requirements

### Requirement: Tab navigation
The system SHALL provide tab-based navigation with hash routing for deep linking.

#### Scenario: Navigate via tabs
- **WHEN** user clicks the "Wet Channel" tab
- **THEN** the URL hash updates to "#wet-channel" and the Wet Channel content is displayed

#### Scenario: Deep link to tab
- **WHEN** user opens a URL with hash "#midi"
- **THEN** the MIDI tab is automatically selected and displayed

### Requirement: Responsive layout
The system SHALL be fully responsive across mobile (375px), tablet (768px), and desktop (1440px) viewports.

#### Scenario: Mobile layout
- **WHEN** viewport width is below 768px
- **THEN** tab navigation becomes a horizontal scrollable bar and content stacks vertically
