import GetHeadingTree from './GetHeadingTree.js';
import { Selector, ForceFailure } from '../../behaviortree/index.js';
import ParseNodes from './ParseNodes.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import CreateTaskSequence from './CreateTaskSequence.js';

var Marked2Node = function (markedString) {
    var headingTree = GetHeadingTree(markedString);
    var { conditionNodes, mainTaskNode, elseNodes } = ParseNodes(headingTree.children);

    var hasElseNode = elseNodes.length > 0;

    var parentNode = new Selector({ title: headingTree.title });

    var ifDecorator = CreateIfDecorator(conditionNodes);
    ifDecorator.addChild(CreateTaskSequence(mainTaskNode));
    parentNode.addChild(ifDecorator);

    if (hasElseNode) {
        var forceFailure = new ForceFailure();
        forceFailure.addChild(CreateTaskSequence(elseNodes[0]));
        parentNode.addChild(forceFailure);
    }

    return parentNode;
}

export default Marked2Node;