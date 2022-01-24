import { Repeat } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

var CreateRepeatNode = function (data, child) {
    // repeat: 3
    // repeat: {maxLoop:3}
    return new Repeat({
        maxLoop: (IsPlainObject(data)) ? data.maxLoop : data,
        child: child
    })
}

export default CreateRepeatNode;