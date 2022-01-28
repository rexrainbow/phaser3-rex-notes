import { ContinueIf } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    continue-if: A > 10
    # abort-if: {expression:'A > 10'}
```
*/

var CreateContinueIfNode = function (data, child) {
    return new ContinueIf({
        expression: (IsPlainObject(data)) ? data.expression : data,
        child: child
    })
}

export default CreateContinueIfNode;