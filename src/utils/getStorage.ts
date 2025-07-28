import { FallbackStorage } from 'models/FallbackStorage';
import { StorageManager } from 'models/StorageManager';

export const getStorage = (storageType: 'localStorage' | 'sessionStorage') => {
  if (typeof window === 'undefined') {
    return new StorageManager(new FallbackStorage());
  }

  try {
    return new StorageManager(window[storageType]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return new StorageManager(new FallbackStorage());
  }
};
