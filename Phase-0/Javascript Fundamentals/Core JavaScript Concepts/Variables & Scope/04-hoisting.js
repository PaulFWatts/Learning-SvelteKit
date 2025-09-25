// 04-hoisting.js
// Understanding Variable Hoisting in JavaScript

console.log("=== VARIABLE HOISTING TUTORIAL ===\n");

// =============================================================================
// 1. WHAT IS HOISTING?
// =============================================================================

console.log("1. WHAT IS HOISTING?");
console.log("--------------------");

console.log("Hoisting is JavaScript's behavior of moving declarations to the top of their scope");
console.log("during the compilation phase, before code execution.\n");

// This code seems to work even though we use the variable before declaring it:
console.log("Using variable before declaration:");
console.log("myHoistedVar:", myHoistedVar); // undefined (not an error!)
var myHoistedVar = "I'm hoisted";
console.log("After assignment:", myHoistedVar);

console.log();

// =============================================================================
// 2. VAR HOISTING
// =============================================================================

console.log("2. VAR HOISTING");
console.log("---------------");

// What the code looks like:
function varHoistingExample() {
    console.log("Before declaration - varExample:", varExample); // undefined

    if (true) {
        var varExample = "I'm hoisted";
        console.log("Inside if - varExample:", varExample);
    }

    console.log("After if - varExample:", varExample);
}

varHoistingExample();

// What JavaScript actually does (conceptually):
function varHoistingExplained() {
    var varExample; // Declaration is hoisted to the top

    console.log("Before declaration - varExample:", varExample); // undefined

    if (true) {
        varExample = "I'm hoisted"; // Only assignment happens here
        console.log("Inside if - varExample:", varExample);
    }

    console.log("After if - varExample:", varExample);
}

console.log("\nWhat actually happens behind the scenes:");
varHoistingExplained();

console.log();

// =============================================================================
// 3. LET AND CONST HOISTING
// =============================================================================

console.log("3. LET AND CONST HOISTING");
console.log("--------------------------");

// let and const are hoisted but NOT initialized
function letConstHoistingExample() {
    console.log("Starting function...");

    // These would throw ReferenceError if uncommented:
    // console.log("letExample:", letExample); // ❌ ReferenceError
    // console.log("constExample:", constExample); // ❌ ReferenceError

    console.log("About to declare let and const...");
    let letExample = "I'm let";
    const constExample = "I'm const";

    console.log("After declaration - letExample:", letExample);
    console.log("After declaration - constExample:", constExample);
}

letConstHoistingExample();

// Demonstrating the error:
function demonstrateTDZ() {
    try {
        console.log("Trying to access letVar before declaration:", letVar);
    } catch (error) {
        console.log("❌ Error accessing letVar:", error.message);
    }

    let letVar = "Now I exist";
    console.log("After declaration - letVar:", letVar);
}

demonstrateTDZ();

console.log();

// =============================================================================
// 4. FUNCTION HOISTING
// =============================================================================

console.log("4. FUNCTION HOISTING");
console.log("--------------------");

// Function declarations are fully hoisted
console.log("Calling hoisted function:");
console.log("Result:", hoistedFunction()); // Works!

function hoistedFunction() {
    return "I'm a hoisted function!";
}

// Function expressions are NOT hoisted the same way
try {
    console.log("Trying to call function expression:", notHoisted());
} catch (error) {
    console.log("❌ Function expression error:", error.message);
}

var notHoisted = function () {
    return "I'm not hoisted!";
};

console.log("After assignment:", notHoisted());

// Arrow functions are also NOT hoisted
try {
    console.log("Trying to call arrow function:", arrowNotHoisted());
} catch (error) {
    console.log("❌ Arrow function error:", error.message);
}

var arrowNotHoisted = () => "I'm an arrow function!";

console.log();

// =============================================================================
// 5. HOISTING IN DIFFERENT SCOPES
// =============================================================================

console.log("5. HOISTING IN DIFFERENT SCOPES");
console.log("--------------------------------");

// Global scope hoisting
console.log("Global var before declaration:", globalVar); // undefined
var globalVar = "Global";

function scopeHoistingExample() {
    // Function scope hoisting
    console.log("Function var before declaration:", functionVar); // undefined
    var functionVar = "Function scoped";

    if (true) {
        // var is hoisted to function scope, not block scope
        console.log("Block var before declaration:", blockVar); // undefined
        var blockVar = "Block declared, but function scoped";
    }

    console.log("After block - blockVar:", blockVar); // Accessible!

    // let and const are hoisted to block scope
    {
        // These would throw if uncommented:
        // console.log("blockLet:", blockLet); // ❌ ReferenceError
        // console.log("blockConst:", blockConst); // ❌ ReferenceError

        let blockLet = "Block scoped let";
        const blockConst = "Block scoped const";

        console.log("In block - blockLet:", blockLet);
        console.log("In block - blockConst:", blockConst);
    }

    // blockLet and blockConst are not accessible here
}

scopeHoistingExample();

console.log();

// ==========================================================================
// 6. HOISTING WITH LOOPS
// =============================================================================

console.log("6. HOISTING WITH LOOPS");
console.log("----------------------");

