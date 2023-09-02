import {
    GetTopLeft, GetTopRight, GetBottomLeft, GetBottomRight,
    GetTopMiddle, GetBottomMiddle, GetMiddleLeft, GetMiddleRight,
} from '../../../../plugins/utils/bounds/GetBounds.js';
import { UpdateBoundRectangle } from './BoundsRectangleMethods.js';
import { UpdateControlPoints } from './ControlPointMethods.js';

var UpdateChildren = function () {
    var points = GetCornerPoints(this);
    UpdateBoundRectangle(this, points);
    UpdateControlPoints(this, points);

    return this;
}

var GetCornerPoints = function (parent) {
    if (GlobalPoints === undefined) {
        GlobalPoints = {
            topLeft: {},
            topRight: {},
            bottomLeft: {},
            bottomRight: {},
            topMiddle: {},
            bottomMiddle: {},
            middleLeft: {},
            middleRight: {},
            origin: {},
        }
    }

    GetTopLeft(parent, GlobalPoints.topLeft);
    GetTopRight(parent, GlobalPoints.topRight);
    GetBottomLeft(parent, GlobalPoints.bottomLeft);
    GetBottomRight(parent, GlobalPoints.bottomRight);

    GetTopMiddle(parent, GlobalPoints.topMiddle);
    GetBottomMiddle(parent, GlobalPoints.bottomMiddle);
    GetMiddleLeft(parent, GlobalPoints.middleLeft);
    GetMiddleRight(parent, GlobalPoints.middleRight);

    GlobalPoints.origin.x = parent.x;
    GlobalPoints.origin.y = parent.y;

    return GlobalPoints;
}

var GlobalPoints;

export default UpdateChildren;