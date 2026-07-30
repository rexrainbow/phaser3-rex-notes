import { ShuffleSelector } from '../../../nodes/index.js';

/*
```yaml
shuffle-selector:
    children:
        - sequence
        - sequence
```
*/

var CreateShuffleSelectorNode = function (data) {
    return new ShuffleSelector(data);
}

export default CreateShuffleSelectorNode;