import {
    Sequence, Selector, If, RepeatUntilFailure,
    Succeeder,
} from '../../../behaviortree/index.js';
import LabelDecorator from '../../eventsheetmanager/nodes/LabelDecorator.js';
import BreakDecorator from '../../eventsheetmanager/nodes/BreakDecorator.js';
import ContinueDecorator from '../../eventsheetmanager/nodes/ContinueDecorator.js';
import Repeat from '../../eventsheetmanager/nodes/Repeat.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import CreateActionNode from './CreateActionNode.js';
import GetConditionExpression from './GetConditionExpression.js';

var IsTrueExpression = function (expression) {
    return (expression === true) || (expression === 'true');
}

var WrapLabel = function (node, title) {
    var breakDecorator = new BreakDecorator({ title: title });
    var labelDecorator = new LabelDecorator({ title: title });

    breakDecorator.chainChild(labelDecorator);
    if (node) {
        labelDecorator.addChild(node);
    }

    return breakDecorator;
}

var WrapCondition = function (node, condition, onConditionFailValue) {
    var expression = GetConditionExpression(condition);
    if (IsTrueExpression(expression)) {
        return node;
    }

    var ifDecorator = CreateIfDecorator(expression, onConditionFailValue);
    ifDecorator.addChild(node);

    return ifDecorator;
}

var CreateActionSequence = function (actions, title, hasLabel) {
    var parentNode, sequenceNode;
    if (hasLabel) {
        parentNode = WrapLabel(undefined, title);
    }

    if (!actions || !actions.length) {
        sequenceNode = new Succeeder();

    } else {
        sequenceNode = new Sequence();

        var node;
        for (var i = 0, cnt = actions.length; i < cnt; i++) {
            var nodeData = actions[i];
            if (nodeData.type) {
                nodeData.type = nodeData.type.toLowerCase();
            }

            var wrapTitle = false;
            var wrapActionCondition = false;
            switch (nodeData.type) {
                case undefined:
                    if (nodeData.branches) {  // type: if
                        node = CreateIFNode(nodeData);
                        wrapTitle = !!nodeData.title;
                    } else if (nodeData.times) {  // type: repeat
                        node = CreateRepeatNode(nodeData);
                        wrapTitle = !!nodeData.title;
                    } else if (nodeData.actions) {  // type: label
                        node = CreateSequenceNode(nodeData,
                            { hasLabel: true, onConditionFailValue: true }
                        );
                    } else {  // type: command
                        node = CreateActionNode(nodeData)
                        wrapTitle = !!nodeData.title;
                        wrapActionCondition = true;
                    }
                    break;

                case 'if':
                    node = CreateIFNode(nodeData);
                    wrapTitle = !!nodeData.title;
                    break;

                case 'while':
                    node = CreateWhileNode(nodeData);
                    wrapTitle = !!nodeData.title;
                    break;

                case 'repeat':
                    node = CreateRepeatNode(nodeData);
                    wrapTitle = !!nodeData.title;
                    break;

                case 'for':
                    node = CreateForNode(nodeData);
                    wrapTitle = !!nodeData.title;
                    break;

                case 'label':
                    node = CreateSequenceNode(nodeData,
                        { hasLabel: true, onConditionFailValue: true }
                    );
                    break;

                case 'block':
                    node = CreateSequenceNode(nodeData,
                        { hasLabel: !!nodeData.title, onConditionFailValue: true }
                    );
                    break;

                default:
                    node = CreateActionNode(nodeData)
                    wrapTitle = !!nodeData.title;
                    wrapActionCondition = true;
                    break;
            }

            if (wrapTitle) {
                node = WrapLabel(node, nodeData.title);
            }

            if (wrapActionCondition) {
                node = WrapCondition(node, nodeData.condition, true);
            }

            sequenceNode.addChild(node);
        }
    }

    if (parentNode) {
        parentNode.chainChild(sequenceNode);
    } else {
        parentNode = sequenceNode;
    }

    return parentNode;
}

/*
- Selector
  - If(Decorator)
    - Sequence
  - If(Decorator)
    - Sequence
  ...
*/
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

