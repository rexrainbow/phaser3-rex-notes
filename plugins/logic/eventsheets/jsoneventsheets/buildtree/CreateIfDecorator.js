import { SUCCESS, FAILURE } from '../../../behaviortree/index.js';
import EventSheetIf from '../../eventsheetmanager/nodes/condition/EventSheetIf.js';

var CreateIfDecorator = function (expression, onConditionFailValue) {
    var onFailState = (onConditionFailValue) ? SUCCESS : FAILURE;
    var ifDecorator;
    try {
        ifDecorator = new EventSheetIf({
            condition: expression,
            onFailState: onFailState,
        });
    } catch (e) {
        console.error(`[EventSheet] Parse expression '${expression}' failed, replace expression by 'false'`);
        console.error(e);

        ifDecorator = new EventSheetIf({
            condition: 'false',
            onFailState: onFailState,
        });
    }

    return ifDecorator;
}

export default CreateIfDecorator;
