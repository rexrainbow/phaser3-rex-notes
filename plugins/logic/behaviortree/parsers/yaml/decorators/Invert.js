import { Invert } from '../../../nodes';

/*
```yaml
conditions:
    invert: 
```
*/

var CreateInvertNode = function (data, child) {
    return new Invert({
        child: child
    })
}

export default CreateInvertNode;