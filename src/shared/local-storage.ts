export function saveToLocalStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);

  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}