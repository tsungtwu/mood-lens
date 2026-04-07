## ADDED Requirements

### Requirement: Interactive SVG pedal face
The system SHALL render an SVG-based representation of the MOOD MKII pedal face showing all physical controls in their approximate layout positions.

#### Scenario: Pedal panel renders on Overview tab
- **WHEN** user navigates to the Overview tab
- **THEN** an SVG pedal panel is displayed showing all knobs (TIME, MODIFY, LENGTH, MODIFY, MIX, CLOCK), toggles (Wet Mode, Micro-Looper Mode, ROUTING), footswitches (Wet Bypass, Micro-Looper Bypass), and the preset toggle

### Requirement: Clickable controls with info panel
The system SHALL allow users to click any control on the SVG panel to display detailed information about that control in an adjacent info panel.

#### Scenario: Click a shared control
- **WHEN** user clicks the MIX knob on the SVG panel
- **THEN** an info panel displays the control name "MIX", its description "Sets the balance between your input signal and MOOD", and any mode-specific notes

#### Scenario: Click a channel-specific control
- **WHEN** user clicks the TIME knob on the SVG panel while Wet Channel mode is set to Reverb
- **THEN** the info panel displays "TIME" with the Reverb-specific description "Decay / size"

### Requirement: Mode toggles on pedal panel
The system SHALL provide interactive mode toggles on the SVG panel for both channels that update control descriptions dynamically.

#### Scenario: Switch Wet Channel mode
- **WHEN** user clicks the Wet Channel mode toggle to change from Reverb to Delay
- **THEN** all Wet Channel control descriptions update to show Delay-specific behavior (e.g., TIME shows "Delay time" instead of "Decay / size")

#### Scenario: Switch Micro-Looper mode
- **WHEN** user clicks the Micro-Looper mode toggle to change from Env to Tape
- **THEN** all Micro-Looper control descriptions update to show Tape-specific behavior

### Requirement: Hover highlight on controls
The system SHALL display a visual highlight effect when hovering over interactive controls on the SVG panel.

#### Scenario: Hover a knob
- **WHEN** user hovers over a knob on the SVG panel
- **THEN** the knob displays a pink glow highlight and the cursor changes to pointer

### Requirement: Mobile-friendly pedal view
The system SHALL provide an accessible control list view on mobile screens where the SVG panel is too small for accurate touch targets.

#### Scenario: View on mobile
- **WHEN** the viewport width is below 768px
- **THEN** controls are displayed as a tappable list grouped by channel instead of an SVG panel
