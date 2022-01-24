import { If } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

var CreateIfNode = function (data, child) {
    // if: expression
    // if: {expression}
    return new If({
        expression: (IsPlainObject(data)) ? data.expression : data,
        child: child
    })
}

export default CreateIfNode;