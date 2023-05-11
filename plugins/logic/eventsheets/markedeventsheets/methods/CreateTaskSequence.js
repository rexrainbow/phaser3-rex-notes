import { Sequence, ForceSuccess, If } from '../../../behaviortree';
import GetNodeType from './GetNodeType.js';
import GetConditionExpression from './GetConditionExpression';
import ParseProperty from './ParseProperty';
import TaskAction from '../../eventsheettrees/TaskAction.js';

var TypeNames = ['if'];

var CreateTaskSequence = function (node, {
    lineReturn = '\\'
} = {}) {

    if (Array.isArray(node)) {
        var nodes = node;
        if (nodes.length === 1) {
            return CreateTaskSequence(nodes[0], { lineReturn });

        } else {
            var sequence = new Sequence({ title: 'tags' });
            for (var i = 0, cnt = nodes.length; i < cnt; i++) {
                sequence.addChild(CreateTaskSequence(nodes[i]), { lineReturn });
            }
            return sequence;

        }

    } else {
        var nodeType = GetNodeType(node, TypeNames);
        if (nodeType === 'if') {
            var forceSuccess = new ForceSuccess();
            var ifDecorator = new If({
                expression: GetConditionExpression(node)
            })
            forceSuccess.addChild(ifDecorator);
            ifDecorator.addChild(CreateTaskSequence(node.children));
            return forceSuccess;
        } else {
            var sequence = new Sequence();
            sequence.setTitle(node.title);
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