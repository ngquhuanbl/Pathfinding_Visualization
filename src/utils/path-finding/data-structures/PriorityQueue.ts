/* eslint-disable max-classes-per-file */
class PQItem<ValueType> {
  value: ValueType;

  priority: number;

  next: PQItem<ValueType> | null;

  constructor(value: ValueType, priority: number) {
    this.value = value;
    this.priority = priority;
    this.next = null;
  }
}
class PriorityQueue<ValueType> {
  head: PQItem<ValueType> | null;

  tail: PQItem<ValueType> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  enqueue(value: ValueType, priority: number) {
    const newItem = new PQItem<ValueType>(value, priority);
    if (this.isEmpty()) {
      this.head = newItem;
      this.tail = newItem;
      return;
    }

    let prev = null;
    let current = this.head;

    while (current !== null) {
      // A suitable inserting position is found
      if (current.priority > priority) {
        // Insert the item
        if (current === this.head) {
          newItem.next = this.head;
          this.head = newItem;
        } else {
          newItem.next = current;
          prev.next = newItem;
        }
        break;
      }

      prev = current;
      current = current.next;
    }

    // If newItem has the highest priority
    if (current === null) {
      this.tail.next = newItem;
      this.tail = newItem;
    }
  }

  dequeue(): ValueType | undefined {
    if (this.isEmpty()) return undefined;

    const res = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    return res;
  }
}

export default PriorityQueue;
