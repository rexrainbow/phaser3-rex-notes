import {
    Sequence, Selector, If, RepeatUntilFailure, Repeat,
    Succeeder,
} from '../../../behaviortree/index.js';
import TaskSequence from '../../eventsheetmanager/nodes/TaskSequence.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import CreateActionNode from './CreateActionNode.js';
import GetConditionExpression from './GetConditionExpression.js';


var CreateActionSequence = function (actions, title, isTaskSequence) {
    if (!actions || !actions.length) {
        return new Succeeder();
    }

    var parentNode;
    if (isTaskSequence) {
        // label
        parentNode = new TaskSequence({ title: title });
    } else {
        parentNode = new Sequence();
    }

    var node;
    for (var i = 0, cnt = actions.length; i < cnt; i++) {
        var nodeData = actions[i];
        if (nodeData.type) {
            nodeData.type = nodeData.type.toLowerCase();
        }

        switch (nodeData.type) {
            case undefined:
                if (nodeData.branches) {  // type: if
                    node = CreateIFNode(nodeData);
                } else if (nodeData.times) {  // type: repeat
                    node = CreateRepeatNode(nodeData);
                } else if (nodeData.actions) {  // type: label
                    node = CreateSequenceNode(nodeData,
                        {
                            isTaskSequence: true,
                            onConditionFailValue: true
                        }
                    );
                } else {  // type: command
                    node = CreateActionNode(nodeData)
                }
                break;

            case 'if':
                node = CreateIFNode(nodeData);
                break;

            case 'while':
                node = CreateWhileNode(nodeData);
                break;

            case 'repeat':
                node = CreateRepeatNode(nodeData);
                break;

            case 'for':
                node = CreateForNode(nodeData);
                break;

            case 'label':
                node = CreateSequenceNode(nodeData,
                    {
                        isTaskSequence: true,
                        onConditionFailValue: true
                    }
                );
                break;

            default:
                node = CreateActionNode(nodeData)
                break;
        }

        parentNode.addChild(node);
    }

    return parentNode;
}

var CreateIFNode = function (nodeData) {
    var node = new Selector({
        title: '[if]'
    });

    var branches = nodeData.branches;
    var hasTrueExpression = false;
    for (var i = 0, cnt = branches.length; i < cnt; i++) {
        var branchNode = CreateSequenceNode(branches[i]);
        node.addChild(branchNode);

        hasTrueExpression = !(branchNode instanceof If);
        if (hasTrueExpression) {
            break;
        }
    }

    if (!hasTrueExpression) {
        node.addChild(new Succeeder());
    }
    return node;
}

var CreateWhileNode = function (nodeData) {
    var node = new RepeatUntilFailure({
        title: '[while]',
        returnSuccess: true,
    });
    node.addChild(CreateSequenceNode(nodeData));
    return node;
}

var CreateRepeatNode = function (nodeData) {
    var node = new Repeat({
        title: '[repeat]',
        maxLoop: nodeData.times,
    })
    node.addChild(CreateSequenceNode(nodeData, { ignoreCondition: true }));
    return node;
}

var CreateForNode = function (nodeData) {
    var node = new Sequence({ title: '[for]' });

    // init
    if (nodeData.init) {
        node.addChild(CreateActionSequence(nodeData.init, undefined, true));
    }

    // while
    var whileNode = new RepeatUntilFailure({
        returnSuccess: true,
    });

    var actions = [];
    if (nodeData.actions) {
        actions.push({ actions: nodeData.actions });
    }
    if (nodeData.step) {
        actions.push({ actions: nodeData.step });
    }
    whileNode.addChild(CreateSequenceNode({
        condition: nodeData.condition,
        actions: actions
    }));

    node.addChild(whileNode);

    return node;
}

var CreateSequenceNode = function (nodeData, config = {}) {
    // properties: title(for label only), condition(can be ignored), actions

    var {
        isTaskSequence = false,
        ignoreCondition = false,
        onConditionFailValue = false,
    } = config;

    var node, ifDecorator;

    if (!ignoreCondition) {
        var expression = GetConditionExpression(nodeData.condition);
        if (expression !== 'true') {
            ifDecorator = CreateIfDecorator(expression, onConditionFailValue);
        }
    }

    var title = (isTaskSequence) ? nodeData.title : undefined;
    node = CreateActionSequence(nodeData.actions, title, isTaskSequence);

    if (ifDecorator) {
        ifDecorator.addChild(node);
        node = ifDecorator;
    }

    return node;
}


export default CreateActionSequence;