import ExpressionParser from '../../expressionparser';

export default StringTemplate;

declare namespace StringTemplate {
    /**
     * Delimiter pair for template expressions.
     */
    type DelimitersType = [string, string];

    /**
     * Compiled template function.
     *
     * @param view - Template data object.
     * @returns Rendered string.
     */
    type CompileResultType<TView = object> = (view: TView) => string

    type FilterCallbackType = (value: any, ...args: any[]) => any

    type ExpressionTransformType = (expression: string) => string

    /**
     * Configuration options for creating a StringTemplate instance.
     */
    interface IConfig<TContext = object> extends ExpressionParser.IConfig<TContext> {
        /**
         * Template delimiters.
         */
        delimiters?: DelimitersType,
        /**
         * Expression parser instance.
         */
        expressionParser?: ExpressionParser,
        /**
         * Filter functions used by pipe expressions.
         */
        filters?: Record<string, FilterCallbackType>,
        /**
         * Transform expression before compiling.
         */
        expressionTransform?: ExpressionTransformType
    }

    /**
     * Configuration options for compile and render.
     */
    interface ICompileConfig {
        /**
         * Template delimiters.
         */
        delimiters?: DelimitersType,
        /**
         * Expression parser instance.
         */
        expressionParser?: ExpressionParser,
        /**
         * Cache compiled template.
         */
        cache?: boolean,
        /**
         * Options passed to expression parser compile.
         */
        expressionCompileConfig?: ExpressionParser.ICompileConfig,
        /**
         * Transform expression before compiling.
         */
        expressionTransform?: ExpressionTransformType
    }
}

/**
 * String template renderer with expression support.
 */
declare class StringTemplate {
    /**
     * Create a StringTemplate instance.
     *
     * @param config - Configuration options.
     */
    constructor(config?: StringTemplate.IConfig);

    /**
     * Set template delimiters by left and right values.
     *
     * @param delimiterLeft - Left delimiter.
     * @param delimiterRight - Right delimiter.
     * @returns This StringTemplate instance.
     */
    setDelimiters(
        delimiterLeft: string,
        delimiterRight: string
    ): this;
    /**
     * Set template delimiters by tuple.
     *
     * @param delimiter - Delimiter tuple.
     * @returns This StringTemplate instance.
     */
    setDelimiters(delimiter: StringTemplate.DelimitersType): this;
    /**
     * Set expression parser.
     *
     * @param expressionParser - Expression parser instance.
     * @returns This StringTemplate instance.
     */
    setExpressionParser(expressionParser: ExpressionParser): this;

    /**
     * Register current filters into expression parser.
     *
     * @param expressionParser - Expression parser instance.
     * @returns This StringTemplate instance.
     */
    registerFilters(expressionParser: ExpressionParser): this;

    /**
     * Set expression transform callback.
     *
     * @param callback - Transform callback.
     * @returns This StringTemplate instance.
     */
    setExpressionTransform(callback?: StringTemplate.ExpressionTransformType): this;

    /**
     * Register a filter function.
     *
     * @param name - Filter name.
     * @param callback - Filter callback.
     * @returns This StringTemplate instance.
     */
    setFilter(
        name: string,
        callback: StringTemplate.FilterCallbackType
    ): this;

    /**
     * Register multiple filter functions.
     *
     * @param filters - Filter callbacks.
     * @returns This StringTemplate instance.
     */
    setFilters(filters: Record<string, StringTemplate.FilterCallbackType>): this;

    /**
     * Remove a filter function.
     *
     * @param name - Filter name.
     * @returns This StringTemplate instance.
     */
    removeFilter(name: string): this;

    /**
     * Remove all filter functions.
     *
     * @returns This StringTemplate instance.
     */
    clearFilters(): this;

    /**
     * Enable or disable template cache.
     *
     * @param enable - Enable cache. Default is true.
     * @returns This StringTemplate instance.
     */
    setCacheEnable(enable?: boolean): this;

    /**
     * Clear compiled template cache.
     *
     * @returns This StringTemplate instance.
     */
    clearCache(): this;

    /**
     * Compile template content with optional parser.
     *
     * @param content - Template content string.
     * @param parser - Expression parser instance.
     * @returns Compiled template function.
     */
    compile(
        content: string,
        parser?: ExpressionParser
    ): StringTemplate.CompileResultType;

    /**
     * Compile template content with config.
     *
     * @param content - Template content string.
     * @param config - Compile configuration.
     * @returns Compiled template function.
     */
    compile(
        content: string,
        config?: StringTemplate.ICompileConfig
    ): StringTemplate.CompileResultType;

    /**
     * Render template content with view data and optional parser.
     *
     * @param content - Template content string.
     * @param view - Template data object.
     * @param parser - Expression parser instance.
     * @returns Rendered string.
     */
    render(
        content: string,
        view: Object,
        parser?: ExpressionParser
    ): string;

    /**
     * Render template content with view data and config.
     *
     * @param content - Template content string.
     * @param view - Template data object.
     * @param config - Compile configuration.
     * @returns Rendered string.
     */
    render(
        content: string,
        view: Object,
        config?: StringTemplate.ICompileConfig
    ): string;

}
