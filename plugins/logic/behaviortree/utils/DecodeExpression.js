import ResolveNode from '../behaviortree/dump/ResolveNode.js';

var DecodeExpression = function (expression, nodePool, name) {
    /* 
    constant value: number/number-string, boolean
    evaluation source: string
    plain object from Load: {type: 'node'|'constant', value}
    */
    if (!expression || (typeof (expression) !== 'object') || (typeof (expression.type) !== 'string')) {
        return expression;
    }

    switch (expression.type) {
        case 'node':
            var nodeID = expression.id;
            if (nodePool) {
                return ResolveNode(nodeID, nodePool, name, 'expression node');
            }
            return nodeID;

        case 'constant':
            return expression.value;

        default:
            return expression;
    }
}

export default DecodeExpression;
