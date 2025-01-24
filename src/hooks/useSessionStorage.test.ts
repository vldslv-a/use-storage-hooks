import { renderHook, act } from '@testing-library/react';
import { useSessionStorage } from './useSessionStorage';

describe('useSessionStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should initialize with undefined if no value is in sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage<string>(key));

    const [value] = result.current;

    expect(value).toBeUndefined();
  });

  it('should initialize with the value from sessionStorage if it exists', () => {
    sessionStorage.setItem(key, JSON.stringify('value from sessionStorage'));

    const { result } = renderHook(() => useSessionStorage<string>(key));

    const [value] = result.current;

    expect(value).toBe('value from sessionStorage');
  });

  it('should set a new value in sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage<string>(key));

    const [, setValue] = result.current;

    act(() => {
      setValue('new value');
    });

    expect(sessionStorage.getItem(key)).toBe(JSON.stringify('new value'));

    const [value] = result.current;
    expect(value).toBe('new value');
  });

  it('should remove the value from sessionStorage when set to undefined', () => {
    sessionStorage.setItem(key, JSON.stringify('stored value'));

    const { result } = renderHook(() => useSessionStorage<string>(key));

    const [, setValue] = result.current;

    act(() => {
      setValue();
    });

    expect(sessionStorage.getItem(key)).toBeNull();

    const [value] = result.current;
    expect(value).toBeUndefined();
  });
});
