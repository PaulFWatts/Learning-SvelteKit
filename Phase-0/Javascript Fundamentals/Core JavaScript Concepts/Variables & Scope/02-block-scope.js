// 02-block-scope.js
// Understanding Block Scope in JavaScript

console.log("=== BLOCK SCOPE TUTORIAL ===\n");

// =============================================================================
// 1. WHAT IS BLOCK SCOPE?
// =============================================================================

console.log("1. WHAT IS BLOCK SCOPE?");
console.log("-----------------------");

// A block is created by curly braces {}
// Block scope means variables are only accessible within that block

console.log("A block is any code between { and }");
console.log("Examples: if statements, for loops, while loops, or just { } alone\n");

// =============================================================================
// 2. LET AND CONST ARE BLOCK-SCOPED
// =============================================================================

console.log("2. LET AND CONST ARE BLOCK-SCOPED");
console.log("----------------------------------");

{
    // This is a block
    let blockLet = "I'm inside a block (let)";
    const blockConst = "I'm inside a block (const)";

    console.log("Inside block - blockLet:", blockLet);
    console.log("Inside block - blockConst:", blockConst);
}

// Outside the block - these variables don't exist here
try {
    console.log("Outside block - blockLet:", blockLet);
} catch (error) {
    console.log("❌ Error accessing blockLet outside block:", error.message);
}

try {
    console.log("Outside block - blockConst:", blockConst);
} catch (error) {
    console.log("❌ Error accessing blockConst outside block:", error.message);
}

console.log();

// =============================================================================
// 3. VAR IS NOT BLOCK-SCOPED (IT'S FUNCTION-SCOPED)
// =============================================================================

console.log("3. VAR IS NOT BLOCK-SCOPED");
console.log("---------------------------");

{
    var blockVar = "I'm var inside a block";
    console.log("Inside block - blockVar:", blockVar);
}

// var is accessible outside the block! (This can cause bugs)
console.log("Outside block - blockVar:", blockVar); // ⚠️ Still accessible!

console.log();

// =============================================================================
// 4. BLOCK SCOPE IN IF STATEMENTS
// =============================================================================

console.log("4. BLOCK SCOPE IN IF STATEMENTS");
console.log("--------------------------------");

let condition = true;

if (condition) {
    let ifLet = "Only in if block";
    const ifConst = "Only in if block (const)";
    var ifVar = "Function scoped from if";

    console.log("Inside if - ifLet:", ifLet);
    console.log("Inside if - ifConst:", ifConst);
    console.log("Inside if - ifVar:", ifVar);
}

// Outside the if block
console.log("Outside if - ifVar:", ifVar); // ✅ Works (var is function-scoped)

try {
    console.log("Outside if - ifLet:", ifLet);
} catch (error) {
    console.log("❌ ifLet not accessible outside if:", error.message);
}

console.log();

// =============================================================================
// 5. BLOCK SCOPE IN FOR LOOPS
// =============================================================================

console.log("5. BLOCK SCOPE IN FOR LOOPS");
console.log("----------------------------");

// Classic problem with var in loops
console.log("Problem with var in loops:");
for (var i = 0; i < 3; i++) {
    // var i is function-scoped, not block-scoped
    setTimeout(() => {
        console.log("var i after timeout:", i); // Will print 3, 3, 3
    }, 10);
}

setTimeout(() => {
    console.log("var i outside loop:", i); // Will print 3

    // Solution with let
    console.log("\nSolution with let:");
    for (let j = 0; j < 3; j++) {
        // let j is block-scoped, each iteration gets its own j
        setTimeout(() => {
            console.log("let j after timeout:", j); // Will print 0, 1, 2
        }, 50);
    }

    setTimeout(() => {
        try {
            console.log("let j outside loop:", j);
        } catch (error) {
            console.log("❌ let j not accessible outside loop:", error.message);
        }
    }, 100);

}, 30);

console.log();

// =============================================================================
// 6. NESTED BLOCKS
// =============================================================================

console.log("6. NESTED BLOCKS");
console.log("----------------");

let outer = "I'm in outer scope";

