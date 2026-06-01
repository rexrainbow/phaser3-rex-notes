export default ExpressionParser;

declare namespace ExpressionParser {
    interface IConfig<TContext = object> {
        safeMode?: boolean;
        cache?: boolean;
        functions?: Record<string, Function>;
        values?: Record<string, any>;
        defaultHandler?: (
            name: string,
            args: any[],
            context: TContext
        ) => any;
        defaultValueHandler?: (
            name: string,
            context: TContext,
            path: any[]
        ) => any;
    }

    interface ICompileConfig {
        cache?: boolean;
    }

    /**
     * Callback produced by compiled expressions.
     *
     * @param context - Evaluation context.
     * @returns The evaluated value.
     */
    type ExpressionCallbackType<TResult = any, TContext = object> = (
        context: TContext
    ) => TResult
}

/**
 * Parser and evaluator for simple expressions.
 */
declare class ExpressionParser {

    constructor(
        config?: boolean | ExpressionParser.IConfig
    );

    safeMode: boolean;
    cacheExpressions: boolean;

    setSafeMode(
        enable?: boolean
    ): this;

    setFunction(
        name: string,
        callback: Function
    ): this;

    setFunctions(
        functions: Record<string, Function>
    ): this;

    getFunction(
        name: string
    ): Function | undefined;

    removeFunction(
        name: string
    ): this;

    clearFunctions(): this;

    setValue(
        name: string,
        value: any
    ): this;

    setValues(
        values: Record<string, any>
    ): this;

    getValue(
        name: string | any[],
        defaultValue?: any
    ): any;

    removeValue(
        name: string | any[]
    ): this;

    clearValues(): this;

    setCacheEnable(
        enable?: boolean
    ): this;

    clearCache(): this;

    /**
     * Compile an expression into a callback.
     *
     * @param expression - Expression string.
     * @returns The compiled callback.
     */
    compile<TResult = any, TContext = object>(
        expression: string,
        config?: ExpressionParser.ICompileConfig
    ): ExpressionParser.ExpressionCallbackType<TResult, TContext>;

    /**
     * Execute an expression string.
     *
     * @param expression - Expression string.
     * @param context - Evaluation context.
     * @returns The evaluated value.
     */
    exec<TResult = any, TContext = object>(
        expression: string,
        context: TContext,
        config?: ExpressionParser.ICompileConfig
    ): TResult;

    /**
     * Execute a compiled expression callback.
     *
     * @param expressionCallback - Compiled callback.
     * @param context - Evaluation context.
     * @returns The evaluated value.
     */
    exec<TResult = any, TContext = object>(
        expressionCallback: ExpressionParser.ExpressionCallbackType<TResult, TContext>,
        context: TContext
    ): TResult;

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
        dotMode?: boolean,
        safeMode?: boolean
    ): any;

}
