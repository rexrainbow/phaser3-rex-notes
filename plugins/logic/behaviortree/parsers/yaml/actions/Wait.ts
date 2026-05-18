import { Wait } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject';

/*
sequence:
    - wait: 1000
    # - wait: {duration:1000}
*/

var CreateWaitNode = function(data?: any) {
    return new Wait({
        duration: (IsPlainObject(data)) ? data.duration : data,
    })
}

export default CreateWaitNode