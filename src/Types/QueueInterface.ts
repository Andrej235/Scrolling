export interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  reverse(): void;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  toArray(): T[];
}
