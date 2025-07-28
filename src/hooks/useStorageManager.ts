import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import type { StorageManager } from 'models/StorageManager';

const getServerSnapshot = () => undefined;

export const useStorageManager = <T>(storageManager: StorageManager, key: string) => {
  const subscribe = useCallback((listener: VoidFunction) => storageManager.subscribe(listener), [storageManager]);

  const getSnapShot = useCallback(() => storageManager.getItem(key), [key, storageManager]);

  const storeValue = useSyncExternalStore<string | undefined>(subscribe, getSnapShot, getServerSnapshot);

  const value = useMemo(() => {
    if (!storeValue) {
      return undefined;
    }

    return JSON.parse(storeValue) as T;
  }, [storeValue]);

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

  return [value, changeValue] as const;
};
