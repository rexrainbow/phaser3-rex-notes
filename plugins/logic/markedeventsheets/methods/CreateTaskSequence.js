import { Sequence } from '../../behaviortree';
import TypeConvert from '../../../utils/string/TypeConvert.js';
import TaskAction from './TaskAction.js';

var CreateTaskSequence = function (node) {
    if (Array.isArray(node)) {
        var nodes = node;
        if (nodes.length === 1) {
            return CreateTaskSequence(nodes[0]);

        } else {
            var sequence = new Sequence({ title: 'tags' });
            for (var i = 0, cnt = nodes.length; i < cnt; i++) {
                sequence.addChild(CreateTaskSequence(nodes[i]));
            }
            return sequence;

        }

    } else {
        var sequence = new Sequence();
        sequence.setTitle(node.title);
        var paragraphs = node.paragraphs;
        for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
            var taskData = GetTaskData(paragraphs[i]);
            var taskAction = new TaskAction(taskData);
            sequence.addChild(taskAction);
        }
        return sequence;
    }
}

var GetTaskData = function (paragraph) {
    var taskData;
    if (paragraph.hasOwnProperty('block')) {
        taskData = ParseCommandString(paragraph.block, ',');
        taskData.parameters.text = paragraph.text;
    } else {
        taskData = ParseCommandString(paragraph.text, '\n');
    }

    return taskData
}

var ParseCommandString = function (commandString, delimiter) {
    var lines = commandString.split(delimiter);
    var taskData = {
        name: lines[0],
        parameters: {}
    };
    var parameters = taskData.parameters;
    for (var i = 1, cnt = lines.length; i < cnt; i++) {
        var [name, expression] = lines[i].trimLeft().split('=');
        parameters[name] = TypeConvert(expression);
    }
    return taskData;
}

export default CreateTaskSequence;