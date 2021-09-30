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
    const newItem = new PQItem(value, priority);
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
        if (prev !== null) prev.next = newItem;
        else this.head = newItem;
        newItem.next = current;
        return;
      }

      prev = current;
      current = current.next;
    }

    // If newItem has the highest priority
    this.tail!.next = newItem;
    this.tail = newItem;
  }

  dequeue(): ValueType | null {
    if (this.isEmpty()) return null;

    const res = this.head!.value;

    this.head = this.head!.next;

    if (this.head === null) this.tail = null;

    return res;
  }
}

export default PriorityQueue;
