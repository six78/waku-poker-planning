export function toDictionary<T extends object>(data: T[], groupBy: keyof T): { [key: string]: T } {
  const result: { [key: string]: T } = {};

  data.forEach(x => {
    const key = x[groupBy];
    if (typeof key === 'string' || typeof key === 'number') {
      result[key] = x;
    }
  });

  return result;
}

export function toArray<T>(data: { [key: string]: T }): T[] {
  return Object.values(data);
}