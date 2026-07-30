import CopyState from '../../utils/CopyState.js';

var PreLayoutChild = function (child) {
    if (this.sizerEventsEnable) {
        CopyState(child, this.getChildPrevState(child));
        this.layoutedChildren.push(child);
    }
}

export default PreLayoutChild;