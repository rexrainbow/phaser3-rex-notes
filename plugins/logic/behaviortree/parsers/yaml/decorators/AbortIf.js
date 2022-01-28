import { AbortIf } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    abort-if: A > 10
    # abort-if: {expression:'A > 10'}
```
*/

var CreateAbortIfNode = function (data, child) {
    return new AbortIf({
        expression: (IsPlainObject(data)) ? data.expression : data,
        child: child
    })
}

export default CreateAbortIfNode;