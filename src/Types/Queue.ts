import { Queue as QueueInterface } from "./QueueInterface";

export class Queue<T> implements QueueInterface<T> {
  private items: T[] = [];
  public enqueue(item: T): void {
    console.log(this.items);
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items.length > 0 ? this.items[0] : undefined;
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  reverse(): void {
    this.items.reverse();
  }
}
