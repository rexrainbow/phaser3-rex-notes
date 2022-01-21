import CreateProxyContext from '../../../math/expressionparser/utils/CreateProxyContext.js';

// Global : key
const TreeMemory = '$tree';  // $tree.key
const NodeMemory = '$node';  // $node.key

var CreateBlackboardContext = function (tick) {
    var treeMemoryProxyContext = CreateProxyContext({
        has(target, key) {
            return tick.blackboard.has(key, tick.tree.id);
        },
        get(target, key) {
            return tick.blackboard.get(key, tick.tree.id);
        }
    })

    var nodeMemoryProxyContext = CreateProxyContext({
        has(target, key) {
            return tick.blackboard.has(key, tick.tree.id, tick._currentNode.id);
        },
        get(target, key) {
            return tick.blackboard.get(key, tick.tree.id, tick._currentNode.id);
        }
    })

    return CreateProxyContext({
        has(target, key) {
            switch (key) {
                case TreeMemory:
                case NodeMemory:
                    return true;

                default:
                    return tick.blackboard.has(key)
            }
        },
        get(target, key) {
            switch (key) {
                case TreeMemory:
                    return treeMemoryProxyContext;

                case NodeMemory:
                    return nodeMemoryProxyContext;

                default:
                    return tick.blackboard.get(key)
            }
        }
    })
}

export default CreateBlackboardContext;