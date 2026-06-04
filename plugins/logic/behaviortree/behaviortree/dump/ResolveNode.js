var ResolveNode = function (node, nodePool, owner, role) {
    if (!nodePool) {
        return node;
    }

    if (!Object.prototype.hasOwnProperty.call(nodePool, node)) {
        var message;
        if (owner && role) {
            message = `BehaviorTree.load: Missing node "${node}" for ${owner}'s ${role}`;
        } else if (role) {
            message = `BehaviorTree.load: Missing ${role} "${node}"`;
        } else {
            message = `BehaviorTree.load: Missing node "${node}"`;
        }
        throw new Error(message);
    }

    return nodePool[node];
}

export default ResolveNode;
