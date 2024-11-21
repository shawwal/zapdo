// src/utils/generateUUID.ts

/**
 * Generates a UUID v4 string.
 * Example: '3f29fcd0-1b4a-4c3e-9a9b-1d2e3f4a5b6c'
 *
 * @returns {string} The generated UUID.
 */
export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0; // Generate a random integer between 0 and 15
      const v = c === 'x' ? r : (r & 0x3 | 0x8); // For 'y', set the high bits to 8, 9, A, or B
      return v.toString(16);
    });
  }
  