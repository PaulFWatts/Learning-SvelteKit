// 05-temporal-dead-zone.js
// Understanding the Temporal Dead Zone in JavaScript

console.log("=== TEMPORAL DEAD ZONE TUTORIAL ===\n");

// =============================================================================
// 1. WHAT IS THE TEMPORAL DEAD ZONE (TDZ)?
// =============================================================================

console.log("1. WHAT IS THE TEMPORAL DEAD ZONE?");
console.log("-----------------------------------");

console.log("The Temporal Dead Zone (TDZ) is the period between:");
console.log("1. When a let/const variable is hoisted (created in memory)");
console.log("2. When it's actually declared and initialized in the code");
console.log();
console.log("During this period, the variable exists but cannot be accessed.");
console.log("Accessing it throws a ReferenceError.\n");

// =============================================================================
// 2. TDZ WITH LET
// =============================================================================

console.log("2. TDZ WITH LET");
console.log("---------------");

function letTDZExample() {
    console.log("Function starts - letVar is in TDZ");

    // letVar exists but is in TDZ - cannot be accessed
    try {
        console.log("Trying to access letVar:", letVar);
    } catch (error) {
        console.log("❌ TDZ Error:", error.message);
    }

    try {
        console.log("Trying typeof letVar:", typeof letVar);
    } catch (error) {
        console.log("❌ Even typeof throws in TDZ:", error.message);
    }

    // This line ends the TDZ for letVar
    let letVar = "Now I'm accessible!";
    console.log("✅ After declaration - letVar:", letVar);
    console.log("✅ Now typeof works:", typeof letVar);
}

letTDZExample();

console.log();

// =============================================================================
// 3. TDZ WITH CONST
// =============================================================================

console.log("3. TDZ WITH CONST");
console.log("-----------------");

function constTDZExample() {
    console.log("Function starts - constVar is in TDZ");

    try {
        console.log("Trying to access constVar:", constVar);
    } catch (error) {
        console.log("❌ TDZ Error for const:", error.message);
    }

    // const must be initialized when declared
    const constVar = "I must be initialized!";
    console.log("✅ After declaration - constVar:", constVar);
}

constTDZExample();

console.log();

// =============================================================================
// 4. COMPARING VAR vs LET/CONST TDZ
// =============================================================================

console.log("4. VAR vs LET/CONST TDZ COMPARISON");
console.log("-----------------------------------");

function comparisonExample() {
    console.log("=== VAR Behavior ===");
    console.log("varExample before declaration:", varExample); // undefined
    console.log("typeof varExample:", typeof varExample); // "undefined"

    var varExample = "I'm var";
    console.log("varExample after declaration:", varExample);

    console.log("\n=== LET Behavior ===");
    try {
        console.log("letExample before declaration:", letExample);
    } catch (error) {
        console.log("❌ letExample TDZ error:", error.message);
    }

    let letExample = "I'm let";
    console.log("✅ letExample after declaration:", letExample);

    console.log("\n=== CONST Behavior ===");
    try {
        console.log("constExample before declaration:", constExample);
    } catch (error) {
        console.log("❌ constExample TDZ error:", error.message);
    }

    const constExample = "I'm const";
    console.log("✅ constExample after declaration:", constExample);
}

comparisonExample();

console.log();

// =============================================================================
// 5. TDZ IN BLOCKS
// =============================================================================

console.log("5. TDZ IN BLOCKS");
console.log("----------------");

function blockTDZExample() {
    let outerVar = "I'm outside the block";
    console.log("Outside block - outerVar:", outerVar);

    {
        console.log("Entered block - outerVar:", outerVar); // Still accessible

        // innerVar is in TDZ here
        try {
            console.log("Trying to access innerVar:", innerVar);
        } catch (error) {
            console.log("❌ innerVar in TDZ:", error.message);
        }

        let innerVar = "I'm inside the block";
        console.log("✅ After declaration - innerVar:", innerVar);

        // Can still access outer variable
        console.log("Still can access outerVar:", outerVar);
    }

    console.log("Back outside block - outerVar:", outerVar);
}

blockTDZExample();

console.log();

// =============================================================================
// 6. TDZ WITH FUNCTION PARAMETERS
// =============================================================================

console.log("6. TDZ WITH FUNCTION PARAMETERS");
console.log("--------------------------------");

// Parameters can create TDZ issues with default values
function parameterTDZ(param1 = param2, param2 = "default") {
    // param2 is in TDZ when param1 tries to access it
    console.log("param1:", param1);
    console.log("param2:", param2);
}

try {
    parameterTDZ(); // This will throw because param1 tries to access param2 in TDZ
} catch (error) {
    console.log("❌ Parameter TDZ error:", error.message);
}

// Correct way:
function correctParameterOrder(param1 = "default1", param2 = param1 + " extended") {
    console.log("✅ Correct param1:", param1);
    console.log("✅ Correct param2:", param2);
}

correctParameterOrder();

console.log();

// =============================================================================
// 7. TDZ IN LOOPS
// =============================================================================

console.log("7. TDZ IN LOOPS");
console.log("---------------");

