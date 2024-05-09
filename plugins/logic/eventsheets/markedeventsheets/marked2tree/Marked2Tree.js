import { ForceFailure, Succeeder } from '../../../behaviortree/index.js';
import EventSheet from '../../eventsheetmanager/eventsheet/EventSheet.js';
import GetHeadingTree from './GetHeadingTree.js';
import GetTreeConfig from './GetTreeConfig.js';

import ParseTopLevelNodes from './ParseTopLevelNodes.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateParentNode from './CreateParentNode.js';

var Marked2Tree = function (
    eventSheetManager,
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
    var { conditionNodes, mainTaskNodes, catchNodes } = ParseTopLevelNodes(headingTree.children);

    var treeConfig = Object.assign(
        { groupName, parallel, active, once },
        GetTreeConfig(headingTree.paragraphs, commentLineStart)
    );

    var taskSequenceConfig = { lineBreak, commentLineStart };

    var eventsheet = new EventSheet(
        eventSheetManager,
        {
            title: headingTree.title,
            condition: GetConditionExpression(conditionNodes),
            properties: treeConfig
        }
    );

    var rootNode = eventsheet.root;
    rootNode.addChild(CreateParentNode(mainTaskNodes, taskSequenceConfig));

    var forceFailure = new ForceFailure();
    if (catchNodes.length > 0) {
        forceFailure.addChild(CreateParentNode(catchNodes[0], taskSequenceConfig));
    } else {
        forceFailure.addChild(new Succeeder());
    }
    rootNode.addChild(forceFailure);

    return eventsheet;
}

export default Marked2Tree;