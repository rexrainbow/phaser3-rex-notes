import Expression from '../Expression';
import BaseNode from '../BaseNode';

declare function CreateStringExpression(
    expression: BaseNode.ExpressionValue,
    nodePool?: BaseNode.NodePoolType
): Expression | string | null;

export default CreateStringExpression;
