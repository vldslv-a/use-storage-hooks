import { getStorage } from 'utils/getStorage';
import { useStorageManager } from './useStorageManager';

const localStorageManager = getStorage('localStorage');

export const useLocalStorage = <T>(key: string) => useStorageManager<T>(localStorageManager, key);
