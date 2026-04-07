## ADDED Requirements

### Requirement: Structured JSON data model
The system SHALL maintain all MOOD MKII pedal data in a single structured JSON file at `public/data/mood.json`.

#### Scenario: JSON file loads successfully
- **WHEN** the application starts
- **THEN** `mood.json` is fetched and parsed, providing data for all views

### Requirement: Control data structure
The system SHALL represent each control with its name, description, channel, and per-mode behavior variations.

#### Scenario: Mode-aware control data
- **WHEN** the data for Wet Channel TIME knob is accessed
- **THEN** it contains mode-specific descriptions: { reverb: "Decay / size", delay: "Delay time", slip: "Refresh rate" }

### Requirement: MIDI CC data structure
The system SHALL include all MIDI CC mappings with CC number, parameter name, value ranges, and category.

#### Scenario: CC data with value mapping
- **WHEN** the data for CC21 (Wet Channel toggle) is accessed
- **THEN** it contains: cc=21, name="Wet Channel", values=[ {value: "0,1", label: "Reverb"}, {value: "2", label: "Delay"}, {value: ">2", label: "Slip"} ]

### Requirement: Dip switch data structure
The system SHALL represent each dip switch with its bank, position, name, and on/off description.

#### Scenario: Dip switch data
- **WHEN** the data for the SMOOTH switch is accessed
- **THEN** it contains: bank="right", position=8, name="SMOOTH", description="Smooth out the sweep of the CLOCK knob"
