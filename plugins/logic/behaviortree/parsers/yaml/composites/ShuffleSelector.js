import { ShuffleSelector } from '../../../nodes';

var CreateShuffleSelectorNode = function (data, children) {
    /* 
    shuffle-selector:
        children:
            - 
    */
    return new ShuffleSelector({
        children
    });
}

export default CreateShuffleSelectorNode;