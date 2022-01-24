import { Wait } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

var CreateWaitNode = function (data) {
    // wait: duration
    // wait: {duration}
    return new Wait({
        duration: (IsPlainObject(data)) ? data.duration : data,
    })
}

export default CreateWaitNode