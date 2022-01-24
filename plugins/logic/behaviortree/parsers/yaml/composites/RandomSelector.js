import { RandomSelector } from '../../../nodes';

var CreateRandomSelectorNode = function (data, children) {
    /* 
    random-selector:
        children:
            - 
    */
    return new RandomSelector({
        children
    });
}

export default CreateRandomSelectorNode;