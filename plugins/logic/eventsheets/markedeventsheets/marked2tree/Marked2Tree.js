import { ForceFailure, Succeeder } from '../../../behaviortree/index.js';
import EventBehaviorTree from '../../eventsheetmanager/tree/EventBehaviorTree.js';
import GetHeadingTree from './GetHeadingTree.js';
import GetTreeConfig from './GetTreeConfig.js';

import ParseTopLevelNodes from './ParseTopLevelNodes.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateParentNode from './CreateParentNode.js';

var Marked2Tree = function (
    treeManager,
    markedString,
    {
        groupName,
        lineBreak = '\\',
        commentLineStart = '\/\/',
        parallel = false,
        active = true,
        once = false,
    } = {}
) {

    var headingTree = GetHeadingTree(markedString);
    var treeConfig = GetTreeConfig(headingTree.paragraphs);
    var { conditionNodes, mainTaskNodes, catchNodes } = ParseTopLevelNodes(headingTree.children);

    var {
        parallel = parallel,
        active = active,
        once = once,
    } = treeConfig;
    var taskSequenceConfig = { lineBreak, commentLineStart };

    var tree = new EventBehaviorTree(
        treeManager,
        {
            groupName,
            title: headingTree.title,
            parallel: parallel,
            active: active,
            once: once,
            condition: GetConditionExpression(conditionNodes)
        }
    );

    var rootNode = tree.root;
    rootNode.addChild(CreateParentNode(mainTaskNodes, taskSequenceConfig));

    var forceFailure = new ForceFailure();
    if (catchNodes.length > 0) {
        forceFailure.addChild(CreateParentNode(catchNodes[0], taskSequenceConfig));
    } else {
        forceFailure.addChild(new Succeeder());
    }
    rootNode.addChild(forceFailure);

    return tree;
}

export default Marked2Tree;