import { Selector } from '../../../nodes';

var CreateSelectorNode = function (data, children) {
    /* 
    selector:
        children:
            - seqence
            - seqence
    */
    return new Selector({
        children
    });
}

export default CreateSelectorNode;