import { Sequence, Selector, If, Succeeder, RepeatUntilFailure, Repeat } from '../../../behaviortree/index.js';
import { HeadingCommand } from './BuiltInCommandTypes.js';
import ParseType from './ParseType.js';
import GetConditionExpression from './GetConditionExpression.js';
import CreateActionSequence from './CreateActionSequence.js';

var CreateParentNode = function (node, config) {
    if (Array.isArray(node)) {
        var nodes = node;
        if (nodes.length === 1) {
            return CreateParentNode(nodes[0], config);

        } else {
            var sequence = new Sequence();
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
                    expression: GetConditionExpression(node)
                });
                ifDecorator.addChild(CreateParentNode(node.children, config));
                selector.addChild(ifDecorator)

                var succeeder = new Succeeder();
                selector.addChild(succeeder);

                return selector;

            case 'else':
                var ifDecorator = new If({
                    title: '[else]',
                    expression: GetConditionExpression(node)
                });
                ifDecorator.addChild(CreateParentNode(node.children, config));

                return ifDecorator;

            case 'while':
                var whileDecorator = new RepeatUntilFailure({
                    title: '[while]',
                    returnSuccess: true,
                });
                var ifDecorator = new If({
                    title: '[while]',
                    expression: GetConditionExpression(node)
                });
                ifDecorator.addChild(CreateParentNode(node.children, config));
                whileDecorator.addChild(ifDecorator);
                return whileDecorator;

            case 'repeat':
                var repeatCount = parseInt(result.match[1]);
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
        return CreateActionSequence(node, config);

    }
}

export default CreateParentNode;