import { RepeatUntilSuccess } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
conditions:
    repeat-until-true:
    # repeat-until-true: 3
    # repeat-until-true: {maxLoop:3}
```
*/

var CreateRepeatUntilSuccessNode = function (data, child) {
    return new RepeatUntilSuccess({
        maxLoop: (IsPlainObject(data)) ? data.maxLoop : data,
        child: child
    })
}

export default CreateRepeatUntilSuccessNode;