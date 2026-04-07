## ADDED Requirements

### Requirement: Hidden options listing
The system SHALL display all hidden option controls with their descriptions, access method, and value ranges.

#### Scenario: View all hidden options
- **WHEN** user navigates to the Hidden Options tab
- **THEN** all hidden controls are listed: Tone, Stereo Width, Ramping Waveform, Fade, Level Balance, Direct Micro-Loop, Sync, Spread Solo, Loop Length

### Requirement: Hidden options access instructions
The system SHALL explain how to access hidden options on the physical pedal.

#### Scenario: View access method
- **WHEN** user views the Hidden Options tab
- **THEN** instructions state "Hold both footswitches down to access MOOD's hidden options" and explain the default/reset procedure (preset toggle left to center 3 times)

### Requirement: Per-option detail display
The system SHALL show which physical knob controls each hidden option and its value range.

#### Scenario: View Tone control
- **WHEN** user views Tone hidden option
- **THEN** it shows: controlled by Wet MODIFY knob, direction "Darker", description "A simple hi-cut filter for mellowing the Wet algorithms"

#### Scenario: View Sync control
- **WHEN** user views Sync hidden option
- **THEN** it shows: controlled by Micro-Looper MODE toggle, three positions (Unsynced / Moon synced to Wet / Wet synced to Moon), and descriptions of each sync behavior
