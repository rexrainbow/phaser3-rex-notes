import { ForceSuccess } from '../../../nodes';

/*
```yaml
decorators:
    force-true:
```
*/

var CreateForceSuccessNode = function (data, child) {
    return new ForceSuccess({
        child: child
    })
}

export default CreateForceSuccessNode;