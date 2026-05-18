import { RandomSelector } from '../../../nodes';

/*
```yaml
random-selector:
    children:
        - sequence
        - sequence
```
*/

var CreateRandomSelectorNode = function(data?: any) {
    return new RandomSelector(data);
}

export default CreateRandomSelectorNode;