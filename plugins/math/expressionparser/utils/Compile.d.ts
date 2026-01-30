import ExpressionParser from '../ExpressionParser';

export default Compile;

/**
 * Compile an expression into a callback.
 *
 * @param expression - Expression string.
 * @returns The compiled callback.
 */
declare var Compile: (
    expression: string
) => ExpressionParser.ExpressionCallbackType;
