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

const state = {
  audio: null,
  gain: null,
  compressor: null,
  timer: null,
  isPlaying: false,
  hasStarted: false,
  tempo: 126,
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
};

const els = {
  tempoValue: document.querySelector("#tempoValue"),
  annotationLabel: document.querySelector("#annotationLabel"),
  tempoSlider: document.querySelector("#tempoSlider"),
  tempoDown: document.querySelector("#tempoDown"),
  tempoUp: document.querySelector("#tempoUp"),
  tapTempoButton: document.querySelector("#tapTempoButton"),
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
  accentToggle: document.querySelector("#accentToggle"),
  countToggle: document.querySelector("#countToggle"),
  practiceMode: document.querySelector("#practiceMode"),
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
  state.tempo = Math.min(300, Math.max(40, Math.round(Number(value))));
  els.tempoValue.value = state.tempo;
  els.tempoSlider.value = state.tempo;
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
      return `<span class="fret-dot" style="--string: ${index + 1}; --fret: ${fret};">${fret}</span>`;
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
  card.setAttribute("aria-label", `Measure ${index + 1}: ${chordName}`);
  if (voicingCount > 1) card.title = `Click to switch ${chordName} fingering`;
  card.innerHTML = `
    <div class="measure-number">${annotation ? escapeHtml(annotation) : `Measure ${index + 1}`}</div>
    <div class="chord-name-row">
      <div class="chord-name">${safeChordName}</div>
      ${voicingCount > 1 ? `<div class="voicing-chip">${voicingIndex}/${voicingCount}</div>` : ""}
    </div>
    ${renderChordDiagram(chordName)}
  `;
  card.addEventListener("click", () => cycleChordVoicing(chordName));
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

function schedulePickNoise(time, level, panValue = 0) {
  const source = createNoiseSource(0.018);
  const bandpass = state.audio.createBiquadFilter();
  const noiseGain = state.audio.createGain();
  const pan = state.audio.createStereoPanner?.();

  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(2600, time);
  bandpass.Q.setValueAtTime(1.4, time);
  noiseGain.gain.setValueAtTime(0.0001, time);
  noiseGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level), time + 0.002);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.026);

  source.connect(bandpass).connect(noiseGain);
  if (pan) {
    pan.pan.setValueAtTime(panValue, time);
    noiseGain.connect(pan).connect(state.gain);
  } else {
    noiseGain.connect(state.gain);
  }

  source.start(time);
  source.stop(time + 0.03);
}

function schedulePluckedString(frequency, time, level, panValue) {
  const source = createNoiseSource(0.024);
  const inputGain = state.audio.createGain();
  const delay = state.audio.createDelay(1);
  const feedback = state.audio.createGain();
  const damping = state.audio.createBiquadFilter();
  const body = state.audio.createBiquadFilter();
  const output = state.audio.createGain();
  const pan = state.audio.createStereoPanner?.();
  const period = Math.min(0.06, Math.max(0.002, 1 / frequency));

  delay.delayTime.setValueAtTime(period, time);
  feedback.gain.setValueAtTime(0.47, time);
  feedback.gain.exponentialRampToValueAtTime(0.18, time + 0.55);
  damping.type = "lowpass";
  damping.frequency.setValueAtTime(3600, time);
  damping.frequency.exponentialRampToValueAtTime(820, time + 0.42);
  damping.Q.setValueAtTime(0.7, time);
  body.type = "peaking";
  body.frequency.setValueAtTime(185, time);
  body.Q.setValueAtTime(0.9, time);
  body.gain.setValueAtTime(4, time);

  inputGain.gain.setValueAtTime(0.0001, time);
  inputGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level), time + 0.004);
  inputGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.038);

  output.gain.setValueAtTime(0.0001, time);
  output.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * 1.7), time + 0.012);
  output.gain.exponentialRampToValueAtTime(0.0001, time + 0.74);

  source.connect(inputGain).connect(delay);
  delay.connect(damping).connect(feedback).connect(delay);
  delay.connect(body).connect(output);

  if (pan) {
    pan.pan.setValueAtTime(panValue, time);
    output.connect(pan).connect(state.gain);
  } else {
    output.connect(state.gain);
  }

  source.start(time);
  source.stop(time + 0.04);
}

function scheduleTone(time, token, accentLevel, isSilent) {
  if (isSilent || token === "R") return;

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
  schedulePickNoise(time, volume * (token === "X" ? 0.17 : 0.06) * accentBoost);
  osc.start(time);
  osc.stop(time + duration + 0.01);
}

