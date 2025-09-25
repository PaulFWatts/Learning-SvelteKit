// 06-exercises.js
// Practice Exercises for Variables & Scope

console.log("=== VARIABLES & SCOPE EXERCISES ===\n");

// =============================================================================
// EXERCISE 1: Variable Declaration Practice
// =============================================================================

console.log("EXERCISE 1: Variable Declaration Practice");
console.log("=========================================");

// TODO: Fix the following code by choosing the correct variable declaration keyword
// Uncomment and fix each line:

// PROBLEM 1: This should be a constant that never changes
// var PI = 3.14159;
const PI = 3.14159;
console.log("✅ PI:", PI);

// PROBLEM 2: This should be a variable that can be reassigned
// const counter = 0;
let counter = 0;
counter++;
console.log("✅ Counter:", counter);

// PROBLEM 3: This should not be accessible outside the block
{
    // var blockVariable = "I should stay in the block";
    let blockVariable = "I should stay in the block";
    console.log("Inside block:", blockVariable);
}

// This should throw an error if blockVariable is properly scoped
try {
    console.log("Outside block:", blockVariable);
} catch (error) {
    console.log("✅ Correct! blockVariable is not accessible outside:", error.message);
}

console.log();

// =============================================================================
// EXERCISE 2: Scope Identification
// =============================================================================

console.log("EXERCISE 2: Scope Identification");
console.log("=================================");

// Analyze the following code and predict the output
function scopeExercise() {
    var a = 1;
    let b = 2;
    const c = 3;

    if (true) {
        var a = 4; // Same variable as outer 'a'
        let b = 5; // Different variable from outer 'b'
        const c = 6; // Different variable from outer 'c'

        console.log("Inside if - a:", a, "b:", b, "c:", c);
    }

    console.log("Outside if - a:", a, "b:", b, "c:", c);

    // QUESTION: What will be the output?
    // Write your prediction as comments:

    // Inside if - a: 4, b: 5, c: 6
    // Outside if - a: 4, b: 2, c: 3

    // Explanation:
    // - var 'a' is function-scoped, so inner assignment affects outer variable
    // - let 'b' and const 'c' are block-scoped, so inner variables are separate
}

scopeExercise();

console.log();

// =============================================================================
// EXERCISE 3: Hoisting Challenge
// =============================================================================

console.log("EXERCISE 3: Hoisting Challenge");
console.log("===============================");

// Predict the output of the following functions:

function hoistingChallenge1() {
    console.log("Challenge 1 - var:", typeof myVar, myVar);
    var myVar = "I'm hoisted";
    console.log("After declaration:", myVar);
}

// YOUR PREDICTION:
// var is hoisted and initialized as undefined
// Output: "undefined undefined" then "I'm hoisted"

hoistingChallenge1();

function hoistingChallenge2() {
    try {
        console.log("Challenge 2 - let:", myLet);
    } catch (error) {
        console.log("Error:", error.message);
    }

    let myLet = "I'm in TDZ";
    console.log("After declaration:", myLet);
}

// YOUR PREDICTION:
// let is hoisted but not initialized (TDZ)
// Output: ReferenceError, then "I'm in TDZ"

hoistingChallenge2();

console.log();

// =============================================================================
// EXERCISE 4: Loop Scope Fix
// =============================================================================

console.log("EXERCISE 4: Loop Scope Fix");
console.log("===========================");

// PROBLEM: The following code doesn't work as expected
// Fix it so that each timeout prints the correct index

console.log("Broken version with var:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("var i:", i); // This will print 3, 3, 3
    }, 10);
}

// FIX 1: Using let (simplest solution)
setTimeout(() => {
    console.log("\nFixed version with let:");
    for (let j = 0; j < 3; j++) {
        setTimeout(() => {
            console.log("let j:", j); // This will print 0, 1, 2
        }, 50);
    }
}, 100);

// FIX 2: Using IIFE (older approach)
setTimeout(() => {
    console.log("\nFixed version with IIFE:");
    for (var k = 0; k < 3; k++) {
        (function (index) {
            setTimeout(() => {
                console.log("IIFE index:", index); // This will print 0, 1, 2
            }, 100);
        })(k);
    }
}, 200);

console.log();

// =============================================================================
// EXERCISE 5: Temporal Dead Zone Debug
// =============================================================================

console.log("EXERCISE 5: Temporal Dead Zone Debug");
console.log("=====================================");

// Find and fix the TDZ errors in the following code:

