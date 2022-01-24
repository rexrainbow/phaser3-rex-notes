import { ForceSuccess } from '../../../nodes';

// force-success: 
// force-true:
/*
conditions:
    force-true:
*/
var CreateForceSuccessNode = function (data, child) {
    return new ForceSuccess({
        child: child
    })
}

export default CreateForceSuccessNode;