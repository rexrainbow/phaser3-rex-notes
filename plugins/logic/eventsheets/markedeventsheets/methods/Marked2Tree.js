import { ForceFailure, Succeeder } from '../../../behaviortree/index.js';
import EventBehaviorTree from '../../eventsheettrees/EventBehaviorTree.js';
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

    var { parallel = parallel } = treeConfig;

    var tree = new EventBehaviorTree({
        title: headingTree.title,
        parallel: parallel,
        condition: GetConditionExpression(conditionNodes)
    })

    var rootNode = tree.root;
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