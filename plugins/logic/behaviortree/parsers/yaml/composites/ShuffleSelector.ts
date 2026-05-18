import { ShuffleSelector } from '../../../nodes';

/*
```yaml
shuffle-selector:
    children:
        - sequence
        - sequence
```
*/

var CreateShuffleSelectorNode = function(data?: any) {
    return new ShuffleSelector(data);
}

export default CreateShuffleSelectorNode;