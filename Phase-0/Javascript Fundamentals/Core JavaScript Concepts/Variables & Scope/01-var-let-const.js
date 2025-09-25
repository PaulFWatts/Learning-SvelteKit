// 01-var-let-const.js
// Comprehensive guide to var, let, and const

console.log("=== VAR vs LET vs CONST ===\n");

// =============================================================================
// 1. BASIC DECLARATIONS
// =============================================================================

console.log("1. BASIC DECLARATIONS");
console.log("---------------------");

// var - traditional way (ES5 and earlier)
var name1 = "Alice";
console.log("var name1:", name1);

// let - block-scoped variable (ES6+)
let name2 = "Bob";
console.log("let name2:", name2);

// const - block-scoped constant (ES6+)
const name3 = "Charlie";
console.log("const name3:", name3);

console.log();

// =============================================================================
// 2. REASSIGNMENT BEHAVIOR
// =============================================================================

console.log("2. REASSIGNMENT BEHAVIOR");
console.log("------------------------");

// var - can be reassigned
var score1 = 100;
console.log("Initial var score1:", score1);
score1 = 200;
console.log("Reassigned var score1:", score1);

// let - can be reassigned
let score2 = 100;
console.log("Initial let score2:", score2);
score2 = 200;
console.log("Reassigned let score2:", score2);

// const - CANNOT be reassigned
const score3 = 100;
console.log("const score3:", score3);
// score3 = 200; // ❌ This would throw: TypeError: Assignment to constant variable

console.log();

// =============================================================================
// 3. REDECLARATION BEHAVIOR
// =============================================================================

console.log("3. REDECLARATION BEHAVIOR");
console.log("-------------------------");

// var - allows redeclaration (can be problematic!)
var city = "New York";
console.log("First var city:", city);
var city = "Los Angeles"; // ⚠️ Redeclaration allowed
console.log("Redeclared var city:", city);

// let - does NOT allow redeclaration in same scope
let country = "USA";
console.log("let country:", country);
// let country = "Canada"; // ❌ This would throw: SyntaxError: Identifier 'country' has already been declared

// const - does NOT allow redeclaration in same scope
const continent = "North America";
console.log("const continent:", continent);
// const continent = "Europe"; // ❌ This would throw: SyntaxError: Identifier 'continent' has already been declared

console.log();

// =============================================================================
// 4. INITIALIZATION REQUIREMENTS
// =============================================================================

console.log("4. INITIALIZATION REQUIREMENTS");
console.log("-------------------------------");

// var - can be declared without initialization
var uninitializedVar;
console.log("Uninitialized var:", uninitializedVar); // undefined

// let - can be declared without initialization
let uninitializedLet;
console.log("Uninitialized let:", uninitializedLet); // undefined

// const - MUST be initialized at declaration
// const uninitializedConst; // ❌ This would throw: SyntaxError: Missing initializer in const declaration

console.log();

// =============================================================================
// 5. CONST WITH OBJECTS AND ARRAYS
// =============================================================================

console.log("5. CONST WITH OBJECTS AND ARRAYS");
console.log("---------------------------------");

// const means the binding is immutable, not the value!
const person = { name: "David", age: 25 };
console.log("Initial const person:", person);

// You CAN modify properties of const objects
person.age = 26;
person.city = "Boston";
console.log("Modified const person:", person);

// You CANNOT reassign the const variable
// person = { name: "Eve" }; // ❌ This would throw: TypeError: Assignment to constant variable

const fruits = ["apple", "banana"];
console.log("Initial const fruits:", fruits);

// You CAN modify const arrays
fruits.push("orange");
fruits[0] = "grape";
console.log("Modified const fruits:", fruits);

// You CANNOT reassign the const array
// fruits = ["pear"]; // ❌ This would throw: TypeError: Assignment to constant variable

console.log();

// =============================================================================
// 6. SCOPE DIFFERENCES (Preview - detailed in next files)
// =============================================================================

console.log("6. SCOPE DIFFERENCES (Preview)");
console.log("-------------------------------");

function scopeDemo() {
    if (true) {
        var varInBlock = "I'm var in block";
        let letInBlock = "I'm let in block";
        const constInBlock = "I'm const in block";
    }

    console.log("var outside block:", varInBlock); // ✅ Works - function scoped
    // console.log("let outside block:", letInBlock); // ❌ ReferenceError - block scoped
    // console.log("const outside block:", constInBlock); // ❌ ReferenceError - block scoped
}

scopeDemo();

console.log();

// =============================================================================
// 7. BEST PRACTICES SUMMARY
// =============================================================================

console.log("7. BEST PRACTICES");
console.log("-----------------");
console.log("✅ Use 'const' by default");
console.log("✅ Use 'let' when you need to reassign the variable");
console.log("❌ Avoid 'var' in modern JavaScript");
console.log("✅ Always initialize const variables");
console.log("✅ Use descriptive variable names");

// Examples of good practices:
const MAX_USERS = 100;           // Constants in UPPER_CASE
const userName = "john_doe";     // String that won't change
let currentScore = 0;            // Number that will change
let isLoggedIn = false;          // Boolean that will change

console.log("\nGood practice examples:");
console.log("MAX_USERS:", MAX_USERS);
console.log("userName:", userName);
console.log("currentScore:", currentScore);
console.log("isLoggedIn:", isLoggedIn);

// Demonstrate reassignment where appropriate
currentScore += 50;
isLoggedIn = true;
console.log("Updated currentScore:", currentScore);
console.log("Updated isLoggedIn:", isLoggedIn);

console.log("\n=== END OF VAR vs LET vs CONST ===");