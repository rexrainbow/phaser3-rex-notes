import { ForceSuccess } from '../../../nodes';

var CreateForceSuccessNode = function (data, child) {
    // force-success: 
    // force-true
    return new ForceSuccess({
        child: child
    })
}

export default CreateForceSuccessNode;