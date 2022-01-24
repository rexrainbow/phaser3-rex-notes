import { Wait } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

var CreateWaitNode = function (data) {
    // wait: 1000
    // wait: {duration:1000}
    return new Wait({
        duration: (IsPlainObject(data)) ? data.duration : data,
    })
}

export default CreateWaitNode