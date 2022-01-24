import { Sequence } from '../../../nodes';

var CreateSelectorNode = function (data, children) {
    return new Sequence({
        children
    });
}

export default CreateSelectorNode;