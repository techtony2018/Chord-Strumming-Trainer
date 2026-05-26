const PATTERNS = [
  {
    id: "basic-eighth",
    name: "Eighths: D U D U",
    beats: 4,
    subdivision: 2,
    pattern: "D U D U D U D U",
  },
  {
    id: "folk-pop",
    name: "Folk pop: D D U U D U",
    beats: 4,
    subdivision: 2,
    pattern: "D R D U R U D U",
  },
  {
    id: "island",
    name: "Island: D X U U X U",
    beats: 4,
    subdivision: 2,
    pattern: "D X U R U X R U",
  },
  {
    id: "sixteenth-driving",
    name: "Sixteenths: D U D U",
    beats: 4,
    subdivision: 4,
    pattern: "D U D U D U D U D U D U D U D U",
  },
  {
    id: "train",
    name: "Train: D R U D R U",
    beats: 4,
    subdivision: 4,
    pattern: "D R U D R U D R U D R U D R U D",
  },
  {
    id: "waltz",
    name: "Waltz: D D U",
    beats: 3,
    subdivision: 2,
    pattern: "D R D U D U",
  },
];

const STROKE_META = {
  D: { label: "Down", glyph: "D", className: "down", frequency: 880, duration: 0.035 },
  U: { label: "Up", glyph: "U", className: "up", frequency: 660, duration: 0.028 },
  X: { label: "Mute", glyph: "X", className: "mute", frequency: 220, duration: 0.045 },
  R: { label: "Rest", glyph: "-", className: "rest", frequency: 0, duration: 0 },
};

const CHORD_LONG_PRESS_MS = 450;
const CHORD_PREVIEW_DURATION_SECONDS = 5;
const TUNER_STRING_LONG_PRESS_MS = 520;
const TUNER_REFERENCE_DURATION_SECONDS = 5;
const TUNER_LISTEN_DURATION_SECONDS = 10;

const CHORD_LIBRARY = {
  C: [
    { frets: ["x", 3, 2, 0, 1, 0], notes: ["C3", "E3", "G3", "C4", "E4"] },
    { frets: ["x", 3, 2, 0, 3, 0], notes: ["C3", "E3", "G3", "D4", "E4"] },
    { frets: ["x", 3, 2, 0, 1, 3], notes: ["C3", "E3", "G3", "C4", "G4"] },
  ],
  G: [
    { frets: [3, 2, 0, 0, 0, 3], notes: ["G2", "B2", "D3", "G3", "B3", "G4"] },
    { frets: [3, 2, 0, 0, 3, 3], notes: ["G2", "B2", "D3", "G3", "D4", "G4"] },
    { frets: [3, 0, 0, 0, 0, 3], notes: ["G2", "D3", "G3", "B3", "G4"] },
  ],
  D: [
    { frets: ["x", "x", 0, 2, 3, 2], notes: ["D3", "A3", "D4", "F#4"] },
    { frets: ["x", "x", 0, 2, 3, 0], notes: ["D3", "A3", "D4", "G4"] },
    { frets: ["x", "x", 0, 2, 3, 3], notes: ["D3", "A3", "D4", "G4"] },
  ],
  A: [
    { frets: ["x", 0, 2, 2, 2, 0], notes: ["A2", "E3", "A3", "C#4", "E4"] },
    { frets: ["x", 0, 2, 2, 0, 0], notes: ["A2", "E3", "A3", "B3", "E4"] },
    { frets: ["x", 0, 2, 0, 2, 0], notes: ["A2", "E3", "G3", "C#4", "E4"] },
  ],
  E: [
    { frets: [0, 2, 2, 1, 0, 0], notes: ["E2", "B2", "E3", "G#3", "B3", "E4"] },
    { frets: [0, 2, 2, 1, 3, 0], notes: ["E2", "B2", "E3", "G#3", "D4", "E4"] },
  ],
  F: [
    { frets: [1, 3, 3, 2, 1, 1], notes: ["F2", "C3", "F3", "A3", "C4", "F4"] },
    { frets: ["x", "x", 3, 2, 1, 1], notes: ["F3", "A3", "C4", "F4"] },
  ],
  "F/A": [
    { frets: ["x", 0, 3, 2, 1, 1], notes: ["A2", "F3", "A3", "C4", "F4"] },
    { frets: ["x", 0, 3, 2, 1, 0], notes: ["A2", "F3", "A3", "C4", "E4"] },
  ],
  "G/B": [
    { frets: ["x", 2, 0, 0, 3, 3], notes: ["B2", "D3", "G3", "D4", "G4"] },
    { frets: ["x", 2, 0, 0, 0, 3], notes: ["B2", "D3", "G3", "B3", "G4"] },
  ],
  Am: [
    { frets: ["x", 0, 2, 2, 1, 0], notes: ["A2", "E3", "A3", "C4", "E4"] },
    { frets: ["x", 0, 2, 0, 1, 0], notes: ["A2", "E3", "G3", "C4", "E4"] },
    { frets: ["x", 0, 2, 2, 1, 3], notes: ["A2", "E3", "A3", "C4", "G4"] },
  ],
  Am7: [
    { frets: ["x", 0, 2, 0, 1, 0], notes: ["A2", "E3", "G3", "C4", "E4"] },
    { frets: ["x", 0, 2, 0, 1, 3], notes: ["A2", "E3", "G3", "C4", "G4"] },
  ],
  Em: [
    { frets: [0, 2, 2, 0, 0, 0], notes: ["E2", "B2", "E3", "G3", "B3", "E4"] },
    { frets: [0, 2, 2, 0, 3, 0], notes: ["E2", "B2", "E3", "G3", "D4", "E4"] },
  ],
  Dm: [
    { frets: ["x", "x", 0, 2, 3, 1], notes: ["D3", "A3", "D4", "F4"] },
    { frets: ["x", "x", 0, 2, 3, 0], notes: ["D3", "A3", "D4", "G4"] },
  ],
  "C/E": [
    { frets: [0, 3, 2, 0, 1, 0], notes: ["E2", "C3", "E3", "G3", "C4", "E4"] },
    { frets: [0, 3, 2, 0, 1, 3], notes: ["E2", "C3", "E3", "G3", "C4", "G4"] },
  ],
};

const NOTE_OFFSETS = {
  C: -9,
  "C#": -8,
  Db: -8,
  D: -7,
  "D#": -6,
  Eb: -6,
  E: -5,
  F: -4,
  "F#": -3,
  Gb: -3,
  G: -2,
  "G#": -1,
  Ab: -1,
  A: 0,
  "A#": 1,
  Bb: 1,
  B: 2,
};

const DEFAULT_TEMPO = 126;
const NEUTRAL_ACCENT_LEVEL = 1;
const TUNER_MIN_SIGNAL_LEVEL = 0.00008;
const TUNER_READING_HOLD_MS = 3000;
const TUNER_IN_TUNE_CONFIRM_MS = 450;
const TUNING_PRESETS = {
  standard: [
    { label: "E", note: "E2", string: "6" },
    { label: "A", note: "A2", string: "5" },
    { label: "D", note: "D3", string: "4" },
    { label: "G", note: "G3", string: "3" },
    { label: "B", note: "B3", string: "2" },
    { label: "E", note: "E4", string: "1" },
  ],
  "drop-d": [
    { label: "D", note: "D2", string: "6" },
    { label: "A", note: "A2", string: "5" },
    { label: "D", note: "D3", string: "4" },
    { label: "G", note: "G3", string: "3" },
    { label: "B", note: "B3", string: "2" },
    { label: "E", note: "E4", string: "1" },
  ],
  "open-g": [
    { label: "D", note: "D2", string: "6" },
    { label: "G", note: "G2", string: "5" },
    { label: "D", note: "D3", string: "4" },
    { label: "G", note: "G3", string: "3" },
    { label: "B", note: "B3", string: "2" },
    { label: "D", note: "D4", string: "1" },
  ],
  "half-step": [
    { label: "Eb", note: "Eb2", string: "6" },
    { label: "Ab", note: "Ab2", string: "5" },
    { label: "Db", note: "Db3", string: "4" },
    { label: "Gb", note: "Gb3", string: "3" },
    { label: "Bb", note: "Bb3", string: "2" },
    { label: "Eb", note: "Eb4", string: "1" },
  ],
};

const state = {
  audio: null,
  gain: null,
  compressor: null,
  stringBuffers: new Map(),
  timer: null,
  isPlaying: false,
  hasStarted: false,
  tempo: DEFAULT_TEMPO,
  beats: 4,
  subdivision: 2,
  pattern: [],
  accentPattern: [],
  chordSequence: [],
  chordAnnotations: [],
  chordVoicings: {},
  pieceName: "Unnamed Pice",
  slotIndex: 0,
  nextNoteTime: 0,
  barIndex: 0,
  countInRemaining: 0,
  tapTimes: [],
  visualTimers: [],
  playGeneration: 0,
  counterClickTimer: 0,
  tempoClickTimer: 0,
  tuner: {
    active: false,
    starting: false,
    analyser: null,
    monitorGain: null,
    buffer: null,
    source: null,
    stream: null,
    frame: 0,
    preset: "standard",
    selectedIndex: 0,
    auto: true,
    lastSignalAt: 0,
    smoothedFrequency: null,
    noiseFloor: TUNER_MIN_SIGNAL_LEVEL,
    inTuneIndex: -1,
    inTuneSince: 0,
    tunedStrings: new Set(),
    requestId: 0,
    periodicToneIndex: -1,
    periodicTonePhase: "",
    periodicToneTimer: 0,
    singleToneTimer: 0,
    referenceToneIndex: -1,
    referenceHighlightTimer: 0,
    toneSources: new Set(),
  },
};

