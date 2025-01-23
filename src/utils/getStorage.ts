import { FallbackStorage } from 'models/FallbackStorage';
import { StorageManager } from 'models/StorageManager';

type StorageType = 'localStorage' | 'sessionStorage';

export const getStorage = (storageType: StorageType) => {
  try {
    return new StorageManager(window[storageType]);
  } catch {
    return new StorageManager(new FallbackStorage());
  }
};
