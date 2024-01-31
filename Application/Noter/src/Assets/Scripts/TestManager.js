
class TestManager {
    constructor() {
        this.totalTests = 0; // Variable to track total number of tests
        this.passedTests = 0; // Variable to track number of passed tests
    }

    runTest(testName, expectedOutput, codeOutput) {
        this.totalTests++;
        if (expectedOutput === codeOutput) {
            console.log(`${testName}: Passed`);
            this.passedTests++;
            return true; // Test passed
        } else {
            console.log(`${testName}: Failed`);
            console.log(`Expected output: ${expectedOutput}, Code output: ${codeOutput}`);
            return false; // Test failed
        }
    }

    calculateScore() {
        console.log(`${this.passedTests}/${this.totalTests} Passed`)
        const successPercentage = (this.passedTests / this.totalTests) * 100;
        if(successPercentage == 100) console.log("100% Success")
        else if(successPercentage == 0) console.log("0% Failed")
        else console.log(`${successPercentage.toFixed(1)}% Failed`);
    }
}

export default TestManager