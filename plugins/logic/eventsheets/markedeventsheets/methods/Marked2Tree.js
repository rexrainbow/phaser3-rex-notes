import GetHeadingTree from './GetHeadingTree.js';
import { BehaviorTree, IfSelector, ForceFailure, Succeeder } from '../../../behaviortree/index.js';
import ParseNodes from './ParseNodes.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateTaskSequence from './CreateTaskSequence.js';

var Marked2Tree = function (markedString, {
    lineReturn = '\\'
} = {}) {

    var headingTree = GetHeadingTree(markedString);
    var { conditionNodes, mainTaskNode, elseNodes } = ParseNodes(headingTree.children);

    var tree = new BehaviorTree({
        title: headingTree.title
    })

    var rootNode = new IfSelector({
        title: 'condition',
        expression: GetConditionExpression(conditionNodes),
        returnPending: true
    });
    tree.setRoot(rootNode)

    rootNode.addChild(CreateTaskSequence(mainTaskNode), { lineReturn });

    var forceFailure = new ForceFailure();
    if (elseNodes.length > 0) {
        forceFailure.addChild(CreateTaskSequence(elseNodes[0]), { lineReturn });
    } else {
        forceFailure.addChild(new Succeeder());
    }
    rootNode.addChild(forceFailure);

    return tree;
}

export default Marked2Tree;