import ExpressionParser from '../../expressionparser';

export default StringTemplate;

declare namespace StringTemplate {
    type DelimitersType = [string, string];

    type CompileResultType = (view: Object) => string

    interface IConfig {
        delimiters?: DelimitersType,
        expressionParser?: ExpressionParser
    }

    interface ICompileConfig {
        delimiters?: DelimitersType,
        expressionParser?: ExpressionParser
    }
}

declare class StringTemplate {
    constructor(config?: StringTemplate.IConfig);

    setDelimiters(delimiterLeft: string, delimiterRight: string): this;
    setDelimiters(delimiter: StringTemplate.DelimitersType): this;
    setExpressionParser(expressionParser: ExpressionParser): this;

    compile(
        content: string,
        parser?: ExpressionParser
    ): StringTemplate.CompileResultType;

    compile(
        content: string,
        config?: StringTemplate.ICompileConfig
    ): StringTemplate.CompileResultType;

    render(
        content: string,
        view: Object,
        parser?: ExpressionParser
    ): string;

    render(
        content: string,
        view: Object,
        config?: StringTemplate.ICompileConfig
    ): string;

}