import { If } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

var CreateIfNode = function (data, child) {
    // if: true
    // if: {expression:'true'}
    return new If({
        expression: (IsPlainObject(data)) ? data.expression : data,
        child: child
    })
}

export default CreateIfNode;