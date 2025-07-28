import { FallbackStorage } from './FallbackStorage';
import { StorageManager } from './StorageManager';

describe('StorageManager', () => {
  let storage: StorageManager;
  let fallbackStorage: FallbackStorage;

  beforeEach(() => {
    fallbackStorage = new FallbackStorage();
    storage = new StorageManager(fallbackStorage);
  });

  it('should set and get an item', () => {
    storage.setItem('key1', 'value1');

    expect(storage.getItem('key1')).toBe('"value1"');
  });

  it('should return undefined for non-existing key', () => {
    expect(storage.getItem('nonExistingKey')).toBeUndefined();
  });

  it('should remove an item', () => {
    storage.setItem('key1', 'value1');
    storage.setItem('key1', undefined);

    expect(storage.getItem('key1')).toBeUndefined();
  });

  it('should notify listeners when an item is removed', () => {
    const listener = jest.fn();
    storage.subscribe(listener);

    storage.setItem('key1', 'value1');
    storage.removeItem('key1');
    expect(listener).toHaveBeenCalledTimes(2); // Once for setItem and once for removeItem
  });

  it('should clear all items', () => {
    storage.setItem('key1', 'value1');
    storage.setItem('key2', 'value2');
    fallbackStorage.clear();

    expect(storage.getItem('key1')).toBeUndefined();
    expect(storage.getItem('key2')).toBeUndefined();
  });

  it('should handle error in getItem', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn);

    const faultyStorage = {
      getItem: jest.fn(() => {
        throw new Error('Test error');
      }),
    } as unknown as Storage;

    const faultyStorageManager = new StorageManager(faultyStorage);

    faultyStorageManager.getItem('key1');
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle JSON stringify error in setItem', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn);

    const circularReference: Record<string, unknown> = {};
    circularReference.myself = circularReference;

    storage.setItem('key1', circularReference);
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle error in removeItem', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn);
    const faultyStorage = {
      removeItem: jest.fn(() => {
        throw new Error('Test error');
      }),
    } as unknown as Storage;
    const faultyStorageManager = new StorageManager(faultyStorage);

    faultyStorageManager.removeItem('key1');
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });

  it('should subscribe and unsubscribe listeners', () => {
    const listener = jest.fn();
    const unsubscribe = storage.subscribe(listener);

    storage.setItem('key1', 'value1');
    expect(listener).toHaveBeenCalled();

    unsubscribe();
    storage.setItem('key2', 'value2');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should handle storage event and notify listeners', () => {
    const listener = jest.fn();
    storage.subscribe(listener);

    const event = {
      key: 'key1',
      newValue: 'value1',
      storageArea: fallbackStorage as unknown as Storage,
    } as StorageEvent;

    // @ts-expect-error handleStorageEvent is private
    storage.handleStorageEvent(event);
    expect(listener).toHaveBeenCalled();
  });

  it('should attach and detach storage listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    storage.attachStorageListener();
    // @ts-expect-error handleStorageEvent is private
    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', storage.handleStorageEvent);

    storage.detachStorageListener();
    // @ts-expect-error handleStorageEvent is private
    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', storage.handleStorageEvent);
  });
});
