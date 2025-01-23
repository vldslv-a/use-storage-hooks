export class StorageManager {
  private storage: Storage;

  listeners: VoidFunction[] = [];

  constructor(storage: Storage) {
    this.storage = storage;
  }

  subscribe(onStoreChange: () => void) {
    this.listeners = [...this.listeners, onStoreChange];

    return () => {
      this.listeners = this.listeners.filter((l) => l !== onStoreChange);
    };
  }

  getItem<T>(key: string): T | undefined {
    try {
      const item = this.storage.getItem(key);

      return item ? (JSON.parse(item) as T) : undefined;
    } catch (e) {
      console.error(e);
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      if (typeof value === 'undefined') {
        this.storage.removeItem(key);
      } else {
        this.storage.setItem(key, JSON.stringify(value));
      }

      this.listeners.forEach((listener) => {
        listener();
      });
    } catch (e) {
      console.error(e);
    }
  }

  removeItem(key: string) {
    try {
      this.storage.removeItem(key);
      this.listeners.forEach((listener) => {
        listener();
      });
    } catch (e) {
      console.error(e);
    }
  }

  private handleStorageEvent = (event: StorageEvent) => {
    if (event.storageArea === this.storage) {
      this.listeners.forEach((listener) => {
        listener();
      });
    }
  };

  attachStorageListener() {
    window.addEventListener('storage', this.handleStorageEvent);
  }

  detachStorageListener() {
    window.removeEventListener('storage', this.handleStorageEvent);
  }
}
