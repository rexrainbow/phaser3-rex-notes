import { If } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    if: A > 10
    # if: {expression:'A > 10'}
```
*/

var CreateIfNode = function (data, child) {
    return new If({
        expression: (IsPlainObject(data)) ? data.expression : data,
        child: child
    })
}

export default CreateIfNode;