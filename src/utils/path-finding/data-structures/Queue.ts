/* eslint-disable max-classes-per-file */
class QueueItem<ValueType> {
  value: ValueType;

  next: QueueItem<ValueType> | null;

  constructor(value: ValueType) {
    this.value = value;
    this.next = null;
  }
}
class Queue<ValueType> {
  head: QueueItem<ValueType> | null;

  tail: QueueItem<ValueType> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  isEmpty() {
    return this.head === null;
  }

  enqueue(value: ValueType) {
    const newItem = new QueueItem(value);
    if (this.isEmpty()) {
      this.head = newItem;
      this.tail = newItem;
      return;
    }

    this.tail!.next = newItem;
    this.tail = newItem;
  }

  dequeue(): ValueType | null {
    if (this.isEmpty()) return null;

    const res = this.head!.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head!.next;
    }

    return res;
  }

  traverse(): ValueType[] {
    const res = [];
    let current = this.head;
    while (current) {
      const { value } = current;
      res.push(value);
      current = current.next;
    }
    return res;
  }
}

export default Queue;
