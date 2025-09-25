# Variables & Scope in JavaScript

## Learning Objectives

By the end of this section, you will understand:

- The differences between `var`, `let`, and `const`
- Block scope vs function scope
- Variable hoisting behavior
- The temporal dead zone
- Best practices for variable declarations

## What You'll Learn

### 1. Variable Declaration Keywords
- **`var`**: Function-scoped, hoisted, can be redeclared
- **`let`**: Block-scoped, hoisted but not initialized, cannot be redeclared in same scope
- **`const`**: Block-scoped, hoisted but not initialized, must be initialized, immutable binding

### 2. Scope Types
- **Global Scope**: Variables accessible everywhere
- **Function Scope**: Variables accessible within the function
- **Block Scope**: Variables accessible within the block (ES6+)

### 3. Advanced Concepts
- **Hoisting**: Variable and function declarations are moved to the top
- **Temporal Dead Zone**: Period where let/const variables exist but cannot be accessed

## Files in This Section

1. **`01-var-let-const.js`** - Comprehensive comparison of declaration keywords
2. **`02-block-scope.js`** - Understanding block scope with practical examples
3. **`03-function-scope.js`** - Function scope behavior and patterns
4. **`04-hoisting.js`** - Variable hoisting demonstrations
5. **`05-temporal-dead-zone.js`** - Temporal dead zone explained
6. **`06-exercises.js`** - Practice exercises
7. **`demo.html`** - Browser environment to run the examples

## How to Use This Section

1. Read through each JavaScript file in order
2. Run the examples in your browser using `demo.html`
3. Experiment with the code to see how changes affect behavior
4. Complete the exercises in `06-exercises.js`
5. Try to predict the output before running each example

## Key Takeaways Preview

- Use `const` by default, `let` when you need to reassign, avoid `var`
- Block scope prevents many common JavaScript pitfalls
- Understanding hoisting helps debug confusing behavior
- The temporal dead zone enforces better coding practices

## Next Steps

After mastering variables and scope, you'll be ready to tackle:
- Functions and closures
- Objects and prototypes
- Asynchronous JavaScript

---

💡 **Tip**: Open the browser's developer console (F12) to see the output of these examples and experiment with the concepts!