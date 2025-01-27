# use-storage-hooks

`use-storage-hooks` is a lightweight, easy-to-use library that provides React hooks for working with browser storage (`localStorage` and `sessionStorage`). It simplifies state management by enabling seamless integration of persistent storage into your React components.

## Why use `use-storage-hooks`?
This library provides a hassle-free solution for managing state persistence across sessions. Whether you need to store user preferences or temporary data, `use-storage-hooks` helps you integrate browser storage without repetitive boilerplate code.

## Installation

To install the library, use npm or yarn:

```bash
npm install use-storage-hooks
```

or

```bash
yarn add use-storage-hooks
```

## Hooks

### `useLocalStorage`

This hook allows you to manage state that is synchronized with `localStorage`.

#### Usage

```javascript
import { useLocalStorage } from 'use-storage-hooks';

const [value, setValue] = useLocalStorage<number>('key');
```

#### Parameters

- `key` (string): The key under which the value is stored in `localStorage`.

#### Returns

- `value` (T | undefined): The current value associated with the key. It returns the value of the generic type `T` or `undefined`.
- `setValue` (function): A function to update the value. It accepts a value of type `T` or `undefined`. If `undefined` is passed, the value will be removed from `localStorage`.

### `useSessionStorage`

This hook allows you to manage state that is synchronized with `sessionStorage`.

#### Usage

```javascript
import { useSessionStorage } from 'use-storage-hooks';

const [value, setValue] = useSessionStorage<number>('key');
```

#### Parameters

- `key` (string): The key under which the value is stored in `sessionStorage`.

#### Returns

- `value` (T | undefined): The current value associated with the key. It returns the value of the generic type `T` or `undefined`.
- `setValue` (function): A function to update the value. It accepts a value of type `T` or `undefined`. If `undefined` is passed, the value will be removed from `sessionStorage`.

### Example with `useLocalStorage` and `useSessionStorage`

```javascript
import React from 'react';
import { useLocalStorage, useSessionStorage } from 'use-storage-hooks';

function ComponentA() {
    const [localValue, setLocalValue] = useLocalStorage<number>('local-key');
    const [sessionValue, setSessionValue] = useSessionStorage<number>('session-key');

    return (
        <div>
            <p>Local Storage Value: {localValue}</p>
            <button onClick={() => setLocalValue(Math.random())}>Generate Random Local Number</button>
            <button onClick={() => setLocalValue(undefined)}>Remove Local Value</button>

            <p>Session Storage Value: {sessionValue}</p>
            <button onClick={() => setSessionValue(Math.random())}>Generate Random Session Number</button>
            <button onClick={() => setSessionValue(undefined)}>Remove Session Value</button>
        </div>
    );
}

function ComponentB() {
    const [localValue] = useLocalStorage<number>('local-key');
    const [sessionValue] = useSessionStorage<number>('session-key');

    return (
        <div>
            <p>Local Storage Value: {localValue}</p>
            <p>Session Storage Value: {sessionValue}</p>
        </div>
    );
}

function App() {
    return (
        <div>
            <ComponentA />
            <ComponentB />
        </div>
    );
}

export default App;
```

In this example, `ComponentA` and `ComponentB` share the same keys for both `localStorage` (`'local-key'`) and `sessionStorage` (`'session-key'`). When the values are updated in `ComponentA`, they are immediately reflected in `ComponentB`. The "Generate Random Local Number" and "Generate Random Session Number" buttons set new random numbers, and the "Remove" buttons remove the values from `localStorage` and `sessionStorage` respectively.

Both hooks use generics to allow you to specify the type of the stored value. By default, the type is `unknown`, but you can specify a different type when using the hooks.

#### Example with Generics

```javascript
import { useLocalStorage } from 'use-storage-hooks';

const [value, setValue] = useLocalStorage<number>('key');
```

In this example, `value` will be of type `number` and `setValue` will accept a value of type `number` or `undefined`.

## License

MIT
