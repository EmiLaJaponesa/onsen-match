/**
 * Session Manager for anonymous user tracking
 * Uses localStorage to persist session ID across page reloads
 */

const SESSION_KEY = 'onsen_quiz_session_id';

/**
 * Generate a new UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get or create a session ID for the current user
 * @returns Session UUID
 */
export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    sessionId = generateUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}

/**
 * Clear the current session (useful for starting fresh)
 */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Check if a session exists
 */
export function hasSession(): boolean {
  return localStorage.getItem(SESSION_KEY) !== null;
}
