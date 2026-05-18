import { Cooldown } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject';

/*
```yaml
conditions:
    cooldown: 1000
    # cooldown: {duration:1000}
```
*/

var CreateCooldownNode = function(data?: any, child?: any) {
    if (IsPlainObject(data)) {
        data.child = child;
    } else {
        data = {
            duration: data,
            child: child
        }
    }
    return new Cooldown(data);
}

export default CreateCooldownNode;