// 03-function-scope.js
// Understanding Function Scope in JavaScript

console.log("=== FUNCTION SCOPE TUTORIAL ===\n");

// =============================================================================
// 1. WHAT IS FUNCTION SCOPE?
// =============================================================================

console.log("1. WHAT IS FUNCTION SCOPE?");
console.log("--------------------------");

// Function scope means variables declared inside a function
// are only accessible within that function

function exampleFunction() {
    var functionVar = "I'm function-scoped";
    let functionLet = "I'm also function-scoped";
    const functionConst = "Me too!";

    console.log("Inside function - functionVar:", functionVar);
    console.log("Inside function - functionLet:", functionLet);
    console.log("Inside function - functionConst:", functionConst);
}

exampleFunction();

// These variables don't exist outside the function
try {
    console.log("Outside function - functionVar:", functionVar);
} catch (error) {
    console.log("❌ functionVar not accessible outside function:", error.message);
}

console.log();

// =============================================================================
// 2. VAR IS FUNCTION-SCOPED (NOT BLOCK-SCOPED)
// =============================================================================

console.log("2. VAR IS FUNCTION-SCOPED");
console.log("--------------------------");

function demonstrateVarScope() {
    console.log("At start of function - myVar:", typeof myVar); // undefined (hoisted)

    if (true) {
        var myVar = "I'm declared in a block but function-scoped";
        console.log("Inside if block - myVar:", myVar);
    }

    // var is accessible throughout the entire function
    console.log("Outside if block - myVar:", myVar); // ✅ Still accessible

    for (var i = 0; i < 2; i++) {
        var loopVar = `Loop iteration ${i}`;
    }

    // Both i and loopVar are accessible here
    console.log("After loop - i:", i); // 2
    console.log("After loop - loopVar:", loopVar); // "Loop iteration 1"
}

demonstrateVarScope();

console.log();

// =============================================================================
// 3. LET AND CONST ARE BOTH FUNCTION AND BLOCK-SCOPED
// =============================================================================

console.log("3. LET AND CONST: FUNCTION + BLOCK SCOPED");
console.log("------------------------------------------");

function demonstrateLetConstScope() {
    let functionLet = "Function-scoped let";
    const functionConst = "Function-scoped const";

    console.log("At function level - functionLet:", functionLet);
    console.log("At function level - functionConst:", functionConst);

    if (true) {
        let blockLet = "Block-scoped let";
        const blockConst = "Block-scoped const";

        // Can access function-level variables
        console.log("In block - functionLet:", functionLet);
        console.log("In block - functionConst:", functionConst);

        // Can access block-level variables
        console.log("In block - blockLet:", blockLet);
        console.log("In block - blockConst:", blockConst);
    }

    // Block-scoped variables are not accessible here
    try {
        console.log("Outside block - blockLet:", blockLet);
    } catch (error) {
        console.log("❌ blockLet not accessible outside block:", error.message);
    }

    // But function-scoped variables are still accessible
    console.log("At function level - functionLet:", functionLet);
}

demonstrateLetConstScope();

console.log();

// =============================================================================
// 4. NESTED FUNCTIONS AND SCOPE CHAIN
// =============================================================================

console.log("4. NESTED FUNCTIONS AND SCOPE CHAIN");
console.log("------------------------------------");

function outerFunction() {
    var outerVar = "I'm in outer function";
    let outerLet = "I'm outer let";
    const outerConst = "I'm outer const";

    console.log("Outer function - outerVar:", outerVar);

    function innerFunction() {
        var innerVar = "I'm in inner function";
        let innerLet = "I'm inner let";

        // Inner function can access outer function's variables
        console.log("Inner function - outerVar:", outerVar);
        console.log("Inner function - outerLet:", outerLet);
        console.log("Inner function - outerConst:", outerConst);
        console.log("Inner function - innerVar:", innerVar);
        console.log("Inner function - innerLet:", innerLet);

        function deepInnerFunction() {
            let deepVar = "I'm in deep inner function";

            // Can access all outer scopes
            console.log("Deep inner - outerVar:", outerVar);
            console.log("Deep inner - outerLet:", outerLet);
            console.log("Deep inner - innerVar:", innerVar);
            console.log("Deep inner - innerLet:", innerLet);
            console.log("Deep inner - deepVar:", deepVar);
        }

        deepInnerFunction();

        // Cannot access deepVar here
        try {
            console.log("Inner trying to access deepVar:", deepVar);
        } catch (error) {
            console.log("❌ Inner cannot access deepVar:", error.message);
        }
    }

    innerFunction();

    // Cannot access innerVar or innerLet here
    try {
        console.log("Outer trying to access innerVar:", innerVar);
    } catch (error) {
        console.log("❌ Outer cannot access innerVar:", error.message);
    }
}

outerFunction();

console.log();

// =============================================================================
// 5. FUNCTION PARAMETERS AND SCOPE
// =============================================================================

console.log("5. FUNCTION PARAMETERS AND SCOPE");
console.log("---------------------------------");

function parameterScope(param1, param2 = "default value") {
    console.log("Parameters are function-scoped:");
    console.log("param1:", param1);
    console.log("param2:", param2);

    // Parameters behave like local variables
    param1 = "modified param1";
    console.log("Modified param1:", param1);

    // Parameters are not accessible outside the function
}

parameterScope("Hello", "World");

