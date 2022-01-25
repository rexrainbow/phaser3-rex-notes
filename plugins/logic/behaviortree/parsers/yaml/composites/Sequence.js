import { Sequence } from '../../../nodes';

/*
```yaml
sequence:
    children:
        - sequence
        - sequence
```
*/

var CreateSelectorNode = function (data) {
    return new Sequence(data);
}

export default CreateSelectorNode;