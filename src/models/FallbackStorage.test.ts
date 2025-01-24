import { FallbackStorage } from './FallbackStorage';

describe('FallbackStorage', () => {
  let storage: FallbackStorage;

  beforeEach(() => {
    storage = new FallbackStorage();
  });

  it('should set and get an item', () => {
    storage.setItem('key1', 'value1');

    expect(storage.getItem('key1')).toBe('value1');
  });

  it('should return null for non-existing key', () => {
    expect(storage.getItem('nonExistingKey')).toBeNull();
  });

  it('should remove an item', () => {
    storage.setItem('key1', 'value1');
    storage.removeItem('key1');

    expect(storage.getItem('key1')).toBeNull();
  });

  it('should clear all items', () => {
    storage.setItem('key1', 'value1');
    storage.setItem('key2', 'value2');
    storage.clear();

    expect(storage.getItem('key1')).toBeNull();
    expect(storage.getItem('key2')).toBeNull();
    expect(storage.length).toBe(0);
  });

  it('should return the correct length', () => {
    expect(storage.length).toBe(0);

    storage.setItem('key1', 'value1');
    expect(storage.length).toBe(1);

    storage.setItem('key2', 'value2');
    expect(storage.length).toBe(2);
  });

  it('should return the correct key by index', () => {
    storage.setItem('key1', 'value1');
    storage.setItem('key2', 'value2');

    expect(storage.key(0)).toBe('key1');
    expect(storage.key(1)).toBe('key2');
    expect(storage.key(2)).toBeNull();
  });
});