const els = {
  appShell: document.querySelector("#appShell"),
  tempoValue: document.querySelector("#tempoValue"),
  annotationLabel: document.querySelector("#annotationLabel"),
  tempoSlider: document.querySelector("#tempoSlider"),
  tempoDown: document.querySelector("#tempoDown"),
  tempoUp: document.querySelector("#tempoUp"),
  tunerToggleButton: document.querySelector("#tunerToggleButton"),
  tunerToggleIcon: document.querySelector("#tunerToggleIcon"),
  trainerView: document.querySelector("#trainerView"),
  tempoStrip: document.querySelector(".tempo-strip"),
  controlPanel: document.querySelector("#controlPanel"),
  playButton: document.querySelector("#playButton"),
  resetButton: document.querySelector("#resetButton"),
  pulseRing: document.querySelector("#pulseRing"),
  beatNumber: document.querySelector("#beatNumber"),
  strokeName: document.querySelector("#strokeName"),
  slotLabel: document.querySelector("#slotLabel"),
  activeChordCard: document.querySelector("#activeChordCard"),
  activeMeasure: document.querySelector("#activeMeasure"),
  activeChordName: document.querySelector("#activeChordName"),
  activeVoicing: document.querySelector("#activeVoicing"),
  activeChordDiagram: document.querySelector("#activeChordDiagram"),
  nextChordCard: document.querySelector("#nextChordCard"),
  nextMeasure: document.querySelector("#nextMeasure"),
  nextChordName: document.querySelector("#nextChordName"),
  nextVoicing: document.querySelector("#nextVoicing"),
  nextChordDiagram: document.querySelector("#nextChordDiagram"),
  pieceName: document.querySelector("#pieceName"),
  patternGrid: document.querySelector("#patternGrid"),
  accentGrid: document.querySelector("#accentGrid"),
  chordGrid: document.querySelector("#chordGrid"),
  fullChordPanel: document.querySelector("#fullChordPanel"),
  fullChordGrid: document.querySelector("#fullChordGrid"),
  expandChordsButton: document.querySelector("#expandChordsButton"),
  patternSelect: document.querySelector("#patternSelect"),
  beatsSelect: document.querySelector("#beatsSelect"),
  subdivisionSelect: document.querySelector("#subdivisionSelect"),
  customPattern: document.querySelector("#customPattern"),
  chordSequence: document.querySelector("#chordSequence"),
  loadSequenceButton: document.querySelector("#loadSequenceButton"),
  saveSequenceButton: document.querySelector("#saveSequenceButton"),
  sequenceFileInput: document.querySelector("#sequenceFileInput"),
  sequenceDownloadLink: document.querySelector("#sequenceDownloadLink"),
  saveStatus: document.querySelector("#saveStatus"),
  volumeSlider: document.querySelector("#volumeSlider"),
  chordVolumeSlider: document.querySelector("#chordVolumeSlider"),
  beatMuteToggle: document.querySelector("#beatMuteToggle"),
  chordMuteToggle: document.querySelector("#chordMuteToggle"),
  accentToggle: document.querySelector("#accentToggle"),
  countToggle: document.querySelector("#countToggle"),
  practiceMode: document.querySelector("#practiceMode"),
  retuneButton: document.querySelector("#retuneButton"),
  tuningPreset: document.querySelector("#tuningPreset"),
  tunerAutoToggle: document.querySelector("#tunerAutoToggle"),
  tunerDetectedNote: document.querySelector("#tunerDetectedNote"),
  tunerTargetLabel: document.querySelector("#tunerTargetLabel"),
  tunerCents: document.querySelector("#tunerCents"),
  tunerNeedle: document.querySelector("#tunerNeedle"),
  tunerInputLevel: document.querySelector("#tunerInputLevel"),
  tunerInputFill: document.querySelector("#tunerInputFill"),
  tunerStrings: document.querySelector("#tunerStrings"),
  tunerPanel: document.querySelector("#tunerPanel"),
};

function normalizePattern(input, targetLength) {
  const tokens = input
    .toUpperCase()
    .replace(/[^DUXR]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => token[0])
    .filter((token) => STROKE_META[token]);

  if (tokens.length === 0) {
    return Array.from({ length: targetLength }, (_, index) => (index % 2 === 0 ? "D" : "U"));
  }

  return Array.from({ length: targetLength }, (_, index) => tokens[index % tokens.length]);
}

function normalizeChordName(chord) {
  return chord
    .trim()
    .replace(/^([a-g])/, (letter) => letter.toUpperCase())
    .replace(/\/([a-g])/, (_, letter) => `/${letter.toUpperCase()}`)
    .replace(/M(?=7?$)/, "m");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character];
  });
}

function parseChordSequence(input) {
  const tokens = input
    .split(/[\s,|]+/)
    .filter(Boolean);
  const chords = [];
  const annotations = [];
  let currentAnnotation = "";
  let pieceName = "Unnamed Pice";

  tokens.forEach((token) => {
    if (/^Piece:/i.test(token)) {
      pieceName = token.replace(/^Piece:/i, "").replace(/_/g, " ") || "Unnamed Pice";
      return;
    }

    if (/^Anno:/i.test(token)) {
      currentAnnotation = token.replace(/^Anno:/i, "").replace(/_/g, " ");
      return;
    }

    chords.push(normalizeChordName(token));
    annotations.push(currentAnnotation);
  });

  return {
    annotations: chords.length > 0 ? annotations : ["Intro"],
    chords: chords.length > 0 ? chords : ["C"],
    pieceName,
  };
}

