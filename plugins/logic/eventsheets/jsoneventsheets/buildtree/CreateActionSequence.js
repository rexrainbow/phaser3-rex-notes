import {
    Sequence, Selector, If, RepeatUntilFailure, Repeat,
    Succeeder,
} from '../../../behaviortree/index.js';
import TaskSequence from '../../eventsheetmanager/nodes/TaskSequence.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import CreateActionNode from './CreateActionNode.js';
import GetConditionExpression from './GetConditionExpression.js';


var CreateActionSequence = function (actions, title) {
    if (!actions || !actions.length) {
        return new Succeeder();
    }

    var isSingleNode = (actions.length === 1) && (!title);

    var parentNode;
    if (!isSingleNode) {
        if (title) {
            parentNode = new TaskSequence({ title: title })
        } else {
            parentNode = new Sequence();
        }
    }

    var node;
    for (var i = 0, cnt = actions.length; i < cnt; i++) {
        var nodeData = actions[i];
        if (nodeData.type) {
            nodeData.type = nodeData.type.toLowerCase();
        }

        switch (nodeData.type) {
            case undefined:
                if (nodeData.branches) {
                    node = CreateIFNode(nodeData);
                } else if (nodeData.actions) {
                    node = CreateLabelNode(nodeData, { onConditionFailValue: true });
                } else {
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

            case 'label':
                node = CreateLabelNode(nodeData, { onConditionFailValue: true });
                break;

            default:
                node = CreateActionNode(nodeData)
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

var CreateIFNode = function (nodeData) {
    var node = new Selector({
        title: '[if]'
    });

    var branches = nodeData.branches;
    var hasTrueExpression = false;
    for (var i = 0, cnt = branches.length; i < cnt; i++) {
        var branchNode = CreateLabelNode(branches[i]);
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
    node.addChild(CreateLabelNode(nodeData));
    return node;
}

var CreateRepeatNode = function (nodeData) {
    var node = new Repeat({
        title: '[repeat]',
        maxLoop: nodeData.times,
    })
    node.addChild(CreateLabelNode(nodeData, { ignoreCondition: true }));
    return node;
}

var CreateLabelNode = function (nodeData, config = {}) {
    // properties: title, condition(can be ignored), actions

    var {
        ignoreCondition = false,
        onConditionFailValue = false
    } = config;

    var node, ifDecorator;

    if (!ignoreCondition) {
        var expression = GetConditionExpression(nodeData.condition);
        if (expression !== 'true') {
            ifDecorator = CreateIfDecorator(expression, onConditionFailValue);
        }
    }

    node = CreateActionSequence(nodeData.actions, nodeData.title);

    if (ifDecorator) {
        ifDecorator.addChild(node);
        node = ifDecorator;
    }

    return node;
}


export default CreateActionSequence;