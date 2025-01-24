import { getStorage } from 'utils/getStorage';
import { useStorageManager } from './useStorageManager';

const localStorageManager = getStorage('localStorage');

/**
 * A custom React hook for interacting with the browser's localStorage.
 * It provides a simple interface for getting and setting values in localStorage.
 *
 * @template T - The type of the value to be stored.
 * @param {string} key - The key under which the value is stored in localStorage.
 * @returns {[T | undefined, (newValue?: T) => void]}
 *   - `value`: The current value associated with the key.
 *   - `setValue`: A function to update or remove the value. If `undefined` is passed, the value will be removed from localStorage.
 */
export const useLocalStorage = <T>(key: string) => useStorageManager<T>(localStorageManager, key);
