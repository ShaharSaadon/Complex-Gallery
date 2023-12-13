export const painting = [
    {
        title: "Input Output",
        level: "beginner",
        instruction: "Modify the greet function to greet the provided name.",
        code: `
      function greet(name) {
        // Your code here
      }
      greet('John');
      `,
        hint: "Think about how you can use console.log to display the greeting.",
        solution: `
      function greet(name) {
        console.log('Hello, ' + name);
      }
      greet('John');
      `,
    },
    {
        title: " Array Initialization",
        level: "beginner",
        instruction:
            "Initialize the 'numbers' array to contain the numbers 1 through 5.",
        code: `
      const numbers; // Your code here
      `,
        hint: "How do you write an array of numbers in JavaScript?",
        solution: `
      const numbers = [1, 2, 3, 4, 5];
      `,
    },
    {
        title: " String Concatenation",
        level: "beginner",
        instruction:
            "Concatenate 'str1' and 'str2' to form a single greeting message.",
        code: `
      const str1 = 'Hello';
      const str2 = 'World';
      const message; // Your code here
      `,
        hint: "How can you combine strings in JavaScript?",
        solution: `
      const str1 = 'Hello';
      const str2 = 'World';
      const message = str1 + ', ' + str2 + '!';
      `,
    },
    {
        title: " Array Filtering",
        level: "normal",
        instruction: "Filter the 'numbers' array to get only the odd numbers.",
        code: `
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const oddNumbers; // Your code here
      `,
        hint: "How do you use the 'filter' method in JavaScript?",
        solution: `
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const oddNumbers = numbers.filter(number => number % 2 !== 0);
      `,
    },
    {
        title: " Array Mapping",
        level: "normal",
        instruction:
            "Use the 'map' method to square each number in the 'numbers' array.",
        code: `
      const numbers = [1, 2, 3, 4, 5];
      const squares; // Your code here
      `,
        hint: "How can you use 'map' to apply a function to each item in an array?",
        solution: `
      const numbers = [1, 2, 3, 4, 5];
      const squares = numbers.map(number => number * number);
      `,
    },
    {
        title: " Array Reduction",
        level: "normal",
        instruction:
            "Use the 'reduce' method to calculate the sum of all numbers in the 'numbers' array.",
        code: `
      const numbers = [1, 2, 3, 4, 5];
      const sum; // Your code here
      `,
        hint: "How can you use 'reduce' to accumulate a value over all items in an array?",
        solution: `
      const numbers = [1, 2, 3, 4, 5];
      const sum = numbers.reduce((total, number) => total + number, 0);
      `,
    },
    {
        title: "Promise Usage",
        level: "professional",
        instruction:
            "Complete the 'makePromise' function so it returns a promise that resolves after 2 seconds with the value 'done'.",
        code: `
      function makePromise() {
        // Your code here
      }
      `,
        hint: "How can you create a new Promise in JavaScript?",
        solution: `
      function makePromise() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('done');
          }, 2000);
        });
      }
      `,
    },
    {
        title: "Promise Handling",
        level: "professional",
        instruction: "Fill in the blanks to handle the promise correctly.",
        code: `
      const promise = new Promise((resolve, reject) => {
        // This promise resolves after 1 second
        setTimeout(() => resolve('Promise resolved'), 1000);
      });

      // Your code here
      `,
        hint: "How do you handle a promise using .then() and .catch()?",
        solution: `
      const promise = new Promise((resolve, reject) => {
        // This promise resolves after 1 second
        setTimeout(() => resolve('Promise resolved'), 1000);
      });

      promise
        .then(result => console.log(result))
        .catch(error => console.log(error));
      `,
    },
    {
        title: "Async/Await",
        level: "professional",
        instruction:
            "Modify the function to use async/await to handle the promise.",
        code: `
      async function handlePromise() {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve('Promise resolved'), 1000);
        });

        // Your code here
      }

      handlePromise();
      `,
        hint: "How do you use async/await to handle a promise?",
        solution: `
      async function handlePromise() {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve('Promise resolved'), 1000);
        });

        try {
          const result = await promise;
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }

      handlePromise();
      `,
    },
];
