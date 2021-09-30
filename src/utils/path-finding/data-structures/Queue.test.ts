import Queue from './Queue';

test('return correct enqueued items', () => {
  const queue = new Queue();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  expect(queue.traverse()).toEqual([1, 2, 3]);
});

test('return correct dequeued item', () => {
  const queue = new Queue();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  expect(queue.dequeue()).toEqual(1);
});

test('return null when dequeueing empty queue', () => {
  const queue = new Queue();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  queue.dequeue();
  queue.dequeue();
  queue.dequeue();
  expect(queue.dequeue()).toEqual(null);
});
