import { RandomSelector } from '../../../nodes/index.js';

/*
```yaml
random-selector:
    children:
        - sequence
        - sequence
```
*/

var CreateRandomSelectorNode = function (data) {
    return new RandomSelector(data);
}

export default CreateRandomSelectorNode;