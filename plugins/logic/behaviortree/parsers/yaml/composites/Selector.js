import { Selector } from '../../../nodes';

var CreateSelectorNode = function (data, children) {
    return new Selector({
        children
    });
}

export default CreateSelectorNode;