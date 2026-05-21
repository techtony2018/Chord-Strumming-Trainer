# Chord Strumming Trainer

![Chord Strumming Trainer screen](cst-screen.png)

Chord Strumming Trainer is a browser-based guitar practice tool that combines a metronome, strumming pattern trainer, chord progression viewer, chord fingering diagrams, and lightweight synthesized guitar-chord playback.

It is built as a small static web app with an optional local Python server for saving chord-sequence files directly to disk.

## What It Does

- Plays a BPM-based strumming metronome from 40 to 180 BPM.
- Steps tempo by 20 BPM with the `TAP` button, wrapping from 180 back to 40.
- Supports editable strumming patterns with `D`, `U`, `X`, and `R`.
- Supports three-level accents: off (`-`), light (`>`), and strong (`>>`).
- Plays guitar-like chord strums that follow the accent pattern.
- Provides one-click mute controls for beat clicks and chord strums.
- Shows the active beat, current stroke, active chord, section annotation, and chord diagram.
- Displays a rolling four-chord window so long pieces do not cause dramatic layout shifts.
- Expands to a full-piece chord grid for changing alternate chord fingerings.
- Loads chord progressions from `.txt` or `.chords` files.
- Saves chord progressions through the native browser picker when available, through the local server when running with `server.py`, or through a download fallback.
- Works well on mobile phones with compact one-row beat and accent controls, responsive chord cards, and touch-friendly transport controls.

## Playback Controls

- The center counter is the primary transport control.
- The version number beside the app title links to this README.
- Double-click the BPM number to reset tempo to the default 126 BPM.
- Before playback, the counter shows a blue play icon.
- During playback, the counter shows the active beat number in red.
- When paused, the counter shows the blue play icon again.
- Double-click the counter area to reset to the beginning.
- The transport button mirrors the same states: `Start` and `Continue` are blue, while `Pause` is red.

## App Layout

```mermaid
flowchart TD
  A["Tempo + BPM"] --> B["Beat / Stroke Display"]
  B --> C["Active Chord Card"]
  C --> D["Rolling 4-Chord Window"]
  D --> E["Expandable Full Chord Grid"]
  F["Chord Sequence Editor"] --> D
  F --> G["Piece + Section Parser"]
  H["Accent Pattern"] --> I["Beat Click + Chord Strumming Audio"]
  J["Strum Pattern"] --> I
  G --> C
```

## Chord Sequence Format

Chord sequences are plain text. Separate items with spaces, commas, or bars.

```text
Piece:Beautiful-One-Simplified Anno:Intro F G F G F G C C
Anno:Verse1 F G C F G Am F G C F G C
```

Supported annotations:

- `Piece:xxx` sets the piece name shown beside `CHORDS`.
- `Anno:xxx` sets the current section label shown above the active chord.
- Chord names create measures in the sequence.

If `Piece:xxx` is omitted, the piece name defaults to `Unnamed Pice`.

## Strumming Pattern Format

The strum pattern editor accepts these symbols:

| Symbol | Meaning |
| --- | --- |
| `D` | Down strum |
| `U` | Up strum |
| `X` | Muted/percussive hit |
| `R` | Rest |

Example:

```text
D U D U D U D U
```

## Accent Pattern

Each accent slot cycles through three states:

| Display | Level | Effect |
| --- | --- | --- |
| `-` | Off | No chord strum for that slot |
| `>` | Light | Softer beat and chord strum |
| `>>` | Strong | Louder beat and chord strum |

Default accent pattern:

```text
>> > > >> > > >> >
```

When `Beat accent` is enabled, both beat clicks and chord strums follow the accent pattern. When it is disabled, beat clicks and chord strums keep playing at a constant normal level instead of using the accent pattern or muting `-` slots.

## Chord Graphics And Fingerings

Each chord card shows:

- Six strings.
- Fret lines.
- Open or muted string markers.
- Finger-position dots.
- A fingering counter such as `1/3` when alternate shapes are available.

Click a chord card to cycle its fingering. The active chord card can also be clicked to change the current chord fingering.

## Running The App

### Public GitHub Pages Site

The app is configured for GitHub Pages with GitHub Actions. After Pages is enabled for the repository, pushes to `main` deploy the static app automatically.

Expected public URL:

```text
https://techtony2018.github.io/Chord-Strumming-Trainer/
```

### Simple Static Mode

Open `index.html` directly in a browser.

This supports practice, loading local files, and browser-based download behavior.

### Save-Capable Local Server

Run:

```bash
python3 server.py
```

Then open:

```text
http://127.0.0.1:4173
```

When running through `server.py`, the `Save` button writes chord files into:

```text
saved_sequences/
```

That folder is ignored by Git because it contains user-generated practice files.

## Browser Save Behavior

```mermaid
flowchart LR
  A["Click Save"] --> B{"Native save picker available?"}
  B -->|Yes| C["Choose save location"]
  B -->|No| D{"Local server available?"}
  D -->|Yes| E["Write to saved_sequences/"]
  D -->|No| F["Use browser download link"]
```

Notes:

- Chrome and Edge can use the native file picker when the File System Access API is available.
- Firefox does not support `showSaveFilePicker()`. Firefox users can enable `Always ask you where to save files` in Firefox settings to choose a download folder.
- The Codex in-app browser lacks some normal browser file APIs, so `server.py` is the most reliable save path there.

## Project Files

| File | Purpose |
| --- | --- |
| `index.html` | App structure and controls |
| `styles.css` | Responsive layout and chord diagram styling |
| `app.js` | Metronome scheduler, audio, parsing, chord rendering, file actions |
| `server.py` | Optional local server with save endpoint |
| `.gitignore` | Ignores generated saved sequences and macOS metadata |

## Development Notes

The app uses the Web Audio API for timing and synthesized sounds. Chord playback is intentionally lightweight: each accented slot triggers a staggered set of filtered, harmonic-rich plucked-string buffers with small pick-noise transients to mimic a guitar strum without requiring external audio assets.

The chord window is deliberately limited to four cards during playback. For long pieces, the visible window advances around the active measure so the UI remains stable and readable.

Current version: `v1.029`
