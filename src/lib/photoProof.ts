/**
 * Visit photo proof (showcase edition).
 *
 * When an officer takes a proof photo, the app locks three things to it at capture time:
 * where it was taken (GPS + accuracy), when, and a SHA-256 fingerprint of the image bytes.
 * Managers later see the same fingerprint, so a swapped or edited photo is detectable.
 * The production app adds more checks on the server; this demo keeps the client side.
 */

export interface PhotoProofStamp {
  sha256: string;
  capturedAt: string;
  lat: number;
  lng: number;
  accuracyM: number;
  /** 'device' when the browser gave a real fix, 'demo' when we fell back to a sample point. */
  locationSource: 'device' | 'demo';
}

/** Hex-encoded SHA-256 of a file or blob, using the Web Crypto API. */
export async function sha256Hex(data: Blob | ArrayBuffer): Promise<string> {
  const buf = data instanceof Blob ? await data.arrayBuffer() : data;
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

const DEMO_POINT = { lat: 23.7806, lng: 90.4070, accuracyM: 12 };

/** Current position, or a demo point when location is unavailable (desktop browsers, denied permission). */
export function currentPosition(timeoutMs = 4000): Promise<{ lat: number; lng: number; accuracyM: number; locationSource: 'device' | 'demo' }> {
  return new Promise((resolve) => {
    const fallback = () => resolve({ ...DEMO_POINT, locationSource: 'demo' });
    if (typeof navigator === 'undefined' || !navigator.geolocation) return fallback();
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyM: Math.round(pos.coords.accuracy),
          locationSource: 'device',
        }),
      fallback,
      { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 0 },
    );
  });
}

export async function stampPhoto(file: Blob, now: () => Date = () => new Date()): Promise<PhotoProofStamp> {
  const [sha256, pos] = await Promise.all([sha256Hex(file), currentPosition()]);
  return { sha256, capturedAt: now().toISOString(), ...pos };
}

/** "ab12cd34…ef90" — enough to compare by eye on a phone screen. */
export const shortHash = (hex: string) => `${hex.slice(0, 8)}…${hex.slice(-4)}`;
