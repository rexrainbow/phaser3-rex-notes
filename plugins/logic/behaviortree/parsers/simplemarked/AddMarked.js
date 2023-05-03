import GetHeadingTree from './GetHeadingTree.js';
import { Selector, ForceFailure } from '../../nodes';
import ParseNodes from './ParseNodes.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import CreateTaskSequence from './CreateTaskSequence.js';

var AddMarked = function (markedString, taskHandlers) {
    var headingTree = GetHeadingTree(markedString);
    var { conditionNodes, mainTaskNode, elseNodes } = ParseNodes(headingTree);

    var parentNode = new Selector({
        title: headingTree.title
    });

    var ifDecorator = CreateIfDecorator(conditionNodes)
        .addChild(CreateTaskSequence(mainTaskNode, taskHandlers));
    parentNode.addChild(ifDecorator);

    if (elseNodes.length > 0) {
        var forceFailure = new ForceFailure({
            child: CreateTaskSequence(elseNodes[0], taskHandlers)
        })
        parentNode.addChild(forceFailure);
    }

    return parentNode;
}

export default AddMarked;