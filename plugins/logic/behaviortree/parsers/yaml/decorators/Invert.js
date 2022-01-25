import { Invert } from '../../../nodes';

/*
```yaml
decorators:
    invert: 
```
or
```yaml
invert: 
```
*/

var CreateInvertNode = function (data, child) {
    return new Invert({
        child: child
    })
}

export default CreateInvertNode;