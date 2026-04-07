## ADDED Requirements

### Requirement: Wet Channel detail page
The system SHALL provide a dedicated Wet Channel page showing all three modes (Reverb, Delay, Slip) with per-mode control descriptions.

#### Scenario: View Reverb mode details
- **WHEN** user navigates to Wet Channel tab and selects Reverb mode
- **THEN** the page displays Reverb overview ("Multi-tap ambience"), TIME description ("Decay / size"), MODIFY description ("Amount of smearing"), and Freeze behavior ("Ambient pad")

#### Scenario: View Delay mode details
- **WHEN** user selects Delay mode on the Wet Channel page
- **THEN** the page displays Delay overview ("Clean, looping delay"), TIME description ("Delay time"), MODIFY description ("Feedback"), and Loop Tricks section

#### Scenario: View Slip mode details
- **WHEN** user selects Slip mode on the Wet Channel page
- **THEN** the page displays Slip overview ("Auto-sampler"), TIME description ("Sampling size"), MODIFY description ("Playback speed and direction"), and Looper Remixer tip

### Requirement: Micro-Looper Channel detail page
The system SHALL provide a dedicated Micro-Looper page showing all three modes (Env, Tape, Stretch) with per-mode control descriptions.

#### Scenario: View Env mode details
- **WHEN** user navigates to Micro-Looper tab and selects Env mode
- **THEN** the page displays Env overview ("Audio-controlled looper"), LENGTH description ("Slice size"), MODIFY description ("Sensitivity"), and Manual Stretching tip

#### Scenario: View Tape mode details
- **WHEN** user selects Tape mode
- **THEN** the page displays Tape overview ("Tape-style looper"), LENGTH description ("Loop length"), MODIFY description ("Speed / direction of playback"), and Balance Beam technique

#### Scenario: View Stretch mode details
- **WHEN** user selects Stretch mode
- **THEN** the page displays Stretch overview ("Time-stretching looper"), LENGTH description ("Slice size"), MODIFY description ("Playback direction and stretch amount"), and Frozen tip

### Requirement: Freeze and Overdub documentation
The system SHALL document Freeze (Wet Channel) and Overdub (Micro-Looper) behaviors within each channel page.

#### Scenario: View Freeze behavior per mode
- **WHEN** user views the Wet Channel page
- **THEN** each mode section includes how Freeze works: Reverb="Ambient pad", Delay="Looping echo", Slip="Repeating tone"

#### Scenario: View Overdubbing info
- **WHEN** user views the Micro-Looper page
- **THEN** an Overdubbing section explains Wet Overdubs, Misplaced Overdubs, and per-mode recommended settings

### Requirement: Key Settings with visual knob icons
The system SHALL display Key Settings for each mode using SVG knob icons that visually indicate recommended knob positions, rather than text descriptions.

#### Scenario: View Key Settings for Reverb mode
- **WHEN** user views Reverb mode on the Wet Channel page
- **THEN** each Key Setting (e.g., "Ambient Pad", "Lo-Fi Room", "Infinite Wash") displays a row of SVG knob icons with position indicators and labels (TIME, MODIFY, CLOCK)

#### Scenario: View Key Settings for Tape mode
- **WHEN** user views Tape mode on the Micro-Looper page
- **THEN** each Key Setting displays SVG knob icons with position indicators and labels (LENGTH, MODIFY, CLOCK)

### Requirement: Tips and techniques
The system SHALL include practical tips from the manual (marked as "Try this" or highlighted techniques).

#### Scenario: Display tips for Reverb mode
- **WHEN** user views Reverb mode details
- **THEN** the "Between States" tip about ramping MODIFY is displayed
