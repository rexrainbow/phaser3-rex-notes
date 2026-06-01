export default ExpressionParser;

declare namespace ExpressionParser {
    /**
     * Callback produced by compiled expressions.
     *
     * @param context - Evaluation context.
     * @returns The evaluated number.
     */
    type ExpressionCallbackType = (
        context: object
    ) => number
}

/**
 * Parser and evaluator for simple expressions.
 */
declare class ExpressionParser {

    /**
     * Compile an expression into a callback.
     *
     * @param expression - Expression string.
     * @returns The compiled callback.
     */
    compile(
        expression: string
    ): ExpressionParser.ExpressionCallbackType;

    /**
     * Execute an expression string.
     *
     * @param expression - Expression string.
     * @param context - Evaluation context.
     * @returns The evaluated number.
     */
    exec(
        expression: string,
        context: object
    ): number;

    /**
     * Execute a compiled expression callback.
     *
     * @param expressionCallback - Compiled callback.
     * @param context - Evaluation context.
     * @returns The evaluated number.
     */
    exec(
        expressionCallback: ExpressionParser.ExpressionCallbackType,
        context: object
    ): number;

    /**
     * Fallback for missing custom methods.
     *
     * @param name - Missing method name.
     * @param args - Evaluated method arguments.
     * @param context - Evaluation context.
     * @returns Fallback value.
     */
    defaultHandler(
        name: string,
        args: any[],
        context: object
    ): any;

    /**
     * Fallback for missing variables or properties.
     *
     * @param name - Missing variable or property path.
     * @param context - Evaluation context.
     * @param path - Evaluated property path segments.
     * @returns Fallback value.
     */
    defaultValueHandler(
        name: string,
        context: object,
        path: any[]
    ): any;

    /**
     * Get a property from a context object.
     *
     * @param context - Source object.
     * @param key - Property path.
     * @param defaultValue - Default value if missing.
     * @param dotMode - Enable dot path parsing.
     * @returns The property value.
     */
    static GetProperty(
        context: Object,
        key: string | string[],
        defaultValue: any,
        dotMode?: boolean
    ): any;

}
