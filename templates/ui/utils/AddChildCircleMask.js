import AddChildMask from '../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';

var AddChildCircleMask = function (parent, child) {
    return AddChildMask.call(parent, child, child, 1); // Circle mask
}

export default AddChildCircleMask;