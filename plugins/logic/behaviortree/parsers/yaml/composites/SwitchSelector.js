import { SwitchSelector } from '../../../nodes/index.js';

/*
```yaml
switch-selector:
    condition: key
    children:
        A: seqence
        B: seqence
```
*/

var CreateSwitchSelectorNode = function (data) {
    return new SwitchSelector(data);
}

export default CreateSwitchSelectorNode;