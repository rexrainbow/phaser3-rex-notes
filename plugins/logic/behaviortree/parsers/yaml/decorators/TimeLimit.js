import { TimeLimit } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

var CreateTimeLimitNode = function (data, child) {
    // time-limit: 1000
    // time-limit: {duration:1000}
    return new TimeLimit({
        duration: (IsPlainObject(data)) ? data.duration : data,
        child: child
    })
}

export default CreateTimeLimitNode;