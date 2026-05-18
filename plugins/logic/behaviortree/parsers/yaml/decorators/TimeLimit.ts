import { TimeLimit } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject';

/*
```yaml
conditions:
    time-limit: 1000
    # time-limit: {duration:1000, returnSuccess:true}
```
*/

var CreateTimeLimitNode = function(data?: any, child?: any) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            duration: data,
            child: child
        }
    }
    return new TimeLimit(data);
}

export default CreateTimeLimitNode;