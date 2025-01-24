export class FallbackStorage implements Storage {
  store: Record<string, string> = {};

  constructor() {
    this.store = {};
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] ?? null;
  }
}
