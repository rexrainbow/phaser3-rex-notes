import { Sequence } from '../../../behaviortree';
import TypeConvert from '../../../../utils/string/TypeConvert.js';
import TaskAction from '../../eventsheettrees/TaskAction.js';

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
        var sequence = new Sequence();
        sequence.setTitle(node.title);
        var paragraphs = node.paragraphs;
        for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
            var taskData = GetTaskData(paragraphs[i], { lineReturn });
            var taskAction = new TaskAction(taskData);
            sequence.addChild(taskAction);
        }
        return sequence;
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
        var [name, expression] = TrimString(lines[i], lineReturn).split('=');
        parameters[name] = TypeConvert(expression);
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