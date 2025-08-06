import { If } from '../../../behaviortree/index.js';
var CreateIfDecorator = function (expression) {
    var ifDecorator;
    try {
        ifDecorator = new If({
            expression: expression
        });
    } catch (e) {
        console.error(`[EventSheet] Parse expression '${expression}' failed, replace expression by 'false'`);
        console.error(e);

        ifDecorator = new If({
            expression: 'false'
        });
    }

    return ifDecorator;
}

export default CreateIfDecorator;