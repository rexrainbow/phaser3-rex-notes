import { Abort, Failer } from '../../../behaviortree/index';
import { ActionCommandTypes } from './BuiltInCommandTypes';
import ParseType from './ParseType';
import ParseProperty from './ParseProperty';
import TaskAction from '../../eventsheetmanager/nodes/taskaction/TaskAction';
import ActivateAction from '../../eventsheetmanager/nodes/ActivateAction';
import DeactivateAction from '../../eventsheetmanager/nodes/DeactivateAction';

var CreateActionNode = function(paragraph?: any, config?: any) {
    var commandData = GetCommandData(paragraph, config);
    if (!commandData) {
        return;
    }

    var actionNode;
    switch (commandData.type) {
        case 'exit':
            actionNode = new Abort({ title: '[exit]' });
            break;

        case 'break':
            actionNode = new Failer({ title: '[break]' });
            break;

        case 'activate':
            var activateTreeTitle = commandData.match[1].trim();
            actionNode = new ActivateAction({
                title: '[activate]',
                activateTreeTitle: activateTreeTitle,
            });
            break;

        case 'deactivate':
            var deactivateTreeTitle = commandData.match[1].trim();
            actionNode = new DeactivateAction({
                title: '[deactivate]',
                deactivateTreeTitle: deactivateTreeTitle,
            });
            break;

        default:
            delete commandData.type;
            actionNode = new TaskAction(commandData);
            break;
    }

    return actionNode;
}

var GetCommandData = function(paragraph?: any, config?: any) {
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
        lines = lines.filter(function(line?: any) {
            return !line.trimLeft().startsWith(commentLineStart);
        })

        if (lines.length === 0) {
            return null;
        } else if (lines.length === 1) {
            var line = lines[0];

            var result = ParseType(line, ActionCommandTypes);
            if (result?: any) {
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

var TrimString = function(s?: any, lineBreak?: any) {
    if (lineBreak && (s.at(-1) === lineBreak)) {
        s = s.substring(0, s.length - 1);
    }
    return s.trim();
}
export default CreateActionNode;