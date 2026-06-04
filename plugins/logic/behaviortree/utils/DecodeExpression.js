var DecodeExpression = function (expression, nodePool, name) {
    if (!expression || (typeof (expression) !== 'object') || (typeof (expression.type) !== 'string')) {
        return expression;
    }

    switch (expression.type) {
        case 'node':
            var nodeID = expression.id;
            if (nodePool) {
                if (!nodePool.hasOwnProperty(nodeID)) {
                    throw new Error(`BehaviorTree.load: Missing expression node "${nodeID}"${name ? ` for ${name}` : ''}`);
                }
                return nodePool[nodeID];
            }
            return nodeID;

        case 'constant':
            return expression.value;

        default:
            return expression;
    }
}

export default DecodeExpression;
