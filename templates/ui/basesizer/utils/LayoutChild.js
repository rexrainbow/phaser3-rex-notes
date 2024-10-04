import AlignIn from '../../../../plugins/utils/actions/AlignIn.js';

var LayoutChild = function (child, x, y, width, height, align, offsetX, offsetY) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    AlignIn(child, x, y, width, height, align);

    child.x += offsetX;
    child.y += offsetY;

    this.resetChildPositionState(child);

    if (this.sizerEventsEnable) {
        child.emit('sizer.postlayout', child, this);
    }
}

export default LayoutChild;