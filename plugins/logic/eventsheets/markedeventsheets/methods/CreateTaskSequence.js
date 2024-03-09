import { Sequence, Selector, If, Succeeder, RepeatUntilFailure, Abort, Failer } from '../../../behaviortree';
import { Level3HeadingCommandTypes, ActionCommandTypes } from './BuiltInCommandTypes.js';
import ParseType from './ParseType.js';
import GetConditionExpression from './GetConditionExpression';
import ParseProperty from './ParseProperty';
import TaskSequence from '../../eventsheetmanager/nodes/TaskSequence.js';
import TaskAction from '../../eventsheetmanager/nodes/TaskAction.js';
import WaitNextRound from '../../eventsheetmanager/nodes/WaitNextRound.js';
import DeactivateAction from '../../eventsheetmanager/nodes/DeactivateAction.js';

var CreateTaskSequence = function (node, config) {

    if (Array.isArray(node)) {
        var nodes = node;
        if (nodes.length === 1) {
            return CreateTaskSequence(nodes[0], config);

        } else {
            var sequence = new Sequence({ title: '[root]' });
            var lastIfSelector;
            for (var i = 0, cnt = nodes.length; i < cnt; i++) {
                var node = nodes[i];
                var child = CreateTaskSequence(node, config);
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

    } else {
        var result = ParseType(node.title, Level3HeadingCommandTypes);
        if (result) {
            switch (result.type) {
                case 'if':
                    var selector = new Selector({
                        title: '[if]'
                    });

                    var ifDecorator = new If({
                        expression: GetConditionExpression(node)
                    });
                    ifDecorator.addChild(CreateTaskSequence(node.children, config));
                    selector.addChild(ifDecorator)

                    var succeeder = new Succeeder();
                    selector.addChild(succeeder);

                    return selector;

                case 'else':
                    var ifDecorator = new If({
                        title: '[else]',
                        expression: GetConditionExpression(node)
                    });
                    ifDecorator.addChild(CreateTaskSequence(node.children, config));

                    return ifDecorator;

                case 'while':
                    var whileDecorator = new RepeatUntilFailure({
                        title: '[while]',
                        returnSuccess: true,
                    })
                    var ifDecorator = new If({
                        title: '[while]',
                        expression: GetConditionExpression(node)
                    });
                    ifDecorator.addChild(CreateTaskSequence(node.children, config));
                    whileDecorator.addChild(ifDecorator);
                    return whileDecorator;

                default:
                    break;
            }
        } else {
            var sequence = new TaskSequence({ title: node.title });
            var paragraphs = node.paragraphs;  // paragraphs -> TaskAction[]
            for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
                var commandData = GetCommandData(paragraphs[i], config);
                if (!commandData) {
                    continue;
                }

                var commandType = commandData.type;
                delete commandData.type;

                var actionNode;
                switch (commandType) {
                    case 'exit':
                        actionNode = new Abort({ title: '[exit]' });
                        break;

                    case 'break':
                        actionNode = new Failer({ title: '[break]' });
                        break;

                    case 'next round':
                        actionNode = new WaitNextRound({ title: '[next round]' }); // Wait 1 tick
                        break;

                    case 'deactivate':
                        actionNode = new DeactivateAction({ title: '[deactivate]' });
                        break;

                    default:
                        actionNode = new TaskAction(commandData);
                        break;
                }

                sequence.addChild(actionNode);

            }
            return sequence;
        }
    }
}

var GetCommandData = function (paragraph, config) {
    var commandData;
    if (paragraph.hasOwnProperty('block')) {
        commandData = ParseCommandString(paragraph.block, ',', config);
        commandData.parameters.text = paragraph.text;
    } else {
        commandData = ParseCommandString(paragraph.text, '\n', config);
    }

    return commandData;
}


var ParseCommandString = function (commandString, delimiter, {
    lineBreak = '\\',
    commentLineStart = '\/\/',
} = {}) {
    var lines = commandString.split(delimiter);

    if (delimiter === '\n') {
        // Discard comment lines
        lines = lines.filter(function (line) {
            return !line.trimLeft().startsWith(commentLineStart);
        })

        if (lines.length === 0) {
            return null;
        } else if (lines.length === 1) {
            var line = lines[0];

            var result = ParseType(line, ActionCommandTypes);
            if (result) {
                return result;
            }

            if (line.indexOf(',') !== -1) {
                lines = commandString.split(',');
            }
        }
    }

    var commandData = {
        type: 'task',
        name: TrimString(lines[0], lineBreak),
        parameters: {}
    };

    var parameters = commandData.parameters;
    for (var i = 1, cnt = lines.length; i < cnt; i++) {
        ParseProperty(TrimString(lines[i], lineBreak), parameters);
    }
    return commandData;
}

var TrimString = function (s, lineBreak) {
    if (lineBreak && (s.at(-1) === lineBreak)) {
        s = s.substring(0, s.length - 1);
    }
    return s.trimLeft();
}

export default CreateTaskSequence;