import { describe, expect, it } from 'vitest';
import { sha256Hex, shortHash, stampPhoto } from '../photoProof';

describe('photo proof', () => {
  it('fingerprints bytes with SHA-256', async () => {
    const hex = await sha256Hex(new Blob(['abc']));
    expect(hex).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });

  it('gives a different fingerprint when one byte changes', async () => {
    const a = await sha256Hex(new Blob(['visit-photo-1']));
    const b = await sha256Hex(new Blob(['visit-photo-2']));
    expect(a).not.toBe(b);
  });

  it('stamps time, location and hash (demo location when no GPS is available)', async () => {
    const fixed = new Date('2026-11-18T10:15:00Z');
    const stamp = await stampPhoto(new Blob(['abc']), () => fixed);
    expect(stamp.capturedAt).toBe('2026-11-18T10:15:00.000Z');
    expect(stamp.locationSource).toBe('demo');
    expect(stamp.accuracyM).toBeGreaterThan(0);
    expect(shortHash(stamp.sha256)).toBe('ba7816bf…15ad');
  });
});
