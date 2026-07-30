import { Invert } from '../../../nodes/index.js';

/*
```yaml
conditions:
    invert: 
```
*/

var CreateInvertNode = function (data, child) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            child: child
        }
    }
    return new Invert(data);
}

export default CreateInvertNode;