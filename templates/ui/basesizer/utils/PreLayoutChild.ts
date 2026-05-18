import CopyState from '../../utils/CopyState';

var PreLayoutChild = function(child?: any) {
    if (this.sizerEventsEnable) {
        CopyState(child, this.getChildPrevState(child));
        this.layoutedChildren.push(child);
    }
}

export default PreLayoutChild;