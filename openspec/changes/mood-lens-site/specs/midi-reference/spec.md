## ADDED Requirements

### Requirement: MIDI CC table
The system SHALL display a complete, searchable table of all MIDI CC parameters with their CC numbers and value ranges.

#### Scenario: View full CC table
- **WHEN** user navigates to the MIDI tab
- **THEN** a table displays all CCs organized by category: Footswitches/Aux (CC102-107), Knobs (CC14-20), Toggles (CC21-23), Hidden Options (CC24-33), Misc/Random (CC51-56, 93, 100, 110, 111)

#### Scenario: Search for a CC parameter
- **WHEN** user types "TIME" in the MIDI search field
- **THEN** the table filters to show CC14 (TIME) and CC61 (TIME dip switch)

### Requirement: MIDI getting started info
The system SHALL document MIDI connection setup, channel configuration, and preset save/recall via MIDI.

#### Scenario: View MIDI setup
- **WHEN** user views the MIDI Getting Started section
- **THEN** it explains: 1/4" TRS connection, default channel 2, how to change channel, and MIDIBox conversion

#### Scenario: View preset management
- **WHEN** user views preset section
- **THEN** it explains: 122 total slots, Program Change for save (hold both footswitches + PC) and recall, slot 0 = Live mode, slots 1-2 = toggle positions

### Requirement: Synth Mode documentation
The system SHALL document the MIDI-exclusive Synth Mode with all its parameters and output types.

#### Scenario: View Synth Mode overview
- **WHEN** user views Synth Mode section
- **THEN** it explains: activated by MIDI Note, uses Clock for semitone transposition, controls are ADSR-like, settings saved globally

#### Scenario: View Output Types
- **WHEN** user views Output Type section
- **THEN** three types are displayed: Open (CC58=0, constant sound), On/Off (CC58=1, note-gated), ADSR (CC58>1, envelope-shaped)

#### Scenario: View Synth Mode CC table
- **WHEN** user views Synth Mode CCs
- **THEN** a table shows: Exit (CC59), Output Type (CC58), Attack (CC80), Decay (CC81), Sustain (CC82), Release (CC83), Octave Transpose (CC57), Portamento (CC84), Modulation Wheel (CC1)

### Requirement: Stepped and synced value reference
The system SHALL document specific MIDI value mappings for synced and stepped parameters.

#### Scenario: View Tape Mode Speed values
- **WHEN** user views the MIDI value reference
- **THEN** CC19 Tape Mode Speed shows: 4x Reverse (0-4), 2x Reverse (5-23), 1x Reverse (24-42), 0.5x Reverse (43-61), 0.5x Forward (62-84), 1x Forward (85-97), 2x Forward (98-119), 4x Forward (120-127)

#### Scenario: View Stepped Clock values
- **WHEN** user views CC18 reference
- **THEN** Stepped Clock shows all values: 2k (0-4), 3k (5-16), 4k (16-28), 6k (29-40), 8k (41-53), 12k (54-69), 16k (70-83), 24k (84-95), 32k (96-109), 48k (110-121), 64k (122-127)
