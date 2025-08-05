import TaskAction from '../../eventsheetmanager/nodes/taskaction/TaskAction.js';
import {
    Sequence, Selector, If, RepeatUntilFailure, Repeat,
    Succeeder, Abort, Failer,
} from '../../../behaviortree/index.js';
import ActivateAction from '../../eventsheetmanager/nodes/ActivateAction.js';
import DeactivateAction from '../../eventsheetmanager/nodes/DeactivateAction.js';
import GetConditionExpression from './GetConditionExpression.js';


var CreateActionSequence = function (actions) {
    if (!actions || !actions.length) {
        return new Succeeder();
    }

    var isSingleNode = (actions.length === 1);

    var parentNode;
    if (!isSingleNode) {
        parentNode = new Sequence();
    }

    var node;
    for (var nodeIndex = 0, nodeCount = actions.length; nodeIndex < nodeCount; nodeIndex++) {
        var nodeData = actions[nodeIndex];
        switch (nodeData.type) {
            case 'command':
            case undefined:
                delete nodeData.type;
                node = new TaskAction(nodeData);
                break;

            case 'if':
                node = new Selector({
                    title: '[if]'
                });

                var branches = nodeData.branches;
                var hasTrueExpression = false;
                for (var branchIndex = 0, branchCount = branches.length; branchIndex < branchCount; branchIndex++) {
                    var branch = branches[branchIndex];

                    var expression = GetConditionExpression(branch.condition);
                    if (expression === 'true') {
                        hasTrueExpression = true;

                        node.addChild(CreateActionSequence(branch.actions));

                    } else {
                        var ifDecorator;
                        try {
                            ifDecorator = new If({
                                expression: expression
                            });
                        } catch (e) {
                            console.error(`[EventSheet] Parse expression '${expression}' failed, replace expression by 'false'`);
                            console.error(e);

                            ifDecorator = new If({
                                expression: 'false'
                            });
                        }
                        ifDecorator.addChild(CreateActionSequence(branch.actions));
                        node.addChild(ifDecorator);

                    }

                }

                if (!hasTrueExpression) {
                    node.addChild(new Succeeder());
                }

                break;

            case 'while':
                node = new RepeatUntilFailure({
                    title: '[while]',
                    returnSuccess: true,
                });

                var expression = GetConditionExpression(nodeData.condition);
                try {
                    ifDecorator = new If({
                        title: '[while-IF]',
                        expression: expression
                    });
                } catch (e) {
                    console.error(`[EventSheet] Parse expression '${expression}' failed, replace expression by 'false'`);
                    console.error(e);

                    ifDecorator = new If({
                        title: '[while-IF]',
                        expression: 'false'
                    });
                }
                ifDecorator.addChild(CreateActionSequence(nodeData.actions));

                node.addChild(ifDecorator);
                break;

            case 'repeat':
                node = new Repeat({
                    title: '[repeat]',
                    maxLoop: nodeData.times,
                })
                node.addChild(CreateActionSequence(nodeData.actions));
                break;

            case 'label':
                // TODO
                break;

            case 'exit':
                node = new Abort({ title: '[exit]' });
                break;

            case 'break':
                node = new Failer({ title: '[break]' });
                break;

            case 'activate':
                node = new ActivateAction({
                    title: '[activate]',
                    activateTreeTitle: nodeData.target.trim(),
                });
                break;

            case 'deactivate':
                node = new DeactivateAction({
                    title: '[deactivate]',
                    deactivateTreeTitle: nodeData.target.trim(),
                });
                break;

            default:
                console.warn(`Unsupported nodeData.type '${nodeData.type}' - treated as success.`);
                node = new Succeeder();
                break;
        }

        if (!isSingleNode) {
            parentNode.addChild(node);
        }
    }

    if (isSingleNode) {
        parentNode = node;
    }

    return parentNode;
}


export default CreateActionSequence;