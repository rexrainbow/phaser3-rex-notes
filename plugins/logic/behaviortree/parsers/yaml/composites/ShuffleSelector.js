import { ShuffleSelector } from '../../../nodes';

var CreateShuffleSelectorNode = function (data, children) {
    /* 
    shuffle-selector:
        children:
            - sequence
            - sequence
    */
    return new ShuffleSelector({
        children
    });
}

export default CreateShuffleSelectorNode;