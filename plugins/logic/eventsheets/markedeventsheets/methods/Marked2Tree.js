import { BehaviorTree, IfSelector, ForceFailure, Succeeder } from '../../../behaviortree/index.js';
import GetHeadingTree from './GetHeadingTree.js';
import GetTreeConfig from './GetTreeConfig.js';

import ParseNodes from './ParseNodes.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateTaskSequence from './CreateTaskSequence.js';

var Marked2Tree = function (markedString, {
    lineReturn = '\\',
    parallel = false,
} = {}) {

    var headingTree = GetHeadingTree(markedString);
    var treeConfig = GetTreeConfig(headingTree.paragraphs);
    var { conditionNodes, mainTaskNode, elseNodes } = ParseNodes(headingTree.children);

    if (treeConfig.hasOwnProperty('parallel')) {
        parallel = treeConfig.parallel;
    }
    var tree = new BehaviorTree({
        title: headingTree.title
    })

    var rootNode = new IfSelector({
        title: 'condition',
        expression: GetConditionExpression(conditionNodes),
        returnPending: parallel
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