import { AbortIf } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    abort-if: A > 10
    # abort-if: {condition:'A > 10', returnSuccess:true}
```
*/

var CreateAbortIfNode = function (data, child) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            condition: data,
            child: child
        }
    }
    return new AbortIf(data);
}

export default CreateAbortIfNode;