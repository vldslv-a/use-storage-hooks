import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { StorageManager } from 'models/StorageManager';

export const useStorageManager = <T>(storageManager: StorageManager, key: string) => {
  const subscribe = useCallback((listener: () => void) => storageManager.subscribe(listener), [storageManager]);

  const getSnapShot = useCallback(() => storageManager.getItem<T>(key), [key, storageManager]);

  const storeValue = useSyncExternalStore<T | undefined>(subscribe, getSnapShot);

  const changeValue = useCallback(
    (newValue?: T) => {
      if (typeof newValue === 'undefined') {
        storageManager.removeItem(key);
      } else {
        storageManager.setItem(key, newValue);
      }

      storageManager.listeners.forEach((listener) => {
        listener();
      });
    },
    [key, storageManager]
  );

  useEffect(() => {
    storageManager.attachStorageListener();

    return () => {
      storageManager.detachStorageListener();
    };
  }, [storageManager]);

  return [storeValue, changeValue] as const;
};
