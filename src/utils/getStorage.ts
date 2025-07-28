import { FallbackStorage } from 'models/FallbackStorage';
import { StorageManager } from 'models/StorageManager';

export const getStorage = (storageType: 'localStorage' | 'sessionStorage') => {
  try {
    return new StorageManager(window[storageType]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return new StorageManager(new FallbackStorage());
  }
};
