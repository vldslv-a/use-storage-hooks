# use-storage-hooks

This library provides two hooks for managing state with `localStorage` and `sessionStorage` in a React application.

## Installation

```bash
npm install use-storage-hooks
```

## Hooks

### `useLocalStorage`

A hook to manage state with `localStorage`.

#### Usage

```tsx
import { useLocalStorage } from 'use-storage-hooks';

const MyComponent = () => {
    const [value, setValue] = useLocalStorage<string>('myKey');

    return (
        <div>
            <input
                type="text"
                value={value || ''}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};
```

### `useSessionStorage`

A hook to manage state with `sessionStorage`.

#### Usage

```tsx
import { useSessionStorage } from 'use-storage-hooks';

const MyComponent = () => {
    const [value, setValue] = useSessionStorage<string>('myKey');

    return (
        <div>
            <input
                type="text"
                value={value || ''}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};
```

## API

### `useLocalStorage<T>(key: string): [T | undefined, (newValue?: T) => void]`

- `key`: The key under which the value is stored in `localStorage`.
- Returns a tuple containing the stored value and a function to update it.

### `useSessionStorage<T>(key: string): [T | undefined, (newValue?: T) => void]`

- `key`: The key under which the value is stored in `sessionStorage`.
- Returns a tuple containing the stored value and a function to update it.

## License

MIT