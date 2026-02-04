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
    type CompileResultType = (view: Object) => string

    /**
     * Configuration options for creating a StringTemplate instance.
     */
    interface IConfig {
        /**
         * Template delimiters.
         */
        delimiters?: DelimitersType,
        /**
         * Expression parser instance.
         */
        expressionParser?: ExpressionParser
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
        expressionParser?: ExpressionParser
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
