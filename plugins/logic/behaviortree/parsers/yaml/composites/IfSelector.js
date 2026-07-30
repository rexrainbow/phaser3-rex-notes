import { IfSelector } from '../../../nodes/index.js';

/*
```yaml
if-selector:
    condition: A > 10
    children:
        - seqence
        - seqence
```
*/

var CreateIfSelectorNode = function (data) {
    return new IfSelector(data);
}

export default CreateIfSelectorNode;