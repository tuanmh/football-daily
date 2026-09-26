// localStorage persistence. One JSON blob, versioned.
import { mergeSettings } from './plan.js';

const KEY = 'football-daily:v1';

export function emptyState() {
  return { v: 1, settings: mergeSettings({}), history: {}, records: {}, brain: { answered: {}, seenAt: {} }, reflections: [] };
}

export function normalise(raw) {
  const base = emptyState();
  if (!raw || typeof raw !== 'object') return base;
  return {
    v: 1,
    settings: mergeSettings(raw.settings || {}),
    history: raw.history && typeof raw.history === 'object' ? raw.history : {},
    records: raw.records && typeof raw.records === 'object' ? raw.records : {},
    brain: { answered: {}, seenAt: {}, ...(raw.brain || {}) },
    reflections: Array.isArray(raw.reflections) ? raw.reflections : [],
  };
}

export function load(storage = globalThis.localStorage) {
  try {
    const txt = storage && storage.getItem(KEY);
    return normalise(txt ? JSON.parse(txt) : null);
  } catch {
    return emptyState();
  }
}

export function save(state, storage = globalThis.localStorage) {
  try { storage.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; }
}

export function clear(storage = globalThis.localStorage) {
  try { storage.removeItem(KEY); } catch { /* ignore */ }
}

export const STORAGE_KEY = KEY;
