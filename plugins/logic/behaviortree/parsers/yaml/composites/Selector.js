import { Selector } from '../../../nodes';

var CreateSelectorNode = function (data, children) {
    /* 
    selector:
        children:
            - 
    */
    return new Selector({
        children
    });
}

export default CreateSelectorNode;