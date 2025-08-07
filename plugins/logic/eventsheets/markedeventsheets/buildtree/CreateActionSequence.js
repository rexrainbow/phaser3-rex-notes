import TaskSequence from '../../eventsheetmanager/nodes/TaskSequence.js';
import CreateActionNode from './CreateActionNode.js';

var CreateActionSequence = function (node, config) {
    var sequence = new TaskSequence({ title: node.title });
    var paragraphs = node.paragraphs;  // paragraphs -> TaskAction[]
    var actionNode;
    for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
        actionNode = CreateActionNode(paragraphs[i], config);
        if (!actionNode) {
            continue;
        }
        sequence.addChild(actionNode);
    }
    return sequence;
}

export default CreateActionSequence;