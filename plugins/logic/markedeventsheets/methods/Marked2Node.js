import GetHeadingTree from './GetHeadingTree.js';
import { IfSelector, ForceFailure, Succeeder } from '../../behaviortree/index.js';
import ParseNodes from './ParseNodes.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateTaskSequence from './CreateTaskSequence.js';

var Marked2Node = function (markedString, {
    lineReturn = '\\'
} = {}) {

    var headingTree = GetHeadingTree(markedString);
    var { conditionNodes, mainTaskNode, elseNodes } = ParseNodes(headingTree.children);

    var parentNode = new IfSelector({
        title: headingTree.title,
        expression: GetConditionExpression(conditionNodes)
    });

    parentNode.addChild(CreateTaskSequence(mainTaskNode), { lineReturn });

    var forceFailure = new ForceFailure();
    if (elseNodes.length > 0) {
        forceFailure.addChild(CreateTaskSequence(elseNodes[0]), { lineReturn });
    } else {
        forceFailure.addChild(new Succeeder());
    }
    parentNode.addChild(forceFailure);

    return parentNode;
}

export default Marked2Node;