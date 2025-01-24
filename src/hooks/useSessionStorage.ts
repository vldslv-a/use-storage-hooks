import { getStorage } from 'utils/getStorage';
import { useStorageManager } from './useStorageManager';

const sessionStorageManager = getStorage('sessionStorage');

/**
 * A custom React hook for interacting with the browser's sessionStorage.
 * It provides a simple interface for getting and setting values in sessionStorage.
 *
 * @template T - The type of the value to be stored.
 * @param {string} key - The key under which the value is stored in sessionStorage.
 * @returns {[T | undefined, (newValue?: T) => void]}
 *   - `value`: The current value associated with the key.
 *   - `setValue`: A function to update or remove the value. If `undefined` is passed, the value will be removed from sessionStorage.
 */
export const useSessionStorage = <T>(key: string) => useStorageManager<T>(sessionStorageManager, key);
