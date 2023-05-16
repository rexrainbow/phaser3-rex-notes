import { Sequence, Selector, If, Succeeder, RepeatUntilFailure } from '../../../behaviortree';
import GetNodeType from './GetNodeType.js';
import GetConditionExpression from './GetConditionExpression';
import ParseProperty from './ParseProperty';
import TaskSequence from '../../eventsheettrees/TaskSequence';
import TaskAction from '../../eventsheettrees/TaskAction.js';

var TypeNames = ['if', 'else', 'while'];

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
        var nodeType = GetNodeType(node, TypeNames);
        switch (nodeType) {
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
                var whileDecorator = new RepeatUntilFailure({ title: '[while]' })
                var ifDecorator = new If({
                    title: '[while]',
                    expression: GetConditionExpression(node)
                });
                ifDecorator.addChild(CreateTaskSequence(node.children, config));
                whileDecorator.addChild(ifDecorator);
                return whileDecorator;

            default:
                var sequence = new TaskSequence({ title: node.title });
                var paragraphs = node.paragraphs;  // paragraphs -> TaskAction[]
                for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
                    var taskData = GetTaskData(paragraphs[i], config);
                    if (taskData) {
                        var taskAction = new TaskAction(taskData);
                        sequence.addChild(taskAction);
                    }
                }
                return sequence;
        }
    }
}

var GetTaskData = function (paragraph, config) {
    var taskData;
    if (paragraph.hasOwnProperty('block')) {
        taskData = ParseCommandString(paragraph.block, ',', config);
        taskData.parameters.text = paragraph.text;
    } else {
        taskData = ParseCommandString(paragraph.text, '\n', config);
    }

    return taskData
}

var ParseCommandString = function (commandString, delimiter, {
    lineReturn = '\\',
    commentLineStart = '\/\/',
} = {}) {
    var lines = commandString.split(delimiter);
    if (IsCommentLine(lines[0], commentLineStart)) {
        return null;
    }

    var taskData = {
        name: TrimString(lines[0], lineReturn),
        parameters: {}
    };

    var parameterLines = [];
    for (var i = 1, cnt = lines.length; i < cnt; i++) {
        var line = lines[i];
        if (line.indexOf('=') > -1) {
            parameterLines.push(line);
        } else {
            var lastParameterLine = parameterLines[parameterLines.length - 1];
            if (lastParameterLine) {
                lastParameterLine = `${TrimString(lastParameterLine, lineReturn)}\n${line}`;
                parameterLines[parameterLines.length - 1] = lastParameterLine;
            }
        }
    }

    var parameters = taskData.parameters;
    for (var i = 0, cnt = parameterLines.length; i < cnt; i++) {
        ParseProperty(TrimString(parameterLines[i], lineReturn), parameters);
    }
    return taskData;
}

var TrimString = function (s, lineReturn) {
    if (lineReturn && (s.at(-1) === lineReturn)) {
        s = s.substring(0, s.length - 1);
    }
    return s.trimLeft();
}

var IsCommentLine = function (s, commentLineStart) {
    return s.trimLeft().startsWith(commentLineStart);
}

export default CreateTaskSequence;