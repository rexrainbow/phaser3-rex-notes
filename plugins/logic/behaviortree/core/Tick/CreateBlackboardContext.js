import CreateProxyContext from '../../../../math/expressionparser/utils/CreateProxyContext.js';

const TreeMemory = '$tree';
const NodeMemory = '$node';

var CreateBlackboardContext = function (tick) {
    var blackboard = tick.blackboard;

    // 2nd level proxy, for TreeMemory, and NodeMemory
    var baseContext = {
        treeID: undefined,
        nodeID: undefined
    }
    var proxyContent = CreateProxyContext({
        has(target, key) {
            return blackboard.has(key, target.treeID, target.nodeID);
        },
        get(target, key) {
            return blackboard.get(key, target.treeID, target.nodeID);
        }
    }, baseContext)

    return CreateProxyContext({
        has(target, key) {
            switch (key) {
                case TreeMemory:
                    return true;

                case NodeMemory:
                    return true;

                default:
                    return blackboard.has(key)
            }
        },
        get(target, key) {
            switch (key) {
                case TreeMemory:
                    baseContext.treeID = tick.tree.id;
                    baseContext.nodeID = undefined;
                    return proxyContent;

                case NodeMemory:
                    baseContext.treeID = tick.tree.id;
                    baseContext.nodeID = tick._currentNode.id;
                    return proxyContent;

                default:
                    return blackboard.get(key)
            }
        }
    })
}

export default CreateBlackboardContext;