function noteToFrequency(note) {
  const match = note.match(/^([A-G](?:#|b)?)(\d)$/);
  if (!match) return 440;

  const [, pitch, octaveText] = match;
  const semitoneFromA4 = NOTE_OFFSETS[pitch] + (Number(octaveText) - 4) * 12;
  return 440 * 2 ** (semitoneFromA4 / 12);
}

function tunerStrings() {
  return TUNING_PRESETS[state.tuner.preset] ?? TUNING_PRESETS.standard;
}

function selectedTunerString() {
  return tunerStrings()[state.tuner.selectedIndex] ?? tunerStrings()[0];
}

function centsFromTarget(frequency, targetFrequency) {
  return 1200 * Math.log2(frequency / targetFrequency);
}

function pitchNameForFrequency(frequency) {
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const midi = Math.round(69 + 12 * Math.log2(frequency / 440));
  return `${names[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

function closestTunerString(frequency) {
  return tunerStrings().reduce(
    (closest, string, index) => {
      const cents = Math.abs(centsFromTarget(frequency, noteToFrequency(string.note)));
      return cents < closest.cents ? { index, cents } : closest;
    },
    { index: 0, cents: Infinity },
  ).index;
}

function resetTunerReading(message = "Microphone off") {
  const target = selectedTunerString();
  els.tunerDetectedNote.textContent = "--";
  els.tunerTargetLabel.textContent = `Target ${target.note}`;
  els.tunerCents.textContent = message;
  els.tunerNeedle.style.setProperty("--needle-position", "50%");
  els.tunerNeedle.classList.remove("in-tune");
  updateDetectedTunerString();
  if (message === "Microphone off") state.tuner.smoothedFrequency = null;
}

function tunerIdleMessage() {
  if (state.tuner.periodicToneIndex >= 0) {
    return state.tuner.periodicTonePhase === "listening"
      ? `${selectedTunerString().note} listening - tune now`
      : `${selectedTunerString().note} reference tone - listen in 5 seconds`;
  }
  return state.tuner.active ? "Waiting for a pluck" : "Microphone off";
}

function updateTunerInputLevel(level = 0) {
  const decibels = level > 0 ? 20 * Math.log10(level) : -72;
  const strength = Math.max(0, Math.min(1, (decibels + 72) / 48));
  els.tunerInputLevel.textContent = state.tuner.active ? `${Math.round(decibels)} dB` : "Off";
  els.tunerInputFill.style.width = `${Math.round(strength * 100)}%`;
  const threshold = Math.max(TUNER_MIN_SIGNAL_LEVEL, state.tuner.noiseFloor * 2.4);
  els.tunerInputFill.classList.toggle("active", level >= threshold);
}

function resetTunedStrings() {
  clearTunerConfirmation();
  state.tuner.tunedStrings.clear();
}

function clearTunerConfirmation() {
  state.tuner.inTuneIndex = -1;
  state.tuner.inTuneSince = 0;
}

function stringOrdinal(stringNumber) {
  if (stringNumber === "1") return "1st";
  if (stringNumber === "2") return "2nd";
  if (stringNumber === "3") return "3rd";
  return `${stringNumber}th`;
}

function renderTunerStrings() {
  els.tunerStrings.innerHTML = "";
  tunerStrings().forEach((string, index) => {
    const button = document.createElement("button");
    const tuned = state.tuner.tunedStrings.has(index);
    const repeating = state.tuner.periodicToneIndex === index;
    button.className = `tuner-string-button${index === state.tuner.selectedIndex ? " selected" : ""}${tuned ? " tuned" : ""}${repeating ? " repeating" : ""}`;
    button.type = "button";
    button.dataset.index = String(index);
    button.setAttribute(
      "aria-label",
      `Tune ${stringOrdinal(string.string)} string to ${string.note}. Tap for reference tone then listening; hold for guided tuning cycle.${tuned ? " Tuned." : ""}`,
    );
    button.innerHTML = `<strong>${string.note}</strong>`;
    bindTunerStringPress(button, index);
    els.tunerStrings.append(button);
  });
  tunerStrings().forEach((string, index) => {
    const marker = document.createElement("span");
    marker.className = `tuner-headstock-string string-${index}`;
    marker.dataset.index = String(index);
    marker.setAttribute("aria-hidden", "true");
    els.tunerStrings.append(marker);
  });
  els.tunerTargetLabel.textContent = `Target ${selectedTunerString().note}`;
  updateDetectedTunerString(state.tuner.smoothedFrequency ? state.tuner.selectedIndex : -1);
  updateReferenceToneHighlight(state.tuner.referenceToneIndex);
}

function updateDetectedTunerString(index = -1) {
  els.tunerStrings?.querySelectorAll(".tuner-headstock-string").forEach((marker, markerIndex) => {
    marker.classList.toggle("detected", markerIndex === index);
  });
}

function updateReferenceToneHighlight(index = -1) {
  els.tunerStrings?.querySelectorAll(".tuner-headstock-string").forEach((marker, markerIndex) => {
    marker.classList.toggle("playing", markerIndex === index);
  });
}

function clearReferenceToneHighlight() {
  window.clearTimeout(state.tuner.referenceHighlightTimer);
  state.tuner.referenceHighlightTimer = 0;
  state.tuner.referenceToneIndex = -1;
  updateReferenceToneHighlight();
}

function showReferenceToneHighlight(index, durationSeconds) {
  clearReferenceToneHighlight();
  state.tuner.referenceToneIndex = index;
  updateReferenceToneHighlight(index);
  state.tuner.referenceHighlightTimer = window.setTimeout(clearReferenceToneHighlight, durationSeconds * 1000);
}

function updateTunedStringProgress(isInTune) {
  const now = performance.now();
  const index = state.tuner.selectedIndex;
  if (!isInTune) {
    clearTunerConfirmation();
    return;
  }

  if (state.tuner.inTuneIndex !== index) {
    state.tuner.inTuneIndex = index;
    state.tuner.inTuneSince = now;
    return;
  }

  if (now - state.tuner.inTuneSince >= TUNER_IN_TUNE_CONFIRM_MS) {
    state.tuner.auto = true;
    els.tunerAutoToggle.checked = true;
    if (!state.tuner.tunedStrings.has(index)) {
      state.tuner.tunedStrings.add(index);
      renderTunerStrings();
    }
    if (state.tuner.periodicToneIndex === index && state.tuner.periodicTonePhase === "listening") {
      stopPeriodicReferenceTone(false);
    }
  }
}

function showTunerReading(frequency) {
  if (state.tuner.auto) {
    const closestIndex = closestTunerString(frequency);
    if (closestIndex !== state.tuner.selectedIndex) {
      state.tuner.selectedIndex = closestIndex;
      renderTunerStrings();
    }
  }

  const target = selectedTunerString();
  const cents = centsFromTarget(frequency, noteToFrequency(target.note));
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const isInTune = Math.abs(cents) <= 5;
  const stateText = isInTune ? "In tune" : cents < 0 ? "Flat" : "Sharp";
  const signedCents = Math.round(cents);

  updateTunedStringProgress(isInTune);
  els.tunerDetectedNote.textContent = pitchNameForFrequency(frequency);
  els.tunerTargetLabel.textContent = `Target ${target.note}`;
  els.tunerCents.textContent = isInTune ? "In tune" : `${signedCents > 0 ? "+" : ""}${signedCents} cents - ${stateText}`;
  els.tunerNeedle.style.setProperty("--needle-position", `${50 + clampedCents}%`);
  els.tunerNeedle.classList.toggle("in-tune", isInTune);
  updateDetectedTunerString(state.tuner.selectedIndex);
}

function signalLevel(buffer) {
  let energy = 0;
  for (let index = 0; index < buffer.length; index += 1) {
    energy += buffer[index] * buffer[index];
  }
  return Math.sqrt(energy / buffer.length);
}

function detectPitch(buffer, sampleRate, level = signalLevel(buffer), threshold = TUNER_MIN_SIGNAL_LEVEL) {
  if (level < threshold) return null;

  const minimumPeriod = Math.floor(sampleRate / 400);
  const maximumPeriod = Math.min(Math.floor(sampleRate / 60), Math.floor(buffer.length / 2));
  const comparisonLength = buffer.length - maximumPeriod;
  const yin = new Float32Array(maximumPeriod + 1);

  for (let period = 1; period <= maximumPeriod; period += 1) {
    let difference = 0;
    for (let index = 0; index < comparisonLength; index += 1) {
      const delta = buffer[index] - buffer[index + period];
      difference += delta * delta;
    }
    yin[period] = difference;
  }

  let runningSum = 0;
  yin[0] = 1;
  for (let period = 1; period <= maximumPeriod; period += 1) {
    runningSum += yin[period];
    yin[period] = runningSum ? (yin[period] * period) / runningSum : 1;
  }

  let bestPeriod = -1;
  let bestValue = Infinity;
  for (let period = minimumPeriod; period <= maximumPeriod; period += 1) {
    if (yin[period] < bestValue) {
      bestValue = yin[period];
      bestPeriod = period;
    }
    if (yin[period] < 0.14) {
      while (period < maximumPeriod && yin[period + 1] < yin[period]) period += 1;
      bestPeriod = period;
      break;
    }
  }

  if (bestPeriod < 0 || bestValue > 0.32) return null;

  const previous = yin[bestPeriod - 1] ?? yin[bestPeriod];
  const center = yin[bestPeriod];
  const next = yin[bestPeriod + 1] ?? yin[bestPeriod];
  const divisor = 2 * (previous - 2 * center + next);
  const adjustment = divisor ? (previous - next) / divisor : 0;
  return sampleRate / (bestPeriod + adjustment);
}

function runTunerFrame() {
  if (!state.tuner.active) return;

  state.tuner.analyser.getFloatTimeDomainData(state.tuner.buffer);
  const level = signalLevel(state.tuner.buffer);
  const canLearnNoise = !state.tuner.smoothedFrequency || performance.now() - state.tuner.lastSignalAt > TUNER_READING_HOLD_MS;
  if (canLearnNoise && level < 0.002) {
    state.tuner.noiseFloor = state.tuner.noiseFloor * 0.98 + level * 0.02;
  }
  const hasLiveReading =
    state.tuner.smoothedFrequency && performance.now() - state.tuner.lastSignalAt <= TUNER_READING_HOLD_MS;
  const noiseMultiplier = hasLiveReading ? 1.2 : 2.4;
  const threshold = Math.max(TUNER_MIN_SIGNAL_LEVEL, state.tuner.noiseFloor * noiseMultiplier);
  updateTunerInputLevel(level);
  const frequency = detectPitch(state.tuner.buffer, state.audio.sampleRate, level, threshold);
  if (frequency) {
    state.tuner.lastSignalAt = performance.now();
    const previous = state.tuner.smoothedFrequency;
    const isStableNote = previous && Math.abs(centsFromTarget(frequency, previous)) < 80;
    state.tuner.smoothedFrequency = isStableNote ? previous * 0.72 + frequency * 0.28 : frequency;
    showTunerReading(state.tuner.smoothedFrequency);
  } else if (level >= threshold) {
    clearTunerConfirmation();
    state.tuner.lastSignalAt = performance.now();
    els.tunerCents.textContent = "Sound heard - finding pitch";
  } else if (state.tuner.smoothedFrequency && performance.now() - state.tuner.lastSignalAt <= TUNER_READING_HOLD_MS) {
    clearTunerConfirmation();
  } else if (performance.now() - state.tuner.lastSignalAt > TUNER_READING_HOLD_MS) {
    clearTunerConfirmation();
    state.tuner.smoothedFrequency = null;
    resetTunerReading("Waiting for a pluck");
  }

  state.tuner.frame = window.requestAnimationFrame(runTunerFrame);
}

function stopTuner() {
  state.tuner.requestId += 1;
  if (state.tuner.frame) window.cancelAnimationFrame(state.tuner.frame);
  state.tuner.source?.disconnect();
  state.tuner.analyser?.disconnect();
  state.tuner.monitorGain?.disconnect();
  state.tuner.stream?.getTracks().forEach((track) => track.stop());
  state.tuner.active = false;
  state.tuner.analyser = null;
  state.tuner.monitorGain = null;
  state.tuner.source = null;
  state.tuner.stream = null;
  state.tuner.frame = 0;
  state.tuner.starting = false;
  els.retuneButton.disabled = false;
  updateTunerInputLevel();
  if (state.tuner.periodicToneIndex < 0) resetTunerReading();
}

async function startTuner({ resetProgress = true } = {}) {
  if (state.tuner.active || state.tuner.starting) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    resetTunerReading("Microphone unavailable");
    return;
  }

  if (state.isPlaying) pausePlayback();
  ensureAudio();
  const requestId = ++state.tuner.requestId;
  state.tuner.starting = true;
  els.retuneButton.disabled = true;
  resetTunerReading("Starting microphone");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { autoGainControl: true, echoCancellation: false, noiseSuppression: false },
    });
    if (requestId !== state.tuner.requestId || els.tunerPanel.hidden) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    const analyser = state.audio.createAnalyser();
    analyser.fftSize = 8192;
    analyser.smoothingTimeConstant = 0.1;
    const monitorGain = state.audio.createGain();
    monitorGain.gain.value = 0;
    state.tuner.stream = stream;
    state.tuner.source = state.audio.createMediaStreamSource(stream);
    state.tuner.analyser = analyser;
    state.tuner.monitorGain = monitorGain;
    state.tuner.buffer = new Float32Array(analyser.fftSize);
    state.tuner.source.connect(analyser);
    // Pull microphone processing in Firefox without sending live mic audio to speakers.
    analyser.connect(monitorGain).connect(state.audio.destination);
    if (state.audio.state !== "running") state.audio.resume().catch(() => {});
    state.tuner.active = true;
    state.tuner.lastSignalAt = performance.now();
    state.tuner.smoothedFrequency = null;
    state.tuner.noiseFloor = TUNER_MIN_SIGNAL_LEVEL;
    if (resetProgress) resetTunedStrings();
    renderTunerStrings();
    els.retuneButton.disabled = false;
    resetTunerReading(tunerIdleMessage());
    updateTunerInputLevel();
    runTunerFrame();
  } catch {
    if (requestId === state.tuner.requestId && !els.tunerPanel.hidden) {
      resetTunerReading("Microphone permission needed");
      els.retuneButton.disabled = false;
    }
  } finally {
    if (requestId === state.tuner.requestId) state.tuner.starting = false;
  }
}

function setTunerPanel(open) {
  els.tunerPanel.hidden = !open;
  els.trainerView.hidden = open;
  els.controlPanel.hidden = open;
  els.appShell.classList.toggle("tuner-mode", open);
  els.tempoStrip.classList.toggle("tuner-mode", open);
  els.tunerToggleButton.classList.toggle("active", open);
  els.tunerToggleButton.setAttribute("aria-expanded", String(open));
  els.tunerToggleIcon.className = open ? "chord-return-icon" : "tuning-fork-icon";
  els.tunerToggleButton.setAttribute("aria-label", open ? "Return to chord trainer" : "Open guitar tuner");
  els.tunerToggleButton.title = open ? "Return to chord trainer" : "Open guitar tuner";
  if (open) {
    startTuner();
  } else {
    stopSingleReferenceTone(false);
    stopPeriodicReferenceTone(false);
    stopTuner();
  }
}

function stopReferenceToneSources() {
  state.tuner.toneSources.forEach((source) => {
    try {
      source.stop();
    } catch {
      // Audio node may already have naturally ended.
    }
  });
  state.tuner.toneSources.clear();
  clearReferenceToneHighlight();
}

function playTunerReferenceTone(durationSeconds = 1.2) {
  ensureAudio();
  const time = state.audio.currentTime;
  const stringIndex = state.tuner.selectedIndex;
  const targetFrequency = noteToFrequency(selectedTunerString().note);
  const oscillator = state.audio.createOscillator();
  const overtone = state.audio.createOscillator();
  const toneGain = state.audio.createGain();
  const overtoneGain = state.audio.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(targetFrequency, time);
  overtone.type = "sine";
  overtone.frequency.setValueAtTime(targetFrequency * 2, time);
  toneGain.gain.setValueAtTime(0.0001, time);
  toneGain.gain.exponentialRampToValueAtTime(0.1, time + 0.015);
  toneGain.gain.exponentialRampToValueAtTime(0.035, time + Math.min(0.42, durationSeconds * 0.2));
  toneGain.gain.exponentialRampToValueAtTime(0.0001, time + durationSeconds);
  overtoneGain.gain.setValueAtTime(0.0001, time);
  overtoneGain.gain.exponentialRampToValueAtTime(0.022, time + 0.015);
  overtoneGain.gain.exponentialRampToValueAtTime(0.0001, time + Math.min(durationSeconds, 2.2));
  oscillator.connect(toneGain).connect(state.gain);
  overtone.connect(overtoneGain).connect(state.gain);
  oscillator.start(time);
  overtone.start(time);
  showReferenceToneHighlight(stringIndex, durationSeconds);
  oscillator.stop(time + durationSeconds + 0.02);
  overtone.stop(time + Math.min(durationSeconds, 2.22));
  state.tuner.toneSources.add(oscillator);
  state.tuner.toneSources.add(overtone);
  oscillator.addEventListener("ended", () => state.tuner.toneSources.delete(oscillator));
  overtone.addEventListener("ended", () => state.tuner.toneSources.delete(overtone));
}

function stopPeriodicReferenceTone(resumeListening = true) {
  if (state.tuner.periodicToneTimer) window.clearTimeout(state.tuner.periodicToneTimer);
  state.tuner.periodicToneTimer = 0;
  state.tuner.periodicToneIndex = -1;
  state.tuner.periodicTonePhase = "";
  stopReferenceToneSources();
  renderTunerStrings();
  if (resumeListening && !els.tunerPanel.hidden) startTuner();
}

function stopSingleReferenceTone(resumeListening = false) {
  if (state.tuner.singleToneTimer) window.clearTimeout(state.tuner.singleToneTimer);
  state.tuner.singleToneTimer = 0;
  stopReferenceToneSources();
  if (resumeListening && !els.tunerPanel.hidden) startTuner({ resetProgress: false });
}

function playPeriodicReferenceTone() {
  if (state.tuner.periodicToneIndex < 0) return;
  stopSingleReferenceTone(false);
  stopTuner();
  stopReferenceToneSources();
  state.tuner.periodicTonePhase = "playing";
  renderTunerStrings();
  resetTunerReading(tunerIdleMessage());
  playTunerReferenceTone(TUNER_REFERENCE_DURATION_SECONDS);
  state.tuner.periodicToneTimer = window.setTimeout(
    beginPeriodicListening,
    TUNER_REFERENCE_DURATION_SECONDS * 1000,
  );
}

function beginPeriodicListening() {
  if (state.tuner.periodicToneIndex < 0) return;
  stopReferenceToneSources();
  state.tuner.periodicTonePhase = "listening";
  renderTunerStrings();
  resetTunerReading(tunerIdleMessage());
  startTuner({ resetProgress: false });
  state.tuner.periodicToneTimer = window.setTimeout(
    playPeriodicReferenceTone,
    TUNER_LISTEN_DURATION_SECONDS * 1000,
  );
}

function startPeriodicReferenceTone(index) {
  stopSingleReferenceTone(false);
  state.tuner.selectedIndex = index;
  state.tuner.auto = false;
  els.tunerAutoToggle.checked = false;
  state.tuner.periodicToneIndex = index;
  clearTunerConfirmation();
  playPeriodicReferenceTone();
}

function startSingleReferenceTone(index) {
  if (state.tuner.periodicToneIndex >= 0) stopPeriodicReferenceTone(false);
  stopSingleReferenceTone(false);
  stopTuner();
  state.tuner.selectedIndex = index;
  state.tuner.auto = false;
  els.tunerAutoToggle.checked = false;
  clearTunerConfirmation();
  renderTunerStrings();
  resetTunerReading(`${selectedTunerString().note} reference tone - listen in 5 seconds`);
  playTunerReferenceTone(TUNER_REFERENCE_DURATION_SECONDS);
  state.tuner.singleToneTimer = window.setTimeout(() => {
    state.tuner.singleToneTimer = 0;
    stopReferenceToneSources();
    resetTunerReading(`${selectedTunerString().note} listening - tune now`);
    startTuner({ resetProgress: false });
  }, TUNER_REFERENCE_DURATION_SECONDS * 1000);
}

function handleTunerStringTap(index) {
  startSingleReferenceTone(index);
}

function bindTunerStringPress(button, index) {
  let pressTimer = 0;
  let held = false;
  const clearPress = () => {
    window.clearTimeout(pressTimer);
    pressTimer = 0;
  };

  button.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    held = false;
    pressTimer = window.setTimeout(() => {
      held = true;
      if (state.tuner.periodicToneIndex >= 0) {
        stopPeriodicReferenceTone(true);
      } else {
        startPeriodicReferenceTone(index);
      }
    }, TUNER_STRING_LONG_PRESS_MS);
  });
  button.addEventListener("pointerup", clearPress);
  button.addEventListener("pointerleave", clearPress);
  button.addEventListener("pointercancel", clearPress);
  button.addEventListener("selectstart", (event) => event.preventDefault());
  button.addEventListener("dragstart", (event) => event.preventDefault());
  button.addEventListener("contextmenu", (event) => event.preventDefault());
  button.addEventListener("click", (event) => {
    if (held) {
      event.preventDefault();
      held = false;
      return;
    }
    handleTunerStringTap(index);
  });
}

function notesForChord(chordName) {
  const voicing = getChordVoicing(chordName);
  if (voicing) return voicing.notes;

  const match = chordName.match(/^([A-G](?:#|b)?)(m?)/);
  if (!match) return getChordVoicing("C").notes;

  const root = match[1];
  const isMinor = match[2] === "m";
  const rootOffset = NOTE_OFFSETS[root] ?? NOTE_OFFSETS.C;
  const intervals = isMinor ? [0, 3, 7, 12] : [0, 4, 7, 12];
  return intervals.map((interval) => {
    const semitone = rootOffset + interval;
    return 440 * 2 ** ((semitone - 12) / 12);
  });
}

function getChordVoicings(chordName) {
  return CHORD_LIBRARY[chordName] ?? [];
}

function deriveFingerLabels(frets) {
  const labels = Array.from({ length: 6 }, () => "");
  const fretted = frets
    .map((fret, stringIndex) => ({ fret, stringIndex }))
    .filter(({ fret }) => typeof fret === "number" && fret > 0);

  if (fretted.length === 0) return labels;

  let nextFinger = 1;
  const lowestFret = Math.min(...fretted.map(({ fret }) => fret));
  const lowestFretNotes = fretted.filter(({ fret }) => fret === lowestFret);
  const hasLikelyBarre = lowestFretNotes.length > 1;

  if (hasLikelyBarre) {
    lowestFretNotes.forEach(({ stringIndex }) => {
      labels[stringIndex] = "1";
    });
    nextFinger = 2;
  }

  fretted
    .filter(({ fret }) => !hasLikelyBarre || fret !== lowestFret)
    .sort((a, b) => a.fret - b.fret || a.stringIndex - b.stringIndex)
    .forEach(({ stringIndex }) => {
      labels[stringIndex] = String(Math.min(nextFinger, 4));
      nextFinger += 1;
    });

  return labels;
}

function normalizeFingerLabels(frets, fingers) {
  if (!Array.isArray(fingers) || fingers.length !== 6) return deriveFingerLabels(frets);

  const labels = fingers.map((finger, index) => {
    const fret = frets[index];
    if (typeof fret !== "number" || fret <= 0) return "";
    const label = String(finger ?? "");
    return /^[1-4]$/.test(label) ? label : "";
  });

  return labels.every((label, index) => typeof frets[index] !== "number" || frets[index] <= 0 || label)
    ? labels
    : deriveFingerLabels(frets);
}

function getChordVoicing(chordName) {
  const voicings = getChordVoicings(chordName);
  if (voicings.length === 0) return null;
  return voicings[state.chordVoicings[chordName] % voicings.length || 0];
}

function cycleChordVoicing(chordName) {
  const voicings = getChordVoicings(chordName);
  if (voicings.length < 2) return;

  state.chordVoicings[chordName] = ((state.chordVoicings[chordName] ?? 0) + 1) % voicings.length;
  renderChordWindow();
  renderFullChordGrid();
  updateVisualState(state.slotIndex);
}

function slotCount() {
  return state.beats * state.subdivision;
}

function slotSeconds() {
  return 60 / state.tempo / state.subdivision;
}

function currentBeat(slot = state.slotIndex) {
  return Math.floor(slot / state.subdivision) + 1;
}

function defaultAccentPattern() {
  const defaultPattern = [2, 1, 1, 2, 1, 1, 2, 1];
  return Array.from({ length: slotCount() }, (_, index) => defaultPattern[index % defaultPattern.length]);
}

function fitAccentPattern(previousPattern) {
  const fallback = defaultAccentPattern();
  return Array.from({ length: slotCount() }, (_, index) => {
    const value = previousPattern[index] ?? fallback[index];
    return typeof value === "boolean" ? Number(value) * 2 : Math.min(2, Math.max(0, Number(value)));
  });
}

function syncTempo(value) {
  state.tempo = Math.min(180, Math.max(40, Math.round(Number(value))));
  els.tempoValue.value = String(state.tempo).padStart(3, "0");
  els.tempoValue.setAttribute(
    "aria-label",
    `Tempo ${state.tempo} BPM. Click to step by 20 BPM. Double-click to reset to ${DEFAULT_TEMPO} BPM.`,
  );
  els.tempoSlider.value = state.tempo;
}

function stepTempo() {
  const nextTempo = state.tempo + 20;
  syncTempo(nextTempo > Number(els.tempoSlider.max) ? Number(els.tempoSlider.min) : nextTempo);
}

function applyPatternFromControls() {
  const targetLength = slotCount();
  state.accentPattern = fitAccentPattern(state.accentPattern);
  state.pattern = normalizePattern(els.customPattern.value, targetLength);
  renderPattern();
  renderAccentPattern();
  applyChordSequenceFromControls();
  updateVisualState(state.slotIndex);
}

function applyChordSequenceFromControls() {
  const parsed = parseChordSequence(els.chordSequence.value);
  state.chordSequence = parsed.chords;
  state.chordAnnotations = parsed.annotations;
  state.pieceName = parsed.pieceName;
  els.pieceName.textContent = state.pieceName;
  renderChordWindow();
  renderFullChordGrid();
}

function renderPatternOptions() {
  PATTERNS.forEach((pattern) => {
    const option = document.createElement("option");
    option.value = pattern.id;
    option.textContent = pattern.name;
    els.patternSelect.append(option);
  });
}

function renderPattern() {
  els.patternGrid.innerHTML = "";
  els.patternGrid.style.setProperty("--slot-count", String(slotCount()));

  state.pattern.forEach((token, index) => {
    const meta = STROKE_META[token];
    const cell = document.createElement("div");
    cell.className = `stroke-cell ${meta.className}`;
    cell.dataset.index = String(index);
    cell.textContent = meta.glyph;
    cell.title = `${meta.label}, beat ${currentBeat(index)}`;
    els.patternGrid.append(cell);
  });
}

function renderAccentPattern() {
  els.accentGrid.innerHTML = "";
  els.accentGrid.style.setProperty("--slot-count", String(slotCount()));

  state.accentPattern.forEach((accentLevel, index) => {
    const button = document.createElement("button");
    button.className = "accent-button";
    button.type = "button";
    button.dataset.index = String(index);
    button.dataset.level = String(accentLevel);
    button.setAttribute("aria-pressed", accentLevel > 0 ? "true" : "false");
    button.setAttribute(
      "aria-label",
      `Cycle accent for beat ${currentBeat(index)}, slot ${(index % state.subdivision) + 1}`,
    );
    button.textContent = ["-", ">", ">>"][accentLevel];
    button.addEventListener("click", () => {
      state.accentPattern[index] = (state.accentPattern[index] + 1) % 3;
      renderAccentPattern();
      updateVisualState(state.slotIndex);
    });
    els.accentGrid.append(button);
  });
}

function renderChordDiagram(chordName) {
  const chord = getChordVoicing(chordName);
  const frets = chord?.frets ?? ["x", "x", "x", "x", "x", "x"];
  const fingerLabels = normalizeFingerLabels(frets, chord?.fingers);
  const stringLines = Array.from(
    { length: 6 },
    (_, index) => `<span class="string-line" style="--string: ${index + 1};"></span>`,
  ).join("");
  const fretLines = Array.from(
    { length: 4 },
    (_, index) => `<span class="fret-line" style="--fret-line: ${index + 1};"></span>`,
  ).join("");
  const markers = frets
    .map((fret, index) => {
      const text = fret === "x" ? "x" : fret === 0 ? "o" : "";
      return `<span style="--string: ${index + 1};">${text}</span>`;
    })
    .join("");
  const dots = frets
    .map((fret, index) => {
      if (typeof fret !== "number" || fret === 0) return "";
      return `<span class="fret-dot" style="--string: ${index + 1}; --fret: ${fret};">${fingerLabels[index]}</span>`;
    })
    .join("");

  return `
    <div class="chord-diagram" aria-hidden="true">
      <div class="string-markers">${markers}</div>
      <div class="fretboard">${stringLines}${fretLines}${dots}</div>
    </div>
  `;
}

function chordWindowStart() {
  const sequenceLength = state.chordSequence.length;
  if (sequenceLength <= 4) return 0;

  const currentIndex = state.barIndex % sequenceLength;
  return Math.min(Math.max(0, currentIndex - 2), sequenceLength - 4);
}

function renderChordWindow() {
  els.chordGrid.innerHTML = "";
  const start = chordWindowStart();
  const visibleChords = state.chordSequence.slice(start, start + 4);

  visibleChords.forEach((chordName, visibleIndex) => {
    const index = start + visibleIndex;
    els.chordGrid.append(createChordCard(chordName, index));
  });
  updateActiveChordCard();
}

function createChordCard(chordName, index) {
  const card = document.createElement("button");
  const safeChordName = escapeHtml(chordName);
  const annotation = state.chordAnnotations[index];
  const voicingCount = getChordVoicings(chordName).length;
  const voicingIndex = (state.chordVoicings[chordName] ?? 0) + 1;
  card.className = "chord-card";
  card.type = "button";
  card.dataset.index = String(index);
  card.dataset.chord = chordName;
  card.setAttribute("aria-label", `Measure ${index + 1}: ${chordName}. Hold to hear chord.`);
  card.title =
    voicingCount > 1 ? `Tap to switch ${chordName} fingering. Hold to hear chord.` : `Hold to hear ${chordName}.`;
  card.innerHTML = `
    <div class="measure-number">${annotation ? escapeHtml(annotation) : `Measure ${index + 1}`}</div>
    <div class="chord-name-row">
      <div class="chord-name">${safeChordName}</div>
      ${voicingCount > 1 ? `<div class="voicing-chip">${voicingIndex}/${voicingCount}</div>` : ""}
    </div>
    ${renderChordDiagram(chordName)}
  `;
  bindChordPress(card, () => chordName, () => cycleChordVoicing(chordName));
  return card;
}

function renderFullChordGrid() {
  els.fullChordGrid.innerHTML = "";
  state.chordSequence.forEach((chordName, index) => {
    els.fullChordGrid.append(createChordCard(chordName, index));
  });
}

function setFullChordPanel(open) {
  els.fullChordPanel.hidden = !open;
  els.expandChordsButton.setAttribute("aria-expanded", String(open));
  els.expandChordsButton.setAttribute("aria-label", open ? "Hide full chord sequence" : "Show full chord sequence");
  els.expandChordsButton.querySelector("span").textContent = open ? "↑" : "↓";
  if (open) renderFullChordGrid();
}

function loadPreset(patternId) {
  const preset = PATTERNS.find((pattern) => pattern.id === patternId) ?? PATTERNS[0];
  state.beats = preset.beats;
  state.subdivision = preset.subdivision;
  state.accentPattern = defaultAccentPattern();
  els.beatsSelect.value = String(preset.beats);
  els.subdivisionSelect.value = String(preset.subdivision);
  els.customPattern.value = preset.pattern;
  applyPatternFromControls();
}

function ensureAudio() {
  if (!state.audio) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    state.audio = new AudioContext();
    state.gain = state.audio.createGain();
    state.compressor = state.audio.createDynamicsCompressor();
    state.compressor.threshold.setValueAtTime(-20, state.audio.currentTime);
    state.compressor.knee.setValueAtTime(20, state.audio.currentTime);
    state.compressor.ratio.setValueAtTime(4, state.audio.currentTime);
    state.compressor.attack.setValueAtTime(0.006, state.audio.currentTime);
    state.compressor.release.setValueAtTime(0.16, state.audio.currentTime);
    state.gain.connect(state.compressor).connect(state.audio.destination);
  }

  if (state.audio.state === "suspended") {
    state.audio.resume();
  }
}

function createNoiseSource(duration) {
  const sampleRate = state.audio.sampleRate;
  const frameCount = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = state.audio.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = state.audio.createBufferSource();
  source.buffer = buffer;
  return source;
}

function chordRingSeconds() {
  return Math.min(4.2, Math.max(1.35, slotSeconds() * 1.18 + 0.28));
}

function slowStrumSustainAmount() {
  return Math.min(1, Math.max(0, (slotSeconds() - 0.62) / 0.9));
}

function createGuitarStringBuffer(frequency, duration) {
  const cacheKey = `${Math.round(frequency * 10)}:${Math.round(duration * 20)}`;
  if (state.stringBuffers.has(cacheKey)) return state.stringBuffers.get(cacheKey);

  const sampleRate = state.audio.sampleRate;
  const frameCount = Math.floor(sampleRate * duration);
  const buffer = state.audio.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  const harmonics = [
    1, 0.72, 0.46, 0.32, 0.24, 0.18, 0.13, 0.1, 0.075, 0.055, 0.04, 0.03,
  ];
  const sustainStretch = Math.min(2.7, Math.max(1, duration / 1.46));
  const bodyStretch = Math.sqrt(sustainStretch);

  for (let i = 0; i < frameCount; i += 1) {
    const t = i / sampleRate;
    const attack = Math.min(1, t / 0.012);
    const stringDecay = Math.exp((-t * 1.88) / sustainStretch);
    const bodyDecay = Math.exp((-t * 0.82) / bodyStretch);
    const pickTransient = t < 0.018 ? (Math.random() * 2 - 1) * (1 - t / 0.018) * 0.18 : 0;
    let sample = 0;

    harmonics.forEach((amp, harmonicIndex) => {
      const harmonic = harmonicIndex + 1;
      const inharmonicity = 1 + harmonic * harmonic * 0.00032;
      const partialDecay = Math.exp((-t * (1.0 + harmonic * 0.34)) / sustainStretch);
      sample +=
        Math.sin(2 * Math.PI * frequency * harmonic * inharmonicity * t) *
        amp *
        partialDecay;
    });

    const lowBody = Math.sin(2 * Math.PI * 96 * t) * 0.06 * bodyDecay;
    const midBody = Math.sin(2 * Math.PI * 205 * t) * 0.046 * bodyDecay;
    const topBody = Math.sin(2 * Math.PI * 410 * t) * 0.018 * Math.exp((-t * 1.2) / bodyStretch);
    data[i] = (sample * 0.26 * stringDecay + lowBody + midBody + topBody + pickTransient) * attack;
  }

  state.stringBuffers.set(cacheKey, buffer);
  return buffer;
}

function schedulePickNoise(time, level, panValue = 0) {
  const source = createNoiseSource(0.012);
  const bandpass = state.audio.createBiquadFilter();
  const noiseGain = state.audio.createGain();
  const pan = state.audio.createStereoPanner?.();

  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(3400, time);
  bandpass.Q.setValueAtTime(1.1, time);
  noiseGain.gain.setValueAtTime(0.0001, time);
  noiseGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level), time + 0.002);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.018);

  source.connect(bandpass).connect(noiseGain);
  if (pan) {
    pan.pan.setValueAtTime(panValue, time);
    noiseGain.connect(pan).connect(state.gain);
  } else {
    noiseGain.connect(state.gain);
  }

  source.start(time);
  source.stop(time + 0.022);
}

function schedulePluckedString(frequency, time, level, panValue, ringSeconds, sustainAmount) {
  const source = state.audio.createBufferSource();
  const stringGain = state.audio.createGain();
  const presence = state.audio.createBiquadFilter();
  const body = state.audio.createBiquadFilter();
  const lowBody = state.audio.createBiquadFilter();
  const air = state.audio.createBiquadFilter();
  const pan = state.audio.createStereoPanner?.();
  source.buffer = createGuitarStringBuffer(frequency, ringSeconds + 0.18);
  source.playbackRate.setValueAtTime(1 + (Math.random() - 0.5) * 0.003, time);

  stringGain.gain.setValueAtTime(0.0001, time);
  stringGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * 2.6), time + 0.008);
  stringGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * (1.25 + sustainAmount * 0.28)), time + Math.min(0.32, ringSeconds * 0.22));
  if (sustainAmount > 0) {
    stringGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * 0.38 * sustainAmount), time + ringSeconds * 0.72);
  }
  stringGain.gain.exponentialRampToValueAtTime(0.0001, time + ringSeconds);

  presence.type = "peaking";
  presence.frequency.setValueAtTime(1100, time);
  presence.Q.setValueAtTime(0.7, time);
  presence.gain.setValueAtTime(2.8, time);
  body.type = "peaking";
  body.frequency.setValueAtTime(235, time);
  body.Q.setValueAtTime(0.75, time);
  body.gain.setValueAtTime(6.5 + sustainAmount * 1.8, time);
  lowBody.type = "peaking";
  lowBody.frequency.setValueAtTime(115, time);
  lowBody.Q.setValueAtTime(1.05, time);
  lowBody.gain.setValueAtTime(4.2 + sustainAmount * 1.4, time);
  air.type = "highshelf";
  air.frequency.setValueAtTime(3600, time);
  air.gain.setValueAtTime(-1.8 - sustainAmount * 0.7, time);

  source.connect(stringGain).connect(presence).connect(body).connect(lowBody).connect(air);

  if (pan) {
    pan.pan.setValueAtTime(panValue, time);
    air.connect(pan).connect(state.gain);
  } else {
    air.connect(state.gain);
  }

  source.start(time);
  source.stop(time + ringSeconds + 0.03);
}

function scheduleTone(time, token, accentLevel, isSilent) {
  if (isSilent || token === "R" || els.beatMuteToggle.checked) return;

  const meta = STROKE_META[token];
  const osc = state.audio.createOscillator();
  const filter = state.audio.createBiquadFilter();
  const toneGain = state.audio.createGain();
  const volume = Number(els.volumeSlider.value) / 100;
  const accentBoost = [1, 1.12, 1.35][accentLevel] ?? 1;
  const duration = meta.duration + (accentLevel === 2 ? 0.012 : accentLevel === 1 ? 0.006 : 0);

  osc.type = token === "X" ? "square" : "sine";
  osc.frequency.setValueAtTime(accentLevel === 2 ? meta.frequency * 1.22 : accentLevel === 1 ? meta.frequency * 1.08 : meta.frequency, time);
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(token === "X" ? 520 : 1200, time);
  filter.Q.setValueAtTime(token === "X" ? 2.6 : 1.8, time);
  toneGain.gain.setValueAtTime(0.0001, time);
  toneGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * 0.28 * accentBoost), time + 0.002);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  osc.connect(filter).connect(toneGain).connect(state.gain);
  schedulePickNoise(time, volume * (token === "X" ? 0.14 : 0.035) * accentBoost);
  osc.start(time);
  osc.stop(time + duration + 0.01);
}

function scheduleNamedChord(chordName, time, token, accentLevel, ringSecondsOverride = null) {
  const chordNotes = notesForChord(chordName);
  const volume = Number(els.chordVolumeSlider.value) / 100;
  if (volume <= 0) return;

  const orderedNotes = token === "U" ? [...chordNotes].reverse() : chordNotes;
  const accentScale = accentLevel === 2 ? 1 : 0.62;
  const strumSpacing = accentLevel === 2 ? 0.014 : 0.011;
  const ringSeconds = ringSecondsOverride ?? chordRingSeconds();
  const sustainAmount = ringSecondsOverride ? 1 : slowStrumSustainAmount();
  const sustainLevelBoost = 1 + sustainAmount * 0.18;

  orderedNotes.forEach((note, index) => {
    const frequency = typeof note === "number" ? note : noteToFrequency(note);
    const noteTime = time + index * strumSpacing;
    const level = volume * 0.075 * accentScale * sustainLevelBoost * (1 - index * 0.025);
    const panValue = -0.32 + (index / Math.max(1, orderedNotes.length - 1)) * 0.64;
    schedulePluckedString(frequency, noteTime, level, panValue, ringSeconds, sustainAmount);
  });

  schedulePickNoise(time, volume * (accentLevel === 2 ? 0.026 : 0.016));
}

function scheduleChord(time, token, isSilent, accentLevel) {
  if (isSilent || state.countInRemaining > 0 || token === "R" || accentLevel === 0 || els.chordMuteToggle.checked) return;

  const chordName = state.chordSequence[state.barIndex % state.chordSequence.length] ?? "C";
  scheduleNamedChord(chordName, time, token, accentLevel);
}

function previewChord(chordName) {
  if (els.chordMuteToggle.checked || Number(els.chordVolumeSlider.value) <= 0) return;
  ensureAudio();
  scheduleNamedChord(chordName, state.audio.currentTime + 0.02, "D", 2, CHORD_PREVIEW_DURATION_SECONDS);
}

function bindChordPress(element, chordName, onTap) {
  let pressTimer = 0;
  let consumedTap = false;

  const finishPress = () => {
    window.clearTimeout(pressTimer);
    pressTimer = 0;
    element.classList.remove("previewing");
  };

  element.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    consumedTap = false;
    pressTimer = window.setTimeout(() => {
      consumedTap = true;
      element.classList.add("previewing");
      previewChord(chordName());
    }, CHORD_LONG_PRESS_MS);
  });
  element.addEventListener("pointerup", finishPress);
  element.addEventListener("pointercancel", finishPress);
  element.addEventListener("pointerleave", finishPress);
  element.addEventListener("selectstart", (event) => event.preventDefault());
  element.addEventListener("dragstart", (event) => event.preventDefault());
  element.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  element.addEventListener("click", (event) => {
    if (consumedTap) {
      event.preventDefault();
      consumedTap = false;
      return;
    }
    onTap();
  });
}

function shouldSilenceBar() {
  const mode = els.practiceMode.value;
  if (mode === "silent-4") return (state.barIndex + 1) % 4 === 0;
  if (mode === "silent-8") return (state.barIndex + 1) % 8 === 0;
  return false;
}

function scheduleSlot(slot, time) {
  const isCountIn = state.countInRemaining > 0;
  const generation = state.playGeneration;
  const token = isCountIn ? "D" : state.pattern[slot] ?? "R";
  const accentLevel = els.accentToggle.checked ? state.accentPattern[slot] : NEUTRAL_ACCENT_LEVEL;
  const isSilent = !isCountIn && shouldSilenceBar();

  scheduleTone(time, token, accentLevel, isSilent);
  scheduleChord(time, token, isSilent, accentLevel);
  const timer = window.setTimeout(() => {
    if (!state.isPlaying || generation !== state.playGeneration) return;
    updateVisualState(slot, token, isSilent, isCountIn);
    state.visualTimers = state.visualTimers.filter((queuedTimer) => queuedTimer !== timer);
  }, Math.max(0, (time - state.audio.currentTime) * 1000));
  state.visualTimers.push(timer);
}

function clearTransportTimers() {
  window.clearInterval(state.timer);
  state.visualTimers.forEach((timer) => window.clearTimeout(timer));
  state.visualTimers = [];
  state.timer = null;
}

function advanceSlot() {
  state.nextNoteTime += slotSeconds();

  if (state.countInRemaining > 0) {
    state.slotIndex = (state.slotIndex + 1) % slotCount();
    if (state.slotIndex === 0) state.countInRemaining -= 1;
    return;
  }

  state.slotIndex += 1;
  if (state.slotIndex >= slotCount()) {
    state.slotIndex = 0;
    state.barIndex += 1;
  }
}

function scheduler() {
  while (state.nextNoteTime < state.audio.currentTime + 0.1) {
    scheduleSlot(state.slotIndex, state.nextNoteTime);
    advanceSlot();
  }
}

function updateVisualState(slot, token = state.pattern[slot] ?? "R", isSilent = false, isCountIn = false) {
  const meta = STROKE_META[token] ?? STROKE_META.R;
  renderChordWindow();

  document.querySelectorAll(".stroke-cell").forEach((cell) => {
    cell.classList.toggle("current", Number(cell.dataset.index) === slot);
  });
  document.querySelectorAll(".accent-button").forEach((button) => {
    button.classList.toggle("current", Number(button.dataset.index) === slot);
  });
  document.querySelectorAll(".chord-card").forEach((card) => {
    card.classList.toggle("current", Number(card.dataset.index) === state.barIndex % state.chordSequence.length);
  });
  updateActiveChordCard();

  if (state.isPlaying) {
    els.beatNumber.classList.remove("transport-icon");
    els.beatNumber.textContent = String(currentBeat(slot));
  }
  const chordName = state.chordSequence[state.barIndex % state.chordSequence.length] ?? "C";
  els.strokeName.textContent = isCountIn ? "Count in" : `${meta.glyph} ${chordName}`;
  els.strokeName.dataset.stroke = isCountIn ? "count-in" : meta.className;
  els.slotLabel.textContent = isSilent
    ? `Silent bar ${state.barIndex + 1}`
    : `Beat ${currentBeat(slot)}, slot ${(slot % state.subdivision) + 1}`;

  if (state.isPlaying) {
    els.pulseRing.classList.remove("active", "idle", "paused", "muted");
    els.pulseRing.classList.add(isSilent ? "muted" : "active");
    els.pulseRing.setAttribute("aria-label", "Pause");
    window.setTimeout(() => els.pulseRing.classList.remove("active"), 90);
  }
}

function updateTransportState() {
  els.pulseRing.classList.remove("active", "muted", "idle", "paused", "playing");
  els.playButton.classList.remove("ready", "playing");

  if (state.isPlaying) {
    els.playButton.textContent = "Pause";
    els.playButton.classList.add("playing");
    els.pulseRing.classList.add("playing");
    els.pulseRing.setAttribute("aria-label", "Pause");
    return;
  }

  const label = state.hasStarted ? "Continue" : "Start";
  els.playButton.textContent = label;
  els.playButton.classList.add("ready");
  els.beatNumber.textContent = "";
  els.beatNumber.classList.add("transport-icon");
  els.pulseRing.classList.add(state.hasStarted ? "paused" : "idle");
  els.pulseRing.setAttribute("aria-label", label);
}

function togglePlayback() {
  if (state.isPlaying) {
    pausePlayback();
    return;
  }

  startPlayback({ resetProgress: !state.hasStarted });
}

function handleCounterClick(event) {
  if (event.detail > 1) return;

  window.clearTimeout(state.counterClickTimer);
  state.counterClickTimer = window.setTimeout(togglePlayback, 180);
}

function updateActiveChordCard() {
  const chordIndex = state.barIndex % Math.max(1, state.chordSequence.length);
  const chordName = state.chordSequence[chordIndex] ?? "C";
  const annotation = state.chordAnnotations[chordIndex] ?? "";
  const voicingCount = getChordVoicings(chordName).length;
  const voicingIndex = (state.chordVoicings[chordName] ?? 0) + 1;
  els.activeMeasure.textContent = `Measure ${chordIndex + 1}`;
  els.activeChordName.textContent = chordName;
  els.annotationLabel.textContent = annotation || "";
  els.annotationLabel.hidden = !annotation;
  els.activeVoicing.textContent = voicingCount > 1 ? `${voicingIndex}/${voicingCount}` : "1/1";
  els.activeVoicing.hidden = voicingCount < 2;
  els.activeChordCard.title =
    voicingCount > 1 ? `Tap to switch ${chordName} fingering. Hold to hear chord.` : `Hold to hear ${chordName}.`;
  els.activeChordDiagram.innerHTML = renderChordDiagram(chordName);

  const nextIndex = (chordIndex + 1) % Math.max(1, state.chordSequence.length);
  const nextChordName = state.chordSequence[nextIndex] ?? "C";
  const nextVoicingCount = getChordVoicings(nextChordName).length;
  const nextVoicingIndex = (state.chordVoicings[nextChordName] ?? 0) + 1;
  els.nextMeasure.textContent = `Next ${nextIndex + 1}`;
  els.nextChordName.textContent = nextChordName;
  els.nextVoicing.textContent = nextVoicingCount > 1 ? `${nextVoicingIndex}/${nextVoicingCount}` : "1/1";
  els.nextVoicing.hidden = nextVoicingCount < 2;
  els.nextChordCard.title =
    nextVoicingCount > 1
      ? `Tap to switch ${nextChordName} fingering. Hold to hear chord.`
      : `Hold to hear ${nextChordName}.`;
  els.nextChordDiagram.innerHTML = renderChordDiagram(nextChordName);
}

function startPlayback({ resetProgress = false } = {}) {
  if (state.tuner.active) stopTuner();
  ensureAudio();
  state.isPlaying = true;
  state.hasStarted = true;
  state.playGeneration += 1;
  if (resetProgress) {
    state.slotIndex = 0;
    state.barIndex = 0;
  }
  state.countInRemaining = resetProgress && els.countToggle.checked ? 1 : 0;
  state.nextNoteTime = state.audio.currentTime + 0.08;
  updateTransportState();
  scheduler();
  state.timer = window.setInterval(scheduler, 25);
}

function pausePlayback() {
  state.isPlaying = false;
  state.playGeneration += 1;
  clearTransportTimers();
  state.countInRemaining = 0;
  updateTransportState();
  updateVisualState(state.slotIndex, state.pattern[state.slotIndex], false, false);
  updateTransportState();
}

function reset() {
  window.clearTimeout(state.counterClickTimer);
  state.isPlaying = false;
  state.hasStarted = false;
  state.playGeneration += 1;
  clearTransportTimers();
  state.countInRemaining = 0;
  state.slotIndex = 0;
  state.barIndex = 0;
  updateTransportState();
  updateVisualState(0, state.pattern[0], false, false);
  updateTransportState();
}

function encodeDataUrlText(value) {
  return Array.from(value)
    .map((character) => {
      const code = character.charCodeAt(0);
      if (
        (code >= 48 && code <= 57) ||
        (code >= 65 && code <= 90) ||
        (code >= 97 && code <= 122) ||
        "-_.~".includes(character)
      ) {
        return character;
      }
      return `%${code.toString(16).toUpperCase().padStart(2, "0")}`;
    })
    .join("");
}

function sequenceFileName() {
  return `${state.pieceName || "Unnamed Pice"}`.replace(/[^a-z0-9-_]+/gi, "-") || "chord-sequence";
}

async function saveChordSequence() {
  const fileName = sequenceFileName();
  const contents = els.chordSequence.value;
  els.saveStatus.textContent = "Saving...";

  if ("showSaveFilePicker" in window) {
    try {
      const blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
      const handle = await window.showSaveFilePicker({
        suggestedName: `${fileName}.chords.txt`,
        types: [
          {
            description: "Chord sequence",
            accept: { "text/plain": [".txt", ".chords"] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      els.saveStatus.textContent = "Saved.";
      els.sequenceDownloadLink.hidden = true;
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        els.saveStatus.textContent = "Save canceled.";
        return;
      }
    }
  }

  if ("Blob" in window && "URL" in window && "createObjectURL" in window.URL) {
    const blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    els.sequenceDownloadLink.href = url;
    els.sequenceDownloadLink.download = `${fileName}.chords.txt`;
    els.sequenceDownloadLink.hidden = false;
    els.sequenceDownloadLink.click();
    els.saveStatus.textContent = "Download started. In Firefox, enable 'Always ask you where to save files' to choose the folder.";
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    return;
  }

  try {
    const response = await fetch("/save-sequence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents, fileName: `${fileName}.chords.txt` }),
    });

    if (response.ok) {
      const result = await response.json();
      els.saveStatus.textContent = `Saved to ${result.path}`;
      els.sequenceDownloadLink.hidden = true;
      return;
    }
  } catch {
    // Download fallback below for static hosting.
  }

  els.sequenceDownloadLink.href = `data:text/plain;charset=utf-8,${encodeDataUrlText(contents)}`;
  els.sequenceDownloadLink.download = `${fileName}.chords.txt`;
  els.sequenceDownloadLink.hidden = false;
  els.saveStatus.textContent = "Download is ready. Use the link if your browser blocks automatic downloads.";
  els.sequenceDownloadLink.click();
}

function loadChordSequenceFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    els.chordSequence.value = String(reader.result ?? "");
    applyChordSequenceFromControls();
    reset();
  });
  reader.readAsText(file);
}

function bindEvents() {
  els.tempoSlider.addEventListener("input", (event) => syncTempo(event.target.value));
  els.tempoValue.addEventListener("click", () => {
    window.clearTimeout(state.tempoClickTimer);
    state.tempoClickTimer = window.setTimeout(stepTempo, 220);
  });
  els.tempoValue.addEventListener("dblclick", () => {
    window.clearTimeout(state.tempoClickTimer);
    syncTempo(DEFAULT_TEMPO);
  });
  els.tempoValue.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      stepTempo();
    }
  });
  els.tempoDown.addEventListener("click", () => syncTempo(state.tempo - 1));
  els.tempoUp.addEventListener("click", () => syncTempo(state.tempo + 1));
  els.tunerToggleButton.addEventListener("click", () => setTunerPanel(els.tunerPanel.hidden));
  els.playButton.addEventListener("click", togglePlayback);
  els.pulseRing.addEventListener("click", handleCounterClick);
  els.pulseRing.addEventListener("dblclick", (event) => {
    event.preventDefault();
    window.clearTimeout(state.counterClickTimer);
    reset();
  });
  els.pulseRing.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePlayback();
    }
  });
  els.resetButton.addEventListener("click", reset);
  els.loadSequenceButton.addEventListener("click", () => els.sequenceFileInput.click());
  els.saveSequenceButton.addEventListener("click", saveChordSequence);
  els.expandChordsButton.addEventListener("click", () => setFullChordPanel(els.fullChordPanel.hidden));
  els.sequenceFileInput.addEventListener("change", (event) => {
    loadChordSequenceFile(event.target.files?.[0]);
    event.target.value = "";
  });
  bindChordPress(
    els.activeChordCard,
    () => state.chordSequence[state.barIndex % Math.max(1, state.chordSequence.length)] ?? "C",
    () => {
      const chordName = state.chordSequence[state.barIndex % Math.max(1, state.chordSequence.length)] ?? "C";
      cycleChordVoicing(chordName);
    },
  );
  bindChordPress(
    els.nextChordCard,
    () => state.chordSequence[(state.barIndex + 1) % Math.max(1, state.chordSequence.length)] ?? "C",
    () => {
      const nextIndex = (state.barIndex + 1) % Math.max(1, state.chordSequence.length);
      const chordName = state.chordSequence[nextIndex] ?? "C";
      cycleChordVoicing(chordName);
    },
  );
  els.patternSelect.addEventListener("change", (event) => loadPreset(event.target.value));

  els.beatsSelect.addEventListener("change", (event) => {
    state.beats = Number(event.target.value);
    applyPatternFromControls();
  });

  els.subdivisionSelect.addEventListener("change", (event) => {
    state.subdivision = Number(event.target.value);
    applyPatternFromControls();
  });

  els.customPattern.addEventListener("input", applyPatternFromControls);
  els.chordSequence.addEventListener("input", applyChordSequenceFromControls);
  els.retuneButton.addEventListener("click", () => {
    resetTunedStrings();
    renderTunerStrings();
  });
  els.tuningPreset.addEventListener("change", (event) => {
    state.tuner.preset = event.target.value;
    state.tuner.selectedIndex = 0;
    resetTunedStrings();
    renderTunerStrings();
    resetTunerReading(tunerIdleMessage());
  });
  els.tunerAutoToggle.addEventListener("change", (event) => {
    state.tuner.auto = event.target.checked;
    renderTunerStrings();
    resetTunerReading(tunerIdleMessage());
  });
}

function init() {
  renderPatternOptions();
  syncTempo(state.tempo);
  loadPreset(PATTERNS[0].id);
  updateTransportState();
  renderTunerStrings();
  resetTunerReading();
  setTunerPanel(false);
  bindEvents();
}

init();
