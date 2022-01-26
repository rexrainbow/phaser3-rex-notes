import { ForceSuccess } from '../../../nodes';

/*
```yaml
conditions:
    force-true:
```
*/

var CreateForceSuccessNode = function (data, child) {
    return new ForceSuccess({
        child: child
    })
}

export default CreateForceSuccessNode;