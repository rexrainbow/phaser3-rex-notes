import { TimeLimit } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

// time-limit: 1000
// time-limit: {duration:1000}
/*
conditions:
    time-limit: 1000
*/
var CreateTimeLimitNode = function (data, child) {
    return new TimeLimit({
        duration: (IsPlainObject(data)) ? data.duration : data,
        child: child
    })
}

export default CreateTimeLimitNode;