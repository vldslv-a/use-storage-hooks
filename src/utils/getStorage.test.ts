import { FallbackStorage } from 'models/FallbackStorage';
import { StorageManager } from 'models/StorageManager';
import { getStorage } from 'utils/getStorage';

describe('getStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns StorageManager with localStorage', () => {
    const storageManager = getStorage('localStorage');

    expect(storageManager).toBeInstanceOf(StorageManager);
    // @ts-expect-error storage is private
    expect(storageManager.storage).toBe(window.localStorage);
  });

  it('returns StorageManager with sessionStorage', () => {
    const storageManager = getStorage('sessionStorage');

    expect(storageManager).toBeInstanceOf(StorageManager);
    // @ts-expect-error storage is private
    expect(storageManager.storage).toBe(window.sessionStorage);
  });

  it('returns StorageManager with FallbackStorage on error', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn);
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      get: () => {
        throw new Error('Test error');
      },
    });

    const storageManager = getStorage('localStorage');
    expect(storageManager).toBeInstanceOf(StorageManager);
    expect(console.error).toHaveBeenCalled();
    // @ts-expect-error storage is private
    expect(storageManager.storage).toBeInstanceOf(FallbackStorage);

    // Restore original localStorage
    Object.defineProperty(window, 'localStorage', {
      get: () => originalLocalStorage,
    });
  });
});
