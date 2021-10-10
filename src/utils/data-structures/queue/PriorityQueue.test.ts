import PriorityQueue from './PriorityQueue';

test('return correct enqueued items', () => {
  const queue = new PriorityQueue<number>();
  queue.enqueue(1, 0);
  queue.enqueue(2, 3);
  queue.enqueue(3, 2);
  expect(queue.traverse()).toEqual([1, 3, 2]);
});

test('return correct dequeued item', () => {
  const queue = new PriorityQueue();
  queue.enqueue(1, 1);
  queue.enqueue(2, -1);
  queue.enqueue(3, 0);
  expect(queue.dequeue()).toEqual(2);
});

test('return null when dequeueing empty queue', () => {
  const queue = new PriorityQueue();
  queue.enqueue(1, 0);
  queue.enqueue(2, 3);
  queue.enqueue(3, 2);
  queue.dequeue();
  queue.dequeue();
  queue.dequeue();
  expect(queue.dequeue()).toEqual(null);
});
