import {
    Succeeder, Abort,
} from '../../../behaviortree/index.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import TaskAction from '../../eventsheetmanager/nodes/taskaction/TaskAction.js';
import ActivateAction from '../../eventsheetmanager/nodes/ActivateAction.js';
import DeactivateAction from '../../eventsheetmanager/nodes/DeactivateAction.js';
import BreakAction from '../../eventsheetmanager/nodes/BreakAction.js';
import ContinueAction from '../../eventsheetmanager/nodes/ContinueAction.js';

var CreateActionNode = function (nodeData) {
    var node, ifDecorator;

    var expression = GetConditionExpression(nodeData.condition);
    if (expression !== 'true') {
        ifDecorator = CreateIfDecorator(expression, true)
    }

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

        default:
            console.warn(`Unsupported nodeData.type '${nodeData.type}' - treated as success.`);
            node = new Succeeder();
            break;
    }

    if (ifDecorator) {
        // If <- Action
        ifDecorator.addChild(node);
        node = ifDecorator;
    }

    return node;
}

export default CreateActionNode;