import AlignIn from '../../../../plugins/utils/actions/AlignIn';

var LayoutChild = function(child?: any, x?: any, y?: any, width?: any, height?: any, align?: any, offsetX?: any, offsetY?: any) {
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