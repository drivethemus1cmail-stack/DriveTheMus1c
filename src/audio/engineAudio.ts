// Synthesized ignition sounds — chime, detent clicks, and the starter crank.
// Generated with Web Audio so the intro needs no extra audio downloads.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Short tactile tick as the key passes a detent. */
export function playDetent() {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;

  const len = Math.floor(ac.sampleRate * 0.04);
  const buffer = ac.createBuffer(1, len, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);

  const src = ac.createBufferSource();
  src.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2200;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.16, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  src.connect(filter).connect(gain).connect(ac.destination);
  src.start(now);
  src.stop(now + 0.06);
}

/** The key-in-ignition chime that plays when the switch reaches ON. */
export function playChime() {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const notes = [880, 660, 880, 660];

  notes.forEach((freq, i) => {
    const t = now + i * 0.4;

    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    const partial = ac.createOscillator();
    partial.type = "sine";
    partial.frequency.value = freq * 2;

    const partialGain = ac.createGain();
    partialGain.gain.value = 0.18;

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.14, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);

    osc.connect(gain).connect(ac.destination);
    partial.connect(partialGain).connect(gain);

    osc.start(t);
    osc.stop(t + 0.38);
    partial.start(t);
    partial.stop(t + 0.38);
  });
}

/** Starter motor crank rolling into a settled idle. */
export function playCrank(duration = 1.2) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;

  // starter whir: filtered noise sweeping down
  const len = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, len, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

  const src = ac.createBufferSource();
  src.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(260, now);
  filter.frequency.linearRampToValueAtTime(80, now + duration);

  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.linearRampToValueAtTime(0.2, now + 0.08);
  noiseGain.gain.setValueAtTime(0.2, now + duration * 0.62);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  // engine catching: low saw revving up then settling to idle
  const osc = ac.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(34, now);
  osc.frequency.linearRampToValueAtTime(74, now + duration * 0.66);
  osc.frequency.linearRampToValueAtTime(48, now + duration);

  const oscFilter = ac.createBiquadFilter();
  oscFilter.type = "lowpass";
  oscFilter.frequency.value = 320;

  const oscGain = ac.createGain();
  oscGain.gain.setValueAtTime(0.0001, now);
  oscGain.gain.linearRampToValueAtTime(0.16, now + 0.2);
  oscGain.gain.setValueAtTime(0.16, now + duration * 0.7);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.3);

  src.connect(filter).connect(noiseGain).connect(ac.destination);
  osc.connect(oscFilter).connect(oscGain).connect(ac.destination);

  src.start(now);
  src.stop(now + duration);
  osc.start(now);
  osc.stop(now + duration + 0.35);
}
