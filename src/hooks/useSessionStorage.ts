import { getStorage } from 'utils/getStorage';
import { useStorageManager } from './useStorageManager';

const sessionStorageManager = getStorage('sessionStorage');

export const useSessionStorage = <T>(key: string) => useStorageManager<T>(sessionStorageManager, key);
