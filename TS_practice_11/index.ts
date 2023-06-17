interface Queue<T> {
  enqueue(item: T): void; // queue up
  dequeue(): T | undefined; // drop out of the queue
  peek(): T | undefined | null; // see the first element
  isEmpty(): boolean; // сheck for "empty" entities
  length(): number; // length check
}

// Implementing a queue using an array
// The ArrayQueue class must implement the Queue interface
// The class can work with any type of data, that is, put any data in the array <-- Important

// A queue is a data structure that looks like a real queue in a store
// The first one to get to the counter is the first one to leave. It's the same in the code when executing tasks.
// A little more detail can be found on wikipedia or on other sites by searching for "queue data structure".

class ArrayQueue<T> implements Queue<T> {
  // Create a private queue property, which by default is an array and contains an array of any type
  // Method hint:
  // when adding to the queue, you can execute the push method
  // shift when deleting, because the first element must be deleted.
  // Note the return value
  // isEmpty can be used in other methods

  private queue: T[] = [];

  enqueue(this: ArrayQueue<T>, item: T): void {
    this.queue.push(item);
  }

  dequeue(this: ArrayQueue<T>): T {
    if (this.isEmpty()) {
      throw new Error("Queue Underflow");
    }

    return this.queue.shift() as T;
  }

  peek(this: ArrayQueue<T>): T | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.queue[0];
  }

  isEmpty(this: ArrayQueue<T>): boolean {
    return this.queue.length === 0;
  }

  length(this: ArrayQueue<T>): number {
    return this.queue.length;
  }
}

// The stack is another data structure. The easiest way to think of it is as a stack of sheets on a table
// The last one you put on top is the one you pick up first.
// You can find more details in wikipedia or on other sites by searching for "stack data structure".
// The Stack class contains other methods, so there is no need to implement anything
// The class can work with any type of data, i.e. it can put any data into an array and contain an array of any type <-- Important

class Stack<T> {
  // Create a stack private property, which by default is an array and contains an array of any type
  // create a private property limit, which will be of type number
  private stack: T[] = [];
  private limit: number;

  // Here we set the limit for the stack of sheets.
  // If the stack overflows, the program hangs, and a very high sheet stack falls down
  // So the limit should always be
  constructor(limit: number = Number.MAX_VALUE) {
    this.limit = limit;
  }

  push(this: Stack<T>, value: T) {
    // Adds element to the stack
    // If the stack is overflowing, it throws error (throw new Error)
    if (this.length() + 1 > this.limit) {
      throw new Error("Stack Overflow");
    }

    this.stack.push(value);
  }

  pop(this: Stack<T>): T {
    // Deletes the last element of the array
    // If the stack is empty, it throws error (throw new Error)
    // When deleting an element, it returns it
    // In simple words: you take the top sheet of the stack and use it
    // If there are no sheets on the stack, you get an error, there's nothing to take
    if (this.length() !== 0) {
      return this.stack.pop() as T;
    }

    throw new Error("Stack Underflow");
  }

  length(this: Stack<T>): number {
    // Returns the number of elements in the stack
    return this.stack.length;
  }

  isEmpty(this: Stack<T>): boolean {
    // Checks the stack for "emptiness"
    return this.length() === 0;
  }

  top(this: Stack<T>): T | null {
    // Returns the last (top) element of the stack, but doesn't delete it
    // you just read what's written on the top stack
    // If the stack is empty, it returns null
    if (this.length() !== 0) {
      return this.stack[this.length() - 1];
    }

    return null;
  }
}

// For the tests

const arrTest1 = new ArrayQueue<number>();
arrTest1.enqueue(5);
arrTest1.enqueue(10);
console.log(arrTest1.peek());
console.log(arrTest1.dequeue());
console.log(arrTest1.length());

const arrTest2 = new ArrayQueue<string>();
arrTest2.enqueue("5");
arrTest2.enqueue("10");
console.log(arrTest2.peek());
console.log(arrTest2.dequeue());
console.log(arrTest2.length());

const stackTest1 = new Stack<number>(10);
stackTest1.push(20);
stackTest1.push(50);
console.log(stackTest1.top());
console.log(stackTest1.pop());
console.log(stackTest1.length());

const stackTest2 = new Stack<string>(10);
stackTest2.push("20");
stackTest2.push("50");
console.log(stackTest2.top());
console.log(stackTest2.pop());
console.log(stackTest2.length());
