import Expression from '../Expression';
import BaseNode from '../BaseNode';

declare function CreateNumberExpression(
    expression: BaseNode.ExpressionValue | CreateLogicExpression.LogicExpressionConfig,
    nodePool?: BaseNode.NodePoolType
): Expression | number | boolean | null;

declare function CreateStringExpression(
    expression: BaseNode.ExpressionValue,
    nodePool?: BaseNode.NodePoolType
): Expression | string | null;

declare namespace CreateLogicExpression {
    /**
     * Logical expression config.
     */
    type LogicExpressionConfig =
        { and: Array<BaseNode.ExpressionValue | LogicExpressionConfig>; } |
        { all: Array<BaseNode.ExpressionValue | LogicExpressionConfig>; } |
        { or: Array<BaseNode.ExpressionValue | LogicExpressionConfig>; } |
        { any: Array<BaseNode.ExpressionValue | LogicExpressionConfig>; } |
        { not: BaseNode.ExpressionValue | LogicExpressionConfig; };
}

declare function CreateLogicExpression(
    expression: CreateLogicExpression.LogicExpressionConfig,
    nodePool?: BaseNode.NodePoolType
): Expression | null;

export {
    CreateNumberExpression,
    CreateStringExpression,
    CreateLogicExpression,
}
