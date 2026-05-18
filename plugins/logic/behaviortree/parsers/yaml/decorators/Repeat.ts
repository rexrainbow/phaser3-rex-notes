import { Repeat } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject';

/*
```yaml
conditions:
    repeat:
    # repeat: 3
    # repeat: {maxLoop:3}
```
*/

var CreateRepeatNode = function(data?: any, child?: any) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            maxLoop: data,
            child: child
        }
    }
    return new Repeat(data);
}

export default CreateRepeatNode;