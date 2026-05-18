import { AbortIf } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject';

/*
```yaml
conditions:
    abort-if: A > 10
    # abort-if: {expression:'A > 10', returnSuccess:true}
```
*/

var CreateAbortIfNode = function(data?: any, child?: any) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            expression: data,
            child: child
        }
    }
    return new AbortIf(data);
}

export default CreateAbortIfNode;