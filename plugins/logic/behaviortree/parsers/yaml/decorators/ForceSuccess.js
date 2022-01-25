import { ForceSuccess } from '../../../nodes';

/*
```yaml
decorators:
    force-true:
```
or
```yaml
force-success: 
force-true:
```
*/

var CreateForceSuccessNode = function (data, child) {
    return new ForceSuccess({
        child: child
    })
}

export default CreateForceSuccessNode;