import GetHeadingTree from './GetHeadingTree.js';
import { Selector, ForceFailure } from '../../behaviortree/index.js';
import ParseNodes from './ParseNodes.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import CreateTaskSequence from './CreateTaskSequence.js';

var Marked2Node = function (markedString) {
    var headingTree = GetHeadingTree(markedString);
    var { conditionNodes, mainTaskNode, elseNodes } = ParseNodes(headingTree.children);

    var ifDecorator = CreateIfDecorator(conditionNodes)
        .addChild(CreateTaskSequence(mainTaskNode));

    var parentNode;
    if (elseNodes.length > 0) {
        var forceFailure = new ForceFailure({
            child: CreateTaskSequence(elseNodes[0])
        })

        parentNode = new Selector({
            title: headingTree.title,
            children: [
                ifDecorator,
                forceFailure
            ]
        });

    } else {
        parentNode = ifDecorator;

    }

    return parentNode;
}

export default Marked2Node;