import { If, SUCCESS, FAILURE } from '../../../behaviortree/index.js';

var CreateIfDecorator = function (expression, onConditionFailValue) {
    var onFailState = (onConditionFailValue) ? SUCCESS : FAILURE;
    var ifDecorator;
    try {
        ifDecorator = new If({
            condition: expression,
            onFailState: onFailState,
        });
    } catch (e) {
        console.error(`[EventSheet] Parse expression '${expression}' failed, replace expression by 'false'`);
        console.error(e);

        ifDecorator = new If({
            condition: 'false',
            onFailState: onFailState,
        });
    }

    return ifDecorator;
}

export default CreateIfDecorator;