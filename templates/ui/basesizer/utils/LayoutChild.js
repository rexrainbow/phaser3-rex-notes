import AlignIn from '../../../../plugins/utils/actions/AlignIn.js';

var LayoutChild = function (child, x, y, width, height, align) {
    AlignIn(child, x, y, width, height, align);

    if (this.sizerEventsEnable) {
        child.emit('sizer.layout', child, this);
    }

    this.resetChildPositionState(child);

    if (this.sizerEventsEnable) {
        child.emit('sizer.postlayout', child, this);
    }
}

export default LayoutChild;