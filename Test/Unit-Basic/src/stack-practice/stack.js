// ! 리팩토링 전
// class Stack {
//   constructor() {
//     this.array = [];
//   }

//   size() {
//     return this.array.length;
//   }

//   push(item) {
//     this.array.push(item);
//   }

//   pop() {
//     if (this.array.length === 0) {
//       throw new Error("Stack is empty");
//     }

//     return this.array.pop();
//   }

//   peek() {
//     if (this.array.length === 0) {
//       throw new Error("Stack is empty");
//     }
//     return this.array[this.size() - 1];
//   }
// }

// ! 리팩토링
class Stack {
  constructor() {
    this._size = 0;
    this.head = null;
  }

  size() {
    return this._size;
  }

  push(item) {
    const node = { item, next: this.head };
    this.head = node;
    this._size++;
  }

  pop() {
    if (this.head === null) {
      throw new Error("Stack is empty");
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.item;
  }

  peek() {
    if (this.head === null) {
      throw new Error("Stack is empty");
    }
    return this.head.item;
  }
}

module.exports = Stack;

// class Stack {
//   constructor() {
//     this.stack = [];
//   }
//   push(num) {
//     this.stack.push(num);
//     return this.stack.length;
//   }
//   pop() {
//     return this.stack.pop();
//     // return this.
//   }
// }

// module.exports = Stack;
