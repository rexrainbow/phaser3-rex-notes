import {
    Succeeder, Abort,
} from '../../../behaviortree/index.js';
import TaskAction from '../../eventsheetmanager/nodes/taskaction/TaskAction.js';
import ActivateAction from '../../eventsheetmanager/nodes/ActivateAction.js';
import DeactivateAction from '../../eventsheetmanager/nodes/DeactivateAction.js';
import BreakAction from '../../eventsheetmanager/nodes/BreakAction.js';
import ContinueAction from '../../eventsheetmanager/nodes/ContinueAction.js';
import NextRoundAction from '../../eventsheetmanager/nodes/NextRoundAction.js';

var CreateActionNode = function (nodeData) {
    var node;

    switch (nodeData.type) {
        case 'command':
        case undefined:
            delete nodeData.type;
            node = new TaskAction(nodeData);
            break;

        case 'exit':
            node = new Abort({ title: '[exit]' });
            break;

        case 'activate':
            var activateTreeTitle = nodeData.target || '';
            node = new ActivateAction({
                title: '[activate]',
                activateTreeTitle: activateTreeTitle.trim(),
            });
            break;

        case 'deactivate':
            var deactivateTreeTitle = nodeData.target || '';
            node = new DeactivateAction({
                title: '[deactivate]',
                deactivateTreeTitle: deactivateTreeTitle.trim(),
            });
            break;

        case 'break':
            var breakDecoratorTitle = nodeData.target || '';
            node = new BreakAction({
                title: '[break]',
                breakDecoratorTitle: breakDecoratorTitle.trim(),
            });
            break;

        case 'continue':
            node = new ContinueAction({
                title: '[continue]',
            });
            break;

        case 'nextRound':
        case 'next-round':
            node = new NextRoundAction({
                title: '[nextRound]',
            });
            break;

        default:
            console.warn(`Unsupported nodeData.type '${nodeData.type}' - treated as success.`);
            node = new Succeeder();
            break;
    }

    return node;
}

export default CreateActionNode;
