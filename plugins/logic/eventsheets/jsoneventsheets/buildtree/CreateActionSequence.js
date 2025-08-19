import {
    Sequence, Selector, If, RepeatUntilFailure, Repeat,
    Succeeder,
} from '../../../behaviortree/index.js';
import LabelDecorator from '../../eventsheetmanager/nodes/LabelDecorator.js';
import BreakDecorator from '../../eventsheetmanager/nodes/BreakDecorator.js';
import CreateIfDecorator from './CreateIfDecorator.js';
import CreateActionNode from './CreateActionNode.js';
import GetConditionExpression from './GetConditionExpression.js';


var CreateActionSequence = function (actions, title, hasLabel) {
    var parentNode, sequenceNode;
    if (hasLabel) {
        // break decorator
        var breakDecorator = new BreakDecorator();
        // label decorator
        var labelDecorator = new LabelDecorator({ title: title });
        breakDecorator.chainChild(labelDecorator);
        parentNode = breakDecorator;
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

            switch (nodeData.type) {
                case undefined:
                    if (nodeData.branches) {  // type: if
                        node = CreateIFNode(nodeData);
                    } else if (nodeData.times) {  // type: repeat
                        node = CreateRepeatNode(nodeData);
                    } else if (nodeData.actions) {  // type: label
                        node = CreateSequenceNode(nodeData,
                            {
                                hasLabel: true,
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
                            hasLabel: true,
                            onConditionFailValue: true
                        }
                    );
                    break;

                case 'block':
                    node = CreateSequenceNode(nodeData,
                        {
                            onConditionFailValue: true
                        }
                    );
                    break;

                default:
                    node = CreateActionNode(nodeData)
                    break;
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
    - actions block: Sequence
*/
// break : Return SUCCESS in RepeatUntilFailure
// continue : Return SUCCESS in actions block
var CreateWhileNode = function (nodeData) {
    var topNode = new BreakDecorator();

    var node = new RepeatUntilFailure({
        title: '[while]',
        returnSuccess: true,
    });
    node.addChild(CreateSequenceNode(nodeData));

    topNode.addChild(node);
    node = topNode;

    return node;
}

/*
- BreakDecorator + Repeat(Decorator)
  - actions block: [ignoreCondition] Sequence
*/
// break : Return SUCCESS in Repeat
// continue : Return SUCCESS in actions block
var CreateRepeatNode = function (nodeData) {
    var topNode = new BreakDecorator();

    var node = new Repeat({
        title: '[repeat]',
        maxLoop: nodeData.times,
    })
    node.addChild(CreateSequenceNode(nodeData, { ignoreCondition: true }));

    topNode.addChild(node);
    node = topNode;

    return node;
}

/*
- BreakDecorator + Sequence
  - init block: Sequence
  - RepeatUntilFailure(Decorator)
    - condition block: If(Decorator)
    - Sequence
      - actions block: Sequence
      - step block: Sequence
*/
// break : Return SUCCESS in tick of Sequence
// continue : Return SUCCESS in actions block
var CreateForNode = function (nodeData) {
    var topNode = new BreakDecorator();

    var node = new Sequence({ title: '[for]' });

    // init
    if (nodeData.init) {
        node.addChild(CreateActionSequence(nodeData.init, undefined, false));
    }

    // while
    var whileNode = new RepeatUntilFailure({
        returnSuccess: true,
    });

    var actions = [];
    if (nodeData.actions) {
        actions.push({ actions: nodeData.actions, type: 'block' });
    }
    if (nodeData.step) {
        actions.push({ actions: nodeData.step, type: 'block' });
    }
    whileNode.addChild(CreateSequenceNode({
        condition: nodeData.condition,
        actions: actions
    }));

    node.addChild(whileNode);

    topNode.addChild(node);
    node = topNode;

    return node;
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
        if (expression !== 'true') {
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