## ADDED Requirements

### Requirement: Clock sample rate reference
The system SHALL display the Clock knob's stepped sample rate values and their effects on both channels.

#### Scenario: View Clock values
- **WHEN** user navigates to Clock & Routing tab
- **THEN** the Clock section displays all sample rate steps (2k, 3k, 4k, 6k, 8k, 12k, 16k, 24k, 32k, 48k, 64k) with corresponding loop lengths and quality descriptions

### Requirement: Clock effect explanation
The system SHALL explain how Clock affects each channel differently.

#### Scenario: View Clock channel effects
- **WHEN** user views Clock details
- **THEN** it explains: Wet Channel = "quality and time of effects", Micro-Looper = "length and resolution of loops", and notes about Smooth Clock dip switch

### Requirement: Routing options reference
The system SHALL document all three routing positions and their signal flow.

#### Scenario: View routing positions
- **WHEN** user views the Routing section
- **THEN** three positions are shown: IN (input to Wet), Moon+IN (Micro-Looper + input to Wet), Moon (Micro-Looper only to Wet), with descriptions of what each processes
