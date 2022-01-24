import { Invert } from '../../../nodes';

var CreateInvertNode = function (data, child) {
    // invert: 
    return new Invert({
        child: child
    })
}

export default CreateInvertNode;