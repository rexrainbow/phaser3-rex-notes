import { Sequence } from '../../../nodes/index.js';

/*
```yaml
sequence:
    children:
        - sequence
        - sequence
```
*/

var CreateSequenceNode = function (data) {
    return new Sequence(data);
}

export default CreateSequenceNode;