function tdzExercise() {
    console.log("Starting TDZ exercise...");

    // PROBLEM: This will cause a TDZ error
    try {
        console.log("Early access:", earlyVariable);
    } catch (error) {
        console.log("❌ TDZ Error:", error.message);
    }

    // FIX: Move the declaration before usage
    let earlyVariable = "Now I'm accessible";
    console.log("✅ After declaration:", earlyVariable);

    // PROBLEM: Parameter TDZ issue
    function parameterTDZ(first = second, second = "default") {
        return `${first} - ${second}`;
    }

    try {
        console.log("Parameter TDZ:", parameterTDZ());
    } catch (error) {
        console.log("❌ Parameter TDZ:", error.message);
    }

    // FIX: Correct parameter order
    function fixedParameters(first = "default", second = first + " extended") {
        return `${first} - ${second}`;
    }

    console.log("✅ Fixed parameters:", fixedParameters());
}

tdzExercise();

console.log();

// =============================================================================
// EXERCISE 6: Build a Module with Proper Scope
// =============================================================================

console.log("EXERCISE 6: Build a Module");
console.log("===========================");

// Create a counter module with private variables and public methods
const counterModule = (function () {
    // Private variables (function-scoped)
    let count = 0;
    const MAX_COUNT = 10;
    let history = [];

    // Private functions
    function addToHistory(action, value) {
        history.push({ action, value, timestamp: Date.now() });
    }

    // Public API
    return {
        increment() {
            if (count < MAX_COUNT) {
                count++;
                addToHistory('increment', count);
                return count;
            } else {
                console.log("Maximum count reached!");
                return count;
            }
        },

        decrement() {
            if (count > 0) {
                count--;
                addToHistory('decrement', count);
                return count;
            } else {
                console.log("Cannot go below zero!");
                return count;
            }
        },

        getValue() {
            return count;
        },

        reset() {
            count = 0;
            addToHistory('reset', count);
            return count;
        },

        getHistory() {
            return [...history]; // Return copy to prevent external modification
        }
    };
})();

// Test the module
console.log("Testing counter module:");
console.log("Increment:", counterModule.increment()); // 1
console.log("Increment:", counterModule.increment()); // 2
console.log("Current value:", counterModule.getValue()); // 2
console.log("Decrement:", counterModule.decrement()); // 1
console.log("Reset:", counterModule.reset()); // 0

// Try to access private variables (should fail)
try {
    console.log("Trying to access private count:", count);
} catch (error) {
    console.log("✅ Private variables are protected:", error.message);
}

console.log();

// =============================================================================
// EXERCISE 7: Scope Chain Challenge
// =============================================================================

console.log("EXERCISE 7: Scope Chain Challenge");
console.log("==================================");

// Trace through the scope chain and predict the output
const globalVar = "global";

function outerFunction(outerParam) {
    const outerVar = "outer";

    function middleFunction(middleParam) {
        const middleVar = "middle";

        function innerFunction(innerParam) {
            const innerVar = "inner";

            // What can this function access?
            console.log("Inner can access:");
            console.log("- innerVar:", innerVar);
            console.log("- innerParam:", innerParam);
            console.log("- middleVar:", middleVar);
            console.log("- middleParam:", middleParam);
            console.log("- outerVar:", outerVar);
            console.log("- outerParam:", outerParam);
            console.log("- globalVar:", globalVar);
        }

        innerFunction("inner param");

        // What can this function access?
        console.log("\nMiddle can access:");
        console.log("- middleVar:", middleVar);
        console.log("- middleParam:", middleParam);
        console.log("- outerVar:", outerVar);
        console.log("- outerParam:", outerParam);
        console.log("- globalVar:", globalVar);
        // console.log("- innerVar:", innerVar); // ❌ Not accessible
    }

    middleFunction("middle param");
}

outerFunction("outer param");

console.log();

// =============================================================================
// EXERCISE 8: Real-World Scenario
// =============================================================================

console.log("EXERCISE 8: Real-World Scenario");
console.log("================================");

// Create a user management system with proper variable scoping
function createUserManager() {
    // Private state
    const users = new Map();
    let nextId = 1;
    const maxUsers = 100;

    // Validation functions (private)
    function validateEmail(email) {
        return email && email.includes('@');
    }

    function validateName(name) {
        return name && name.trim().length > 0;
    }

    // Public API
    return {
        addUser(name, email) {
            if (users.size >= maxUsers) {
                throw new Error('Maximum users reached');
            }

            if (!validateName(name)) {
                throw new Error('Invalid name');
            }

            if (!validateEmail(email)) {
                throw new Error('Invalid email');
            }

            const user = {
                id: nextId++,
                name: name.trim(),
                email: email.toLowerCase(),
                createdAt: new Date()
            };

            users.set(user.id, user);
            return user.id;
        },

        getUser(id) {
            return users.get(id) || null;
        },

        updateUser(id, updates) {
            const user = users.get(id);
            if (!user) {
                throw new Error('User not found');
            }

            if (updates.name && !validateName(updates.name)) {
                throw new Error('Invalid name');
            }

            if (updates.email && !validateEmail(updates.email)) {
                throw new Error('Invalid email');
            }

            Object.assign(user, updates);
            return user;
        },

        deleteUser(id) {
            return users.delete(id);
        },

        getUserCount() {
            return users.size;
        },

        getAllUsers() {
            return Array.from(users.values());
        }
    };
}