{
    let inner = "I'm in inner scope";
    console.log("Inner block can access outer:", outer);
    console.log("Inner block accessing inner:", inner);

    {
        let deepInner = "I'm in deep inner scope";
        console.log("Deep inner can access outer:", outer);
        console.log("Deep inner can access inner:", inner);
        console.log("Deep inner accessing deepInner:", deepInner);
    }

    // deepInner is not accessible here
    try {
        console.log("Trying to access deepInner:", deepInner);
    } catch (error) {
        console.log("❌ deepInner not accessible in inner block:", error.message);
    }
}

// inner is not accessible here
try {
    console.log("Trying to access inner:", inner);
} catch (error) {
    console.log("❌ inner not accessible in outer scope:", error.message);
}

console.log();

// =============================================================================
// 7. SWITCH STATEMENTS AND BLOCK SCOPE
// =============================================================================

console.log("7. SWITCH STATEMENTS AND BLOCK SCOPE");
console.log("-------------------------------------");

let day = 2;

switch (day) {
    case 1: {
        // Using block to create scope
        let dayName = "Monday";
        console.log("Day 1:", dayName);
        break;
    }
    case 2: {
        // Each case can have its own scope
        let dayName = "Tuesday"; // No conflict with case 1
        console.log("Day 2:", dayName);
        break;
    }
    default: {
        let dayName = "Unknown";
        console.log("Default:", dayName);
    }
}

// Without blocks, this would cause issues:
/*
switch (day) {
    case 1:
        let dayName = "Monday";  // First declaration
        break;
    case 2:
        let dayName = "Tuesday"; // ❌ Error: dayName already declared
        break;
}
*/

console.log();

// =============================================================================
// 8. PRACTICAL EXAMPLES
// =============================================================================

console.log("8. PRACTICAL EXAMPLES");
console.log("---------------------");

// Example 1: Preventing variable leakage
function processUsers(users) {
    let processedCount = 0;

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (user.active) {
            let message = `Processing ${user.name}`;
            console.log(message);
            processedCount++;
        }
        // user and message are not accessible here
    }

    console.log(`Processed ${processedCount} users`);
    // i, user, and message are not accessible here
}

processUsers([
    { name: "Alice", active: true },
    { name: "Bob", active: false },
    { name: "Charlie", active: true }
]);

console.log();

// Example 2: Event handlers with proper scope
function setupButtons() {
    const buttons = ["Button 1", "Button 2", "Button 3"];

    for (let i = 0; i < buttons.length; i++) {
        let buttonName = buttons[i];

        // Simulate creating event handlers
        setTimeout(() => {
            console.log(`${buttonName} clicked (index: ${i})`);
        }, (i + 1) * 100);
    }
}

setupButtons();

console.log();

// =============================================================================
// 9. COMMON PITFALLS AND SOLUTIONS
// =============================================================================

console.log("9. COMMON PITFALLS AND SOLUTIONS");
console.log("---------------------------------");

// Pitfall 1: Accidentally creating global variables
function pitfall1() {
    if (true) {
        // Forgot to declare - creates global variable!
        // accidentalGlobal = "Oops!"; // ❌ Bad practice

        // Correct way:
        let intentionalLocal = "This stays local";
        console.log("Local variable:", intentionalLocal);
    }
}

pitfall1();

// Pitfall 2: Reusing variable names in different scopes
function pitfall2() {
    let message = "Outer message";

    if (true) {
        let message = "Inner message"; // This is OK - different scope
        console.log("Inner scope:", message);
    }

    console.log("Outer scope:", message); // Original value unchanged
}

pitfall2();

console.log();

// =============================================================================
// 10. BEST PRACTICES
// =============================================================================

console.log("10. BEST PRACTICES");
console.log("------------------");
console.log("✅ Use let and const instead of var");
console.log("✅ Declare variables in the smallest scope possible");
console.log("✅ Use blocks to group related code and limit variable scope");
console.log("✅ Be careful with variable names in nested scopes");
console.log("❌ Don't rely on variable hoisting");
console.log("❌ Don't create unnecessary global variables");

console.log("\n=== END OF BLOCK SCOPE TUTORIAL ===");