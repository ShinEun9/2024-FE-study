const Stack = require("../stack.js");

describe("Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it("is created empty", () => {
    expect(stack.size()).toBe(0);
  });

  it("allows to push item", () => {
    stack.push("🍌");
    expect(stack.size()).toBe(1);
  });

  describe("pop", () => {
    it("throws an error if stack is empty", () => {
      expect(() => {
        stack.pop();
      }).toThrow("Stack is empty");
    });

    it("returns the last pushed item and removes it from the stack", () => {
      stack.push("🍌");
      stack.push("🍎");

      expect(stack.pop()).toBe("🍎");
      expect(stack.size()).toBe(1);
    });
  });
  describe("peek", () => {
    it("throws an error if stack is empty", () => {
      expect(() => {
        stack.peek();
      }).toThrow("Stack is empty");
    });

    it("returns the last pushed item but keeps it in the stack", () => {
      stack.push("🍌");
      stack.push("🍎");

      expect(stack.peek()).toBe("🍎");
      expect(stack.size()).toBe(2);
    });
  });
});

// const Stack = require("../stack");

// describe("stack test", () => {
//   let stack;
//   beforeEach(() => {
//     stack = new Stack();
//   });

//   it("push", () => {
//     expect(stack.push(3)).toBe(1);
//     // expect(stack).toEqual([3]);
//   });

//   describe("pop", () => {
//     it("pop when 원소가 있을때", () => {
//       stack.push(3);
//       expect(stack.pop()).toBe(3);
//     });
//     it("pop when 원소가 없을 때", () => {
//       expect(stack.pop()).toBeUndefined();
//     });
//   });
// });
