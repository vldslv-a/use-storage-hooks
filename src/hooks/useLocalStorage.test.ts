import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with undefined if no value is in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<string>(key));

    const [value] = result.current;

    expect(value).toBeUndefined();
  });

  it('should initialize with the value from localStorage if it exists', () => {
    localStorage.setItem(key, JSON.stringify('value from localStorage'));

    const { result } = renderHook(() => useLocalStorage<string>(key));

    const [value] = result.current;

    expect(value).toBe('value from localStorage');
  });

  it('should set a new value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<string>(key));

    const [, setValue] = result.current;

    act(() => {
      setValue('new value');
    });

    expect(localStorage.getItem(key)).toBe(JSON.stringify('new value'));

    const [value] = result.current;
    expect(value).toBe('new value');
  });

  it('should remove the value from localStorage when set to undefined', () => {
    localStorage.setItem(key, JSON.stringify('stored value'));

    const { result } = renderHook(() => useLocalStorage<string>(key));

    const [, setValue] = result.current;

    act(() => {
      setValue();
    });

    expect(localStorage.getItem(key)).toBeNull();

    const [value] = result.current;
    expect(value).toBeUndefined();
  });
});
