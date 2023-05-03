import { Sequence } from '../../nodes';
import TypeConvert from '../../../../utils/string/TypeConvert';
import TaskAction from './TaskAction.js';

var CreateTaskSequence = function (node, taskHandlers) {
    var sequence = new Sequence();
    if (Array.isArray(node)) {
        var nodes = node;
        for (var i = 0, cnt = nodes.length; i < cnt; i++) {
            sequence.addChild(CreateTaskSequence(nodes[i]));
        }
    } else {
        sequence.setTitle(node.title);
        var paragraphs = node.paragraphs;
        for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
            var taskData = GetTaskData(paragraphs[i]);
            var taskAction = new TaskAction(taskData, taskHandlers);
            sequence.addChild(taskAction);
        }
    }

    return sequence;
}

var GetTaskData = function (paragraph) {
    if (paragraph.hasOwnProperty('block')) {
        return GetStringBlockData(paragraph);
    }

    var lines = paragraph.text.split('\n');
    taskData = {
        name: lines[0],
        parameters: {}
    };

    var parameters = taskData.parameters;
    for (var i = 1, cnt = lines.length; i < cnt; i++) {
        var [name, expression] = lines[i].split('=');
        parameters[name] = TypeConvert(expression);
    }

    return taskData;
}

var GetStringBlockData = function (paragraph) {
    return {
        name: paragraph.block,
        parameters: {
            text: paragraph.text
        }
    }
}

export default CreateTaskSequence;