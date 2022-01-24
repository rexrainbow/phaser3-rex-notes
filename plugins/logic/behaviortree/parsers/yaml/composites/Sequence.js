import { Sequence } from '../../../nodes';

var CreateSelectorNode = function (data, children) {
    /* 
    sequence:
        children:
            - sequence
            - sequence
    */
    return new Sequence({
        children
    });
}

export default CreateSelectorNode;