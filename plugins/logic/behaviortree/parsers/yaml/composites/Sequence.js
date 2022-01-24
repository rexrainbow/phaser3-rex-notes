import { Sequence } from '../../../nodes';

var CreateSelectorNode = function (data, children) {
    /* 
    sequence:
        children:
            - 
    */
    return new Sequence({
        children
    });
}

export default CreateSelectorNode;