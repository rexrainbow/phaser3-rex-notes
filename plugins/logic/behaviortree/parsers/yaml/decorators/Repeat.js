import { Repeat } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

var CreateRepeatNode = function (data, child) {
    // repeat: maxLoop
    // repeat: {maxLoop}
    return new Repeat({
        maxLoop: (IsPlainObject(data)) ? data.maxLoop : data,
        child: child
    })
}

export default CreateRepeatNode;