import { RandomSelector } from '../../../nodes';

var CreateRandomSelectorNode = function (data, children) {
    /* 
    random-selector:
        children:
            - sequence
            - sequence
    */
    return new RandomSelector({
        children
    });
}

export default CreateRandomSelectorNode;