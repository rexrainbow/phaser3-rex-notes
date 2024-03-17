import { Sequence, Selector, If, Succeeder, RepeatUntilFailure, Repeat } from '../../../behaviortree/index.js';
import { HeadingCommand } from './BuiltInCommandTypes.js';
import ParseType from './ParseType.js';
import GetConditionExpressionFromNode from './GetConditionExpression.js';
import CreateActionSequence from './CreateActionSequence.js';
import ExtraNumberExpression from './ExtraNumberExpression.js';

var CreateParentNode = function (node, config, output) {
    if (Array.isArray(node)) {
        var nodes = node;
        if (nodes.length === 1) {
            return CreateParentNode(nodes[0], config);

        } else {
            // Create sequence from node.children
            var sequence = (output) ? output : new Sequence();
            var lastIfSelector;
            for (var i = 0, cnt = nodes.length; i < cnt; i++) {
                var node = nodes[i];
                var child = CreateParentNode(node, config);
                // Construct if-branch selector
                switch (child.title) {
                    case '[if]':
                        sequence.addChild(child);
                        lastIfSelector = child;
                        break;

                    case '[else]':
                    case '[else if]':
                        if (lastIfSelector) {
                            lastIfSelector.insertChild(child, null, -1);
                        } else {
                            // No [If] heading before this [else] heading
                            console.warn(`Can't find [If] heading before '${node.title}'`);
                        }
                        break;

                    default:  // Normal tasks
                        sequence.addChild(child);
                        lastIfSelector = null;
                        break;
                }

            }
            return sequence;

        }
    }

    var result = ParseType(node.title, HeadingCommand);
    if (result) {
        switch (result.type) {
            case 'if':
                var selector = new Selector({
                    title: '[if]'
                });

                var ifDecorator = new If({
                    expression: GetConditionExpression(result.match[1], node)
                });
                if (node.children.length > 0) {
                    ifDecorator.addChild(CreateParentNode(node.children, config));
                } else {
                    ifDecorator.addChild(CreateActionSequence(node, config));
                }
                selector.addChild(ifDecorator)

                var succeeder = new Succeeder();
                selector.addChild(succeeder);

                return selector;

            case 'else':
            case 'else if':
                var ifDecorator = new If({
                    title: `[${result.type}]`,
                    expression: (result.type === 'else') ? 'true' : GetConditionExpression(result.match[1], node)
                });
                if (node.children.length > 0) {
                    ifDecorator.addChild(CreateParentNode(node.children, config));
                } else {
                    ifDecorator.addChild(CreateActionSequence(node, config));
                }
                return ifDecorator;

            case 'while':
                var whileDecorator = new RepeatUntilFailure({
                    title: '[while]',
                    returnSuccess: true,
                });

                var ifDecorator = new If({
                    title: '[while]',
                    expression: GetConditionExpression(result.match[1], node)
                });
                if (node.children.length > 0) {
                    ifDecorator.addChild(CreateParentNode(node.children, config));
                } else {
                    ifDecorator.addChild(CreateActionSequence(node, config));
                }

                whileDecorator.addChild(ifDecorator);
                return whileDecorator;

            case 'repeat':
                var repeatCount = ExtraNumberExpression(result.match[1]);
                var repeatDecorator = new Repeat({
                    title: '[repeat]',
                    maxLoop: repeatCount,
                })
                if (node.children.length > 0) {
                    repeatDecorator.addChild(CreateParentNode(node.children, config));
                } else {
                    repeatDecorator.addChild(CreateActionSequence(node, config));
                }
                return repeatDecorator;

            default:
                // Error
                console.error(`Missing ${result.type}'s handler`);
                break;
        }

    } else {
        var sequence;
        if (node.children.length > 0) {
            // A node has paragraphs and children
            sequence = new Sequence();
            // Create ActionSequence from paragraphs
            sequence.addChild(CreateActionSequence(node, config));
            // Append nodes from node.children
            CreateParentNode(node.children, config, sequence);

        } else {
            // A node has paragraphs only
            sequence = CreateActionSequence(node, config);

        }
        return sequence;

    }
}

var GetConditionExpression = function (payloadExpression, node) {
    var expression = payloadExpression.trim();
    if (expression === '') {
        expression = GetConditionExpressionFromNode(node)
    }
    return expression;
}

export default CreateParentNode;