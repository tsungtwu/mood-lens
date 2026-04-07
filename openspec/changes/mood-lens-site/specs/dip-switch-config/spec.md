## ADDED Requirements

### Requirement: Dip switch configuration reference
The system SHALL display all dip switches organized by bank with their functions and on/off states.

#### Scenario: View left bank (Ramping/Expression)
- **WHEN** user navigates to Dip Switches tab
- **THEN** the left bank displays 8 switches: TIME, Wet MODIFY, CLOCK, Micro-Looper MODIFY, LENGTH, BOUNCE, SWEEP, POLARITY with descriptions

#### Scenario: View right bank (Customize)
- **WHEN** user views right bank section
- **THEN** it displays 8 switches: CLASSIC, MISO, SPREAD, DRY KILL, TRAILS, LATCH, NO DUB, SMOOTH with descriptions

### Requirement: Dip switch visual representation
The system SHALL show a visual representation of dip switch positions (ON/OFF).

#### Scenario: View switch visual
- **WHEN** user views a dip switch
- **THEN** a toggle visual shows the current default position (all OFF) and explains what ON does for that switch