// Test the user manager
const userManager = createUserManager();

try {
    const id1 = userManager.addUser("Alice Johnson", "alice@example.com");
    const id2 = userManager.addUser("Bob Smith", "bob@example.com");

    console.log("Users created:", userManager.getUserCount());
    console.log("User 1:", userManager.getUser(id1));

    userManager.updateUser(id1, { name: "Alice Cooper" });
    console.log("Updated user 1:", userManager.getUser(id1));

    // Try to access private variables (should fail)
    try {
        console.log("Trying to access private users:", users);
    } catch (error) {
        console.log("✅ Private state is protected");
    }

} catch (error) {
    console.log("Error:", error.message);
}

console.log();

// =============================================================================
// EXERCISE 9: Variable Best Practices Quiz
// =============================================================================

console.log("EXERCISE 9: Best Practices Quiz");
console.log("================================");

// For each scenario, choose the best variable declaration:

console.log("Scenario 1: Mathematical constant");
const SPEED_OF_LIGHT = 299792458; // ✅ const (never changes)
console.log("✅ Use const for constants:", SPEED_OF_LIGHT);

console.log("\nScenario 2: Loop counter");
for (let i = 0; i < 3; i++) { // ✅ let (block-scoped, reassigned)
    console.log("✅ Use let for loop counters:", i);
}

console.log("\nScenario 3: Conditional variable");
let message; // ✅ let (may be assigned conditionally)
if (Math.random() > 0.5) {
    message = "Heads";
} else {
    message = "Tails";
}
console.log("✅ Use let for conditional assignment:", message);

console.log("\nScenario 4: Object that won't be reassigned");
const config = { // ✅ const (object reference won't change)
    debug: true,
    version: "1.0"
};
config.debug = false; // ✅ Can modify properties
console.log("✅ Use const for objects:", config);

console.log();

// =============================================================================
// EXERCISE 10: Debug the Scope Issues
// =============================================================================

console.log("EXERCISE 10: Debug the Scope Issues");
console.log("====================================");

// Find and fix all the scope-related bugs in this code:

function buggyFunction() {
    console.log("Debugging scope issues...");

    // BUG 1: Using variable before declaration
    try {
        console.log("Early access:", myVariable);
    } catch (error) {
        console.log("❌ Bug 1 - TDZ:", error.message);
    }

    let myVariable = "Fixed!";
    console.log("✅ Fix 1 - After declaration:", myVariable);

    // BUG 2: var in loop causing issues
    console.log("\n❌ Bug 2 - var in loop:");
    for (var j = 0; j < 2; j++) {
        setTimeout(() => {
            console.log("var j:", j); // Will print 2, 2
        }, 10);
    }

    setTimeout(() => {
        console.log("\n✅ Fix 2 - let in loop:");
        for (let k = 0; k < 2; k++) {
            setTimeout(() => {
                console.log("let k:", k); // Will print 0, 1
            }, 50);
        }
    }, 100);

    // BUG 3: Accidental global variable
    function createGlobal() {
        // accidentalGlobal = "Oops!"; // ❌ Creates global
        let intentionalLocal = "Good!"; // ✅ Properly scoped
        return intentionalLocal;
    }

    console.log("\n✅ Fix 3 - Proper declaration:", createGlobal());
}

buggyFunction();

console.log();

// =============================================================================
// SUMMARY AND ANSWERS
// =============================================================================

setTimeout(() => {
    console.log("=== EXERCISE SUMMARY ===");
    console.log("✅ Use const by default");
    console.log("✅ Use let when you need to reassign");
    console.log("✅ Avoid var in modern JavaScript");
    console.log("✅ Declare variables at the top of their scope");
    console.log("✅ Be aware of the Temporal Dead Zone");
    console.log("✅ Use block scope to limit variable access");
    console.log("✅ Understand the scope chain");
    console.log("✅ Use closures for data privacy");

    console.log("\n=== CONGRATULATIONS! ===");
    console.log("You've completed the Variables & Scope exercises!");
    console.log("Now you should understand:");
    console.log("- The differences between var, let, and const");
    console.log("- Block scope vs function scope");
    console.log("- Variable hoisting and the Temporal Dead Zone");
    console.log("- How to write better, more maintainable code");

    console.log("\n=== END OF EXERCISES ===");
}, 500);