import LabelDecorator from '../../eventsheetmanager/nodes/LabelDecorator';
import { Sequence } from '../../../behaviortree/index';
import CreateActionNode from './CreateActionNode';

var CreateActionSequence = function(node?: any, config?: any) {
    var labelDecorator = new LabelDecorator({ title: node.title });

    var sequence = new Sequence({ title: node.title });

    var paragraphs = node.paragraphs;  // paragraphs -> TaskAction[]
    var actionNode;
    for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
        actionNode = CreateActionNode(paragraphs[i], config);
        if (!actionNode) {
            continue;
        }
        sequence.addChild(actionNode);
    }

    labelDecorator.addChild(sequence);

    return labelDecorator;
}

export default CreateActionSequence;