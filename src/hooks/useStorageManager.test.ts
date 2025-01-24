import { renderHook, act } from '@testing-library/react';
import { useStorageManager } from './useStorageManager';
import type { StorageManager } from 'models/StorageManager';

describe('useStorageManager', () => {
  let storageManager: StorageManager;
  let listeners: VoidFunction[];

  beforeEach(() => {
    listeners = [];
    storageManager = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      subscribe: jest.fn((listener: VoidFunction) => {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter((l) => l !== listener);
        };
      }),
      attachStorageListener: jest.fn(),
      detachStorageListener: jest.fn(),
      listeners: [jest.fn()],
    } as unknown as StorageManager;
  });

  it('should get and set value', () => {
    const key = 'testKey';
    const { result } = renderHook(() => useStorageManager<string>(storageManager, key));
    const [, setValue] = result.current;

    act(() => {
      setValue('newValue');
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(storageManager.setItem).toHaveBeenCalledWith(key, 'newValue');
  });

  it('should remove value when set to undefined', () => {
    const key = 'testKey';
    const { result } = renderHook(() => useStorageManager<string>(storageManager, key));
    const [, setValue] = result.current;

    act(() => {
      setValue();
    });

    storageManager.listeners.forEach((listener) => {
      expect(listener).toHaveBeenCalled();
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(storageManager.removeItem).toHaveBeenCalledWith(key);
  });

  it('should subscribe and unsubscribe listeners', () => {
    const key = 'testKey';
    const { unmount } = renderHook(() => useStorageManager<string>(storageManager, key));

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(storageManager.attachStorageListener).toHaveBeenCalled();

    unmount();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(storageManager.detachStorageListener).toHaveBeenCalled();
  });

  it('should notify listeners on value change', () => {
    const key = 'testKey';
    const { result } = renderHook(() => useStorageManager<string>(storageManager, key));
    const [, setValue] = result.current;

    const mockListener = jest.fn();
    storageManager.subscribe(mockListener);

    act(() => {
      setValue('newValue');
    });

    listeners.forEach((listener) => {
      listener();
    });

    expect(mockListener).toHaveBeenCalled();
  });
});