try {
    console.log("Trying to access param1 outside:", param1);
} catch (error) {
    console.log("❌ param1 not accessible outside function:", error.message);
}

console.log();

// =============================================================================
// 6. IIFE (Immediately Invoked Function Expression) AND SCOPE
// =============================================================================

console.log("6. IIFE AND SCOPE");
console.log("-----------------");

// IIFE creates its own function scope
(function () {
    var iifeVar = "I'm inside an IIFE";
    let iifeLet = "I'm also in IIFE";
    const iifeConst = "Me too!";

    console.log("Inside IIFE - iifeVar:", iifeVar);
    console.log("Inside IIFE - iifeLet:", iifeLet);
    console.log("Inside IIFE - iifeConst:", iifeConst);
})();

// IIFE variables are not accessible outside
try {
    console.log("Outside IIFE - iifeVar:", iifeVar);
} catch (error) {
    console.log("❌ IIFE variables not accessible outside:", error.message);
}

// IIFE with parameters
(function (name, age) {
    console.log(`IIFE with params - Name: ${name}, Age: ${age}`);
})("Alice", 30);

console.log();

// =============================================================================
// 7. CLOSURES AND FUNCTION SCOPE
// =============================================================================

console.log("7. CLOSURES AND FUNCTION SCOPE");
console.log("-------------------------------");

function createCounter() {
    let count = 0; // Private variable

    return function () {
        count++; // Inner function can access outer function's variables
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("Counter1 first call:", counter1()); // 1
console.log("Counter1 second call:", counter1()); // 2
console.log("Counter2 first call:", counter2()); // 1 (separate instance)
console.log("Counter1 third call:", counter1()); // 3

// count is not directly accessible
try {
    console.log("Trying to access count directly:", count);
} catch (error) {
    console.log("❌ count is private:", error.message);
}

console.log();

// =============================================================================
// 8. ARROW FUNCTIONS AND SCOPE
// =============================================================================

console.log("8. ARROW FUNCTIONS AND SCOPE");
console.log("-----------------------------");

const arrowFunctionExample = () => {
    let arrowVar = "Inside arrow function";
    const arrowConst = "Arrow const";

    console.log("Arrow function - arrowVar:", arrowVar);
    console.log("Arrow function - arrowConst:", arrowConst);

    return {
        getValue: () => {
            // Arrow function inherits scope from parent
            return `${arrowVar} - ${arrowConst}`;
        }
    };
};

const arrowResult = arrowFunctionExample();
console.log("Arrow function result:", arrowResult.getValue());

console.log();

// =============================================================================
// 9. PRACTICAL EXAMPLES
// =============================================================================

console.log("9. PRACTICAL EXAMPLES");
console.log("---------------------");

// Example 1: Module pattern using function scope
const userModule = (function () {
    // Private variables
    let users = [];
    let currentId = 1;

    // Public API
    return {
        addUser: function (name) {
            const user = { id: currentId++, name: name };
            users.push(user);
            console.log("User added:", user);
            return user;
        },

        getUserCount: function () {
            return users.length;
        },

        getUsers: function () {
            return [...users]; // Return copy to prevent external modification
        }
    };
})();

userModule.addUser("Alice");
userModule.addUser("Bob");
console.log("User count:", userModule.getUserCount());
console.log("Users:", userModule.getUsers());

// Example 2: Event handler with proper scope
function setupTimer() {
    let seconds = 0;

    function tick() {
        seconds++;
        console.log(`Timer: ${seconds} seconds`);

        if (seconds < 3) {
            setTimeout(tick, 1000);
        }
    }

    tick();
}

setupTimer();

console.log();

// =============================================================================
// 10. COMMON PITFALLS AND SOLUTIONS
// =============================================================================

console.log("10. COMMON PITFALLS AND SOLUTIONS");
console.log("----------------------------------");

// Pitfall 1: Accidental global variables
function pitfall1() {
    // Missing var/let/const creates global variable
    // accidentalGlobal = "Oops!"; // ❌ Bad
    let intentionalLocal = "Good!"; // ✅ Good
    console.log("Local variable:", intentionalLocal);
}

pitfall1();

// Pitfall 2: Loop variable confusion with var
console.log("Loop variable pitfall with var:");
for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log("var i:", i); // Prints 3, 3, 3
    }, 100);
}

setTimeout(() => {
    console.log("Solution with IIFE:");
    for (var j = 0; j < 3; j++) {
        (function (index) {
            setTimeout(function () {
                console.log("IIFE index:", index); // Prints 0, 1, 2
            }, 200);
        })(j);
    }

    setTimeout(() => {
        console.log("Better solution with let:");
        for (let k = 0; k < 3; k++) {
            setTimeout(function () {
                console.log("let k:", k); // Prints 0, 1, 2
            }, 300);
        }
    }, 250);
}, 150);

console.log();

// =============================================================================
// 11. BEST PRACTICES
// =============================================================================

console.log("11. BEST PRACTICES");
console.log("------------------");
console.log("✅ Always declare variables with var/let/const");
console.log("✅ Use let and const instead of var in modern code");
console.log("✅ Keep variable scope as narrow as possible");
console.log("✅ Use function scope for private variables (module pattern)");
console.log("✅ Understand the scope chain in nested functions");
console.log("❌ Don't create accidental global variables");
console.log("❌ Don't rely on hoisting behavior");

console.log("\n=== END OF FUNCTION SCOPE TUTORIAL ===");