// Classic hoisting issue with var in loops
function loopHoistingProblem() {
    console.log("Loop hoisting with var:");

    for (var i = 0; i < 3; i++) {
        // var i is hoisted to function scope
        setTimeout(() => {
            console.log("var i in timeout:", i); // Will print 3, 3, 3
        }, 10);
    }

    console.log("var i after loop:", i); // 3 (i is still accessible!)
}

loopHoistingProblem();

setTimeout(() => {
    console.log("\nLoop with let (no hoisting issues):");

    for (let j = 0; j < 3; j++) {
        // let j is block-scoped for each iteration
        setTimeout(() => {
            console.log("let j in timeout:", j); // Will print 0, 1, 2
        }, 50);
    }

    // j is not accessible here
    try {
        console.log("let j after loop:", j);
    } catch (error) {
        console.log("❌ let j not accessible after loop:", error.message);
    }
}, 100);

console.log();

// =============================================================================
// 7. HOISTING WITH NESTED FUNCTIONS
// =============================================================================

console.log("7. HOISTING WITH NESTED FUNCTIONS");
console.log("----------------------------------");

function outerFunction() {
    console.log("Outer function start");

    // This function is hoisted within outerFunction
    console.log("Calling nested function:", nestedFunction());

    function nestedFunction() {
        return "I'm nested and hoisted!";
    }

    // var is hoisted but let/const are not
    console.log("Hoisted var:", hoistedVar); // undefined

    try {
        console.log("Non-hoisted let:", nonHoistedLet);
    } catch (error) {
        console.log("❌ let not accessible before declaration:", error.message);
    }

    var hoistedVar = "I'm hoisted";
    let nonHoistedLet = "I'm not hoisted";

    console.log("After declarations:", hoistedVar, nonHoistedLet);
}

outerFunction();

console.log();

// =============================================================================
// 8. PRACTICAL IMPLICATIONS
// =============================================================================

console.log("8. PRACTICAL IMPLICATIONS");
console.log("--------------------------");

// Example 1: Why hoisting can cause bugs
function hoistingBug() {
    if (false) {
        var buggyVar = "This code never runs";
    }

    console.log("buggyVar:", buggyVar); // undefined (not an error!)
    // This can lead to unexpected behavior
}

hoistingBug();

// Example 2: Best practice - declare variables at the top
function bestPractice() {
    // Declare all variables at the top
    var name, age, isActive;
    let users, currentUser;
    const MAX_USERS = 100;

    // Now assign values
    name = "Alice";
    age = 30;
    isActive = true;
    users = [];
    currentUser = null;

    console.log("Best practice example:", { name, age, isActive, MAX_USERS });
}

bestPractice();

console.log();

// =============================================================================
// 9. DEBUGGING HOISTING ISSUES
// =============================================================================

console.log("9. DEBUGGING HOISTING ISSUES");
console.log("-----------------------------");

function debuggingExample() {
    console.log("Debug: What is myVar at start?", typeof myVar, myVar);

    if (Math.random() > 0.5) { // Random condition
        var myVar = "Set in if block";
        console.log("Debug: myVar set in if block:", myVar);
    } else {
        console.log("Debug: myVar not set in if block:", myVar);
    }

    console.log("Debug: myVar at end:", myVar);

    // Better approach with let
    let myBetterVar;

    if (Math.random() > 0.5) {
        myBetterVar = "Set conditionally";
    }

    console.log("Better approach with let:", myBetterVar);
}

debuggingExample();

console.log();

// =============================================================================
// 10. COMMON PITFALLS AND SOLUTIONS
// =============================================================================

console.log("10. COMMON PITFALLS AND SOLUTIONS");
console.log("----------------------------------");

// Pitfall 1: Expecting undefined var to throw error
function pitfall1() {
    console.log("This won't throw an error:", undefinedVar); // undefined
    var undefinedVar = "Now defined";
}

pitfall1();

// Solution: Use let/const for better error detection
function solution1() {
    // This would throw if uncommented:
    // console.log("This will throw:", betterVar); // ❌ ReferenceError
    let betterVar = "Better approach";
    console.log("After declaration:", betterVar);
}

solution1();

// Pitfall 2: Function expressions and hoisting
function pitfall2() {
    try {
        console.log("Calling function expression:", myFunc());
    } catch (error) {
        console.log("❌ Function expression not hoisted:", error.message);
    }

    var myFunc = function () {
        return "I'm a function expression";
    };

    console.log("After assignment:", myFunc());
}

pitfall2();

console.log();

// =============================================================================
// 11. BEST PRACTICES
// =============================================================================

console.log("11. BEST PRACTICES");
console.log("------------------");
console.log("✅ Use let and const instead of var");
console.log("✅ Declare variables at the top of their scope");
console.log("✅ Initialize variables when you declare them");
console.log("✅ Use function declarations for functions you want hoisted");
console.log("✅ Use function expressions or arrow functions for better control");
console.log("❌ Don't rely on hoisting behavior");
console.log("❌ Don't declare variables in the middle of functions");
console.log("❌ Don't use variables before declaring them");

// Good example
function goodPractice() {
    // All declarations at the top
    const MAX_ITEMS = 10;
    let items = [];
    let count = 0;

    // Function logic below
    for (let i = 0; i < MAX_ITEMS; i++) {
        items.push(`Item ${i + 1}`);
        count++;
    }

    console.log("Good practice result:", { count, items: items.slice(0, 3) });
}

goodPractice();

console.log("\n=== END OF HOISTING TUTORIAL ===");