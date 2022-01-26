import { RepeatUntilFailure } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
decorators:
    repeat-until-false:
    # repeat-until-false: 3
    # repeat-until-false: {maxLoop:3}
```
*/

var CreateRepeatUntilFailureNode = function (data, child) {
    return new RepeatUntilFailure({
        maxLoop: (IsPlainObject(data)) ? data.maxLoop : data,
        child: child
    })
}

export default CreateRepeatUntilFailureNode;