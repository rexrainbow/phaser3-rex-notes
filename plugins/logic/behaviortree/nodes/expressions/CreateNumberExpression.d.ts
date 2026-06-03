import Expression from '../Expression';
import BaseNode from '../BaseNode';

declare function CreateNumberExpression(
    expression: BaseNode.ExpressionValue,
    nodePool?: BaseNode.NodePoolType
): Expression;

export default CreateNumberExpression;
