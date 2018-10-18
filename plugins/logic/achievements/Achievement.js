import CreateTestFunction from '../conditionstable/CreateTestFunction.js';

class Achievement {
    constructor(keys, items) {
        this.createTestCallback(keys, items);
    }

    createTestCallback(keys, items) {
        // items[0]: level name
        // items[1]: achievement name
        this.name = items[1];
        items.splice(0, 2);
        this.testFunction = CreateTestFunction(keys, items);
        return this;
    }

    runTest(values) {
        return this.testFunction(values);
    }
}

export default Achievement;