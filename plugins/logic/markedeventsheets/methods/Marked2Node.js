import GetHeadingTree from './GetHeadingTree.js';
import { Selector, ForceFailure } from '../../behaviortree/index.js';
import ParseNodes from './ParseNodes.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import CreateTaskSequence from './CreateTaskSequence.js';

var Marked2Node = function (markedString) {
    var headingTree = GetHeadingTree(markedString);
    var { conditionNodes, mainTaskNode, elseNodes } = ParseNodes(headingTree.children);

    var hasElseNode = elseNodes.length > 0;

    var parentNode;
    if (hasElseNode) {
        parentNode = new Selector({ title: headingTree.title });
    }

    var ifDecorator = CreateIfDecorator(conditionNodes);
    ifDecorator.addChild(CreateTaskSequence(mainTaskNode));

    if (hasElseNode) {
        parentNode.addChild(ifDecorator);

        var forceFailure = new ForceFailure();
        forceFailure.addChild(CreateTaskSequence(elseNodes[0]));
        parentNode.addChild(forceFailure);
    } else {
        ifDecorator.setTitle(headingTree.title);
        parentNode = ifDecorator;
    }

    return parentNode;
}

export default Marked2Node;