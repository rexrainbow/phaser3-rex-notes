import { RepeatUntilSuccess } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject';

/*
```yaml
conditions:
    repeat-until-true:
    # repeat-until-true: 3
    # repeat-until-true: {maxLoop:3}
```
*/

var CreateRepeatUntilSuccessNode = function(data?: any, child?: any) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            maxLoop: data,
            child: child
        }
    }
    return new RepeatUntilSuccess(data)
}

export default CreateRepeatUntilSuccessNode;