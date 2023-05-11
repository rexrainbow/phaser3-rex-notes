import { Sequence, Selector, If, Succeeder } from '../../../behaviortree';
import GetNodeType from './GetNodeType.js';
import GetConditionExpression from './GetConditionExpression';
import ParseProperty from './ParseProperty';
import TaskSequence from '../../eventsheettrees/TaskSequence';
import TaskAction from '../../eventsheettrees/TaskAction.js';

var TypeNames = ['if', 'else'];

var CreateTaskSequence = function (node, {
    lineReturn = '\\'
} = {}) {

    if (Array.isArray(node)) {
        var nodes = node;
        if (nodes.length === 1) {
            return CreateTaskSequence(nodes[0], { lineReturn });

        } else {
            var sequence = new Sequence({ title: 'tags' });
            var lastIfSelector;
            for (var i = 0, cnt = nodes.length; i < cnt; i++) {
                var node = nodes[i];
                var child = CreateTaskSequence(node, { lineReturn });
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
                ifDecorator.addChild(CreateTaskSequence(node.children, { lineReturn }));
                selector.addChild(ifDecorator)

                var succeeder = new Succeeder();
                selector.addChild(succeeder);

                return selector;

            case 'else':
                var ifDecorator = new If({
                    title: '[else]',
                    expression: GetConditionExpression(node)
                });
                ifDecorator.addChild(CreateTaskSequence(node.children, { lineReturn }));

                return ifDecorator;

            default:
                var sequence = new TaskSequence({ title: node.title });
                var paragraphs = node.paragraphs;  // paragraphs -> TaskAction[]
                for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
                    var taskData = GetTaskData(paragraphs[i], { lineReturn });
                    var taskAction = new TaskAction(taskData);
                    sequence.addChild(taskAction);
                }
                return sequence;
        }
    }
}

var GetTaskData = function (paragraph, {
    lineReturn = '\\'
} = {}) {

    var taskData;
    if (paragraph.hasOwnProperty('block')) {
        taskData = ParseCommandString(paragraph.block, ',');
        taskData.parameters.text = paragraph.text;
    } else {
        taskData = ParseCommandString(paragraph.text, '\n', lineReturn);
    }

    return taskData
}

var ParseCommandString = function (commandString, delimiter, lineReturn) {
    var lines = commandString.split(delimiter);
    var taskData = {
        name: TrimString(lines[0], lineReturn),
        parameters: {}
    };
    var parameters = taskData.parameters;
    for (var i = 1, cnt = lines.length; i < cnt; i++) {
        ParseProperty(TrimString(lines[i], lineReturn), parameters);
    }
    return taskData;
}

var TrimString = function (s, lineReturn) {
    if (lineReturn && (s.at(-1) === lineReturn)) {
        s = s.substring(0, s.length - 1);
    }
    return s.trimLeft();
}

export default CreateTaskSequence;