/*
- BreakDecorator + RepeatUntilFailure(Decorator)
  - condition block: If(Decorator)
    - actions block: ContinueDecorator + Sequence
*/
var CreateWhileNode = function (nodeData) {
    // Prepare nodes
    var breakDecorator = new BreakDecorator();

    var whileNode = new RepeatUntilFailure({
        title: '[while]',
        returnSuccess: true,
    });

    var loopBodyNode = CreateSequenceNode(nodeData)

    // Connect nodes
    breakDecorator.addChild(whileNode);

    whileNode.addChild(loopBodyNode);

    return breakDecorator;
}

/*
- BreakDecorator + Repeat(Decorator)
  - actions block: ContinueDecorator + [ignoreCondition] Sequence
*/
var CreateRepeatNode = function (nodeData) {
    // Prepare nodes
    var breakDecorator = new BreakDecorator();

    var whileNode = new Repeat({
        title: '[repeat]',
        maxLoop: nodeData.times,
    })

    var continueDecorator = new ContinueDecorator();

    var loopBodyNode = CreateSequenceNode(nodeData, { ignoreCondition: true });

    // Connect nodes
    breakDecorator.addChild(whileNode);

    whileNode.addChild(continueDecorator);

    continueDecorator.addChild(loopBodyNode);

    return breakDecorator;
}

/*
- BreakDecorator + Sequence
  - init block: Sequence
  - RepeatUntilFailure(Decorator)
    - condition block: If(Decorator)
      - Sequence
        - actions block: ContinueDecorator + Sequence
        - step block: Sequence
*/
var CreateForNode = function (nodeData) {
    // Prepare nodes
    var breakDecorator = new BreakDecorator();

    var outerSequenceNode = new Sequence({ title: '[for]' });

    var initNode = (nodeData.init) ? CreateActionSequence(nodeData.init, undefined, false) : undefined;

    var whileNode = new RepeatUntilFailure({
        returnSuccess: true,
    });

    var expression = GetConditionExpression(nodeData.condition);
    var ifDecorator = CreateIfDecorator(expression);

    var outerLoopBodyNode = new Sequence();

    var continueDecorator = new ContinueDecorator();

    var actionsNode = CreateSequenceNode(
        { actions: nodeData.actions },
        { onConditionFailValue: true, ignoreCondition: true }
    );

    var stepNode = CreateSequenceNode(
        { actions: nodeData.step },
        { onConditionFailValue: true, ignoreCondition: true }
    );

    // Connect nodes
    breakDecorator.addChild(outerSequenceNode);

    if (initNode) {
        outerSequenceNode.addChild(initNode);
    }

    outerSequenceNode.addChild(whileNode);

    whileNode.addChild(ifDecorator);

    ifDecorator.addChild(outerLoopBodyNode);

    outerLoopBodyNode.addChild(continueDecorator);

    continueDecorator.addChild(actionsNode);

    outerLoopBodyNode.addChild(stepNode);

    return breakDecorator;
}

/*
!ignoreCondition

- If(Decorator)
  - Sequence
  
or 
  
- If(Decorator)
  - LabelDecorator + Sequence

---

ignoreCondition

- Sequence

or 

- BreakDecorator + LabelDecorator + Sequence
*/
var CreateSequenceNode = function (nodeData, config = {}) {
    // properties: title(for label only), condition(can be ignored), actions

    var {
        hasLabel = false,
        ignoreCondition = false,
        onConditionFailValue = false,
    } = config;

    var node, ifDecorator;

    if (!ignoreCondition) {
        var expression = GetConditionExpression(nodeData.condition);
        if (!IsTrueExpression(expression)) {
            ifDecorator = CreateIfDecorator(expression, onConditionFailValue);
        }
    }

    var title = (hasLabel) ? nodeData.title : undefined;
    node = CreateActionSequence(nodeData.actions, title, hasLabel);

    if (ifDecorator) {
        ifDecorator.addChild(node);
        node = ifDecorator;
    }

    return node;
}


export default CreateActionSequence;