function loopTDZExample() {
    console.log("=== For Loop with let ===");

    for (let i = 0; i < 3; i++) {
        console.log(`Loop iteration ${i}`);

        // Each iteration creates its own scope
        let loopVar = `Value for iteration ${i}`;
        console.log("loopVar:", loopVar);

        // loopVar from previous iterations is not accessible
    }

    // i and loopVar are not accessible here (out of scope)
    try {
        console.log("i outside loop:", i);
    } catch (error) {
        console.log("❌ i not accessible outside loop:", error.message);
    }

    console.log("\n=== For Loop TDZ Issue ===");

    // This creates a TDZ issue:
    for (let j = 0; j < 2; j++) {
        console.log(`Iteration ${j}`);

        // Trying to access k before it's declared
        try {
            console.log("Trying to access k:", k);
        } catch (error) {
            console.log("❌ k in TDZ:", error.message);
        }

        let k = `k for iteration ${j}`;
        console.log("✅ k after declaration:", k);
    }
}

loopTDZExample();

console.log();

// =============================================================================
// 8. TDZ WITH CLOSURES
// =============================================================================

console.log("8. TDZ WITH CLOSURES");
console.log("--------------------");

function closureTDZExample() {
    // This function will be called later
    function innerFunction() {
        try {
            console.log("Inner function accessing outerVar:", outerVar);
        } catch (error) {
            console.log("❌ TDZ error in closure:", error.message);
        }
    }

    // Call the function while outerVar is in TDZ
    innerFunction();

    let outerVar = "Now I exist!";

    // Call again after declaration
    innerFunction();
}

closureTDZExample();

console.log();

// =============================================================================
// 9. TDZ WITH CLASS DECLARATIONS
// =============================================================================

console.log("9. TDZ WITH CLASS DECLARATIONS");
console.log("------------------------------");

function classTDZExample() {
    try {
        const instance = new MyClass();
    } catch (error) {
        console.log("❌ Class in TDZ:", error.message);
    }

    class MyClass {
        constructor() {
            this.name = "MyClass instance";
        }
    }

    console.log("✅ After class declaration:");
    const instance = new MyClass();
    console.log("Instance created:", instance.name);
}

classTDZExample();

console.log();

// =============================================================================
// 10. PRACTICAL EXAMPLES AND DEBUGGING
// =============================================================================

console.log("10. PRACTICAL EXAMPLES");
console.log("----------------------");

// Example 1: Common TDZ bug in React-like code
function reactLikeExample() {
    console.log("=== React-like component example ===");

    // This represents a common pattern that can cause TDZ issues
    function useEffect(callback) {
        try {
            callback();
        } catch (error) {
            console.log("❌ Effect error:", error.message);
        }
    }

    // TDZ issue: trying to use variable before declaration
    useEffect(() => {
        console.log("Effect accessing state:", state);
    });

    let state = "component state";

    // This works
    useEffect(() => {
        console.log("✅ Effect after declaration:", state);
    });
}

reactLikeExample();

// Example 2: Module pattern with TDZ
function modulePatternTDZ() {
    console.log("\n=== Module pattern example ===");

    const module = {
        init: function () {
            try {
                console.log("Module init accessing config:", config);
            } catch (error) {
                console.log("❌ Config in TDZ:", error.message);
            }
        },

        start: function () {
            console.log("✅ Module start with config:", config);
        }
    };

    module.init(); // TDZ error

    const config = { debug: true, version: "1.0" };

    module.start(); // Works fine
}

modulePatternTDZ();

console.log();

// =============================================================================
// 11. DEBUGGING TDZ ISSUES
// =============================================================================

console.log("11. DEBUGGING TDZ ISSUES");
console.log("-------------------------");

function debuggingTDZ() {
    console.log("=== Debugging tips ===");

    // Tip 1: Check the error message
    try {
        console.log(debugVar);
    } catch (error) {
        console.log("Error type:", error.constructor.name);
        console.log("Error message:", error.message);
        console.log("This indicates TDZ issue if it mentions 'before initialization'");
    }

    let debugVar = "Debug value";

    // Tip 2: Use typeof carefully
    console.log("\n=== typeof behavior ===");
    console.log("typeof undefined variable:", typeof undefinedVariable); // ✅ "undefined"

    try {
        console.log("typeof TDZ variable:", typeof tdzVariable);
    } catch (error) {
        console.log("❌ typeof throws for TDZ variables:", error.message);
    }

    let tdzVariable = "TDZ value";
    console.log("✅ typeof after declaration:", typeof tdzVariable);
}

debuggingTDZ();

console.log();

// =============================================================================
// 12. BEST PRACTICES TO AVOID TDZ ISSUES
// =============================================================================

console.log("12. BEST PRACTICES");
console.log("------------------");

function bestPractices() {
    // ✅ Good: Declare variables at the top of their scope
    let userName;
    let userAge;
    const MAX_AGE = 120;

    // ✅ Good: Initialize when declaring if possible
    let isLoggedIn = false;
    const API_URL = "https://api.example.com";

    // ✅ Good: Use the variables after declaration
    userName = "Alice";
    userAge = 30;

    if (userAge < MAX_AGE) {
        isLoggedIn = true;
        console.log(`✅ User ${userName} logged in`);
    }

    // ✅ Good: Group related declarations
    const config = {
        apiUrl: API_URL,
        maxRetries: 3,
        timeout: 5000
    };

    console.log("✅ Configuration:", config);
}

bestPractices();

console.log("\n=== SUMMARY ===");
console.log("✅ Always declare let/const variables before using them");
console.log("✅ Be aware that let/const are hoisted but not initialized");
console.log("✅ Use proper parameter order in function default values");
console.log("✅ Declare variables at the top of their scope when possible");
console.log("❌ Don't rely on hoisting behavior");
console.log("❌ Don't access variables before declaration");
console.log("❌ Don't use typeof to check for TDZ variables");

console.log("\n=== END OF TEMPORAL DEAD ZONE TUTORIAL ===");