function scheduleChord(time, token, isSilent, accentLevel) {
  if (isSilent || state.countInRemaining > 0 || token === "R" || accentLevel === 0) return;

  const chordName = state.chordSequence[state.barIndex % state.chordSequence.length] ?? "C";
  const chordNotes = notesForChord(chordName);
  const volume = Number(els.chordVolumeSlider.value) / 100;
  if (volume <= 0) return;

  const orderedNotes = token === "U" ? [...chordNotes].reverse() : chordNotes;
  const accentScale = accentLevel === 2 ? 1 : 0.62;
  const strumSpacing = accentLevel === 2 ? 0.014 : 0.011;

  orderedNotes.forEach((note, index) => {
    const frequency = typeof note === "number" ? note : noteToFrequency(note);
    const noteTime = time + index * strumSpacing;
    const level = volume * 0.048 * accentScale * (1 - index * 0.04);
    const panValue = -0.32 + (index / Math.max(1, orderedNotes.length - 1)) * 0.64;
    schedulePluckedString(frequency, noteTime, level, panValue);
  });

  schedulePickNoise(time, volume * (accentLevel === 2 ? 0.06 : 0.035));
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
  const accentLevel = els.accentToggle.checked ? state.accentPattern[slot] : 0;
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

  els.beatNumber.textContent = String(currentBeat(slot));
  const chordName = state.chordSequence[state.barIndex % state.chordSequence.length] ?? "C";
  els.strokeName.textContent = isCountIn ? "Count in" : `${meta.label} ${chordName}`;
  els.slotLabel.textContent = isSilent
    ? `Silent bar ${state.barIndex + 1}`
    : `Beat ${currentBeat(slot)}, slot ${(slot % state.subdivision) + 1}`;

  els.pulseRing.classList.remove("active", "muted");
  els.pulseRing.classList.add(isSilent ? "muted" : "active");
  window.setTimeout(() => els.pulseRing.classList.remove("active"), 90);
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
  els.activeChordCard.title = voicingCount > 1 ? `Click to switch ${chordName} fingering` : "";
  els.activeChordDiagram.innerHTML = renderChordDiagram(chordName);

  const nextIndex = (chordIndex + 1) % Math.max(1, state.chordSequence.length);
  const nextChordName = state.chordSequence[nextIndex] ?? "C";
  const nextVoicingCount = getChordVoicings(nextChordName).length;
  const nextVoicingIndex = (state.chordVoicings[nextChordName] ?? 0) + 1;
  els.nextMeasure.textContent = `Next ${nextIndex + 1}`;
  els.nextChordName.textContent = nextChordName;
  els.nextVoicing.textContent = nextVoicingCount > 1 ? `${nextVoicingIndex}/${nextVoicingCount}` : "1/1";
  els.nextVoicing.hidden = nextVoicingCount < 2;
  els.nextChordCard.title = nextVoicingCount > 1 ? `Click to switch ${nextChordName} fingering` : "";
  els.nextChordDiagram.innerHTML = renderChordDiagram(nextChordName);
}

function startPlayback({ resetProgress = false } = {}) {
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
  els.playButton.textContent = "Pause";
  scheduler();
  state.timer = window.setInterval(scheduler, 25);
}

function pausePlayback() {
  state.isPlaying = false;
  state.playGeneration += 1;
  clearTransportTimers();
  state.countInRemaining = 0;
  els.playButton.textContent = state.hasStarted ? "Resume" : "Start";
  updateVisualState(state.slotIndex, state.pattern[state.slotIndex], false, false);
}

function reset() {
  state.isPlaying = false;
  state.hasStarted = false;
  state.playGeneration += 1;
  clearTransportTimers();
  state.countInRemaining = 0;
  state.slotIndex = 0;
  state.barIndex = 0;
  els.playButton.textContent = "Start";
  updateVisualState(0, state.pattern[0], false, false);
}

function handleTapTempo() {
  const now = performance.now();
  state.tapTimes = state.tapTimes.filter((time) => now - time < 2400);
  state.tapTimes.push(now);

  if (state.tapTimes.length >= 2) {
    const intervals = state.tapTimes.slice(1).map((time, index) => time - state.tapTimes[index]);
    const average = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
    syncTempo(60000 / average);
  }
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
  els.tempoDown.addEventListener("click", () => syncTempo(state.tempo - 1));
  els.tempoUp.addEventListener("click", () => syncTempo(state.tempo + 1));
  els.tapTempoButton.addEventListener("click", handleTapTempo);
  els.playButton.addEventListener("click", () => {
    if (state.isPlaying) {
      pausePlayback();
      return;
    }
    startPlayback({ resetProgress: !state.hasStarted });
  });
  els.resetButton.addEventListener("click", reset);
  els.loadSequenceButton.addEventListener("click", () => els.sequenceFileInput.click());
  els.saveSequenceButton.addEventListener("click", saveChordSequence);
  els.expandChordsButton.addEventListener("click", () => setFullChordPanel(els.fullChordPanel.hidden));
  els.sequenceFileInput.addEventListener("change", (event) => {
    loadChordSequenceFile(event.target.files?.[0]);
    event.target.value = "";
  });
  els.activeChordCard.addEventListener("click", () => {
    const chordName = state.chordSequence[state.barIndex % Math.max(1, state.chordSequence.length)] ?? "C";
    cycleChordVoicing(chordName);
  });
  els.nextChordCard.addEventListener("click", () => {
    const nextIndex = (state.barIndex + 1) % Math.max(1, state.chordSequence.length);
    const chordName = state.chordSequence[nextIndex] ?? "C";
    cycleChordVoicing(chordName);
  });
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
}

function init() {
  renderPatternOptions();
  syncTempo(state.tempo);
  loadPreset(PATTERNS[0].id);
  bindEvents();
}

init();
