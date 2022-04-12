import { CanRender } from '../../bob/Types.js';

var OffsetChildren = function (children, offsetX, offsetY) {
    if ((offsetX === 0) && (offsetY === 0)) {
        return;
    }

    for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
        var child = children[ci];
        if (!CanRender(child)) {
            continue;
        }

        child.x += offsetX;
        child.y += offsetY;
    }
}

export default OffsetChildren;