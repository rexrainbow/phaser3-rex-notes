export default ConditionsTable;

declare namespace ConditionsTable {

    /**
     * Context object passed into condition test functions.
     */
    type ContextType = Record<string, unknown>;

    /**
     * Mapping from condition names to test results.
     */
    type ResultsType = Record<string, boolean>;

    /**
     * Callback used to evaluate a condition.
     */
    type TestFunctionType = (
        /**
         * Input context used by the test function.
         */
        context: ContextType
    ) => boolean;

    /**
     * Callback invoked with a passing test name.
     */
    type PassTestCallbackType = (
        /**
         * Name of the passing test.
         */
        testName: string
    ) => void;

    /**
     * Callback invoked with each test name and result.
     */
    type EachTestCallbackType = (
        /**
         * Name of the current test.
         */
        testName: string,
        /**
         * Result of the current test.
         */
        result: boolean
    ) => void;
}

/**
 * Registry of named condition tests with batch evaluation helpers.
 */
declare class ConditionsTable {

    /**
     * Remove all registered tests.
     *
     * @returns This conditions table.
     */
    clear(): this;

    /**
     * Register a named test function.
     *
     * @param name - Unique test name.
     * @param callback - Test function.
     * @returns This conditions table.
     */
    add(
        name: string,
        callback: ConditionsTable.TestFunctionType
    ): this;

    /**
     * Evaluate all tests and return their boolean results.
     *
     * @param context - Context object passed into each test.
     * @returns Mapping of test results by test name.
     */
    getTestResults(
        context: ConditionsTable.ContextType
    ): ConditionsTable.ResultsType;

    /**
     * Find passing tests and invoke callback for each pass.
     *
     * @param context - Context object passed into each test.
     * @param callback - Callback invoked for each passing test.
     * @param scope - Optional callback execution scope.
     * @returns This conditions table.
     */
    anyPassTest(
        context: ConditionsTable.ContextType,
        callback: ConditionsTable.PassTestCallbackType,
        scope?: object
    ): this;

    /**
     * Find and return one passing test name.
     *
     * @param context - Context object passed into each test.
     * @returns Name of a passing test.
     */
    anyPassTest(
        context: ConditionsTable.ContextType
    ): string;

    /**
     * Invoke callback for each passing test.
     *
     * @param context - Context object passed into each test.
     * @param callback - Callback invoked for each passing test.
     * @param scope - Optional callback execution scope.
     * @returns This conditions table.
     */
    eachPassTest(
        context: ConditionsTable.ContextType,
        callback: ConditionsTable.PassTestCallbackType,
        scope?: object
    ): this;

    /**
     * Invoke callback for each test with its evaluation result.
     *
     * @param context - Context object passed into each test.
     * @param callback - Callback invoked for each test.
     * @param scope - Optional callback execution scope.
     * @returns This conditions table.
     */
    eachTest(
        context: ConditionsTable.ContextType,
        callback: ConditionsTable.EachTestCallbackType,
        scope?: object
    ): this;

}
