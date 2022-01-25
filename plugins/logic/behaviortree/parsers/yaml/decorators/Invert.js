import { Invert } from '../../../nodes';

/*
```yaml
decorators:
    invert: 
```
*/

var CreateInvertNode = function (data, child) {
    return new Invert({
        child: child
    })
}

export default CreateInvertNode;