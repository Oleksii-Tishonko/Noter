import ExtractData from "./ExtractData.js";
import TestManager from "./TestManager.js";

const testManager = new TestManager();

// Test case 1: Extracting data from a nested object
const data1 = {
    user: {
        name: "John",
        age: 30,
        address: {
            city: "New York",
            country: "USA",
        },
    },
};
const path1 = "user.address.city";
testManager.runTest("Test case 1", "New York", ExtractData(data1, path1));

// Test case 2: Extracting data from a non-existent path
const data2 = {
    user: {
        name: "John",
        age: 30,
    },
};
const path2 = "user.address.city";
testManager.runTest("Test case 2", undefined, ExtractData(data2, path2));

// Test case 3: Extracting data from an array
const data3 = {
    users: [
        {name: "John", age: 30},
        {name: "Jane", age: 25},
    ],
};
const path3 = "users.1.name";
testManager.runTest("Test case 3", "Jane", ExtractData(data3, path3));

testManager.calculateScore();
