import { Selector } from '../../../nodes/index.js';

/*
```yaml
selector:
    children:
        - sequence
        - sequence
```
*/

var CreateSelectorNode = function (data) {
    return new Selector(data);
}

export default CreateSelectorNode;