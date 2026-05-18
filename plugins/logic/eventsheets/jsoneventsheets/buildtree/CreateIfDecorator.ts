import { If, SUCCESS, FAILURE } from '../../../behaviortree/index';

var CreateIfDecorator = function(expression?: any, onConditionFailValue?: any) {
    var onFailState = (onConditionFailValue) ? SUCCESS : FAILURE;
    var ifDecorator;
    try {
        ifDecorator = new If({
            expression: expression,
            onFailState: onFailState,
        });
    } catch (e) {
        console.error(`[EventSheet] Parse expression '${expression}' failed, replace expression by 'false'`);
        console.error(e);

        ifDecorator = new If({
            expression: 'false',
            onFailState: onFailState,
        });
    }

    return ifDecorator;
}

export default CreateIfDecorator;