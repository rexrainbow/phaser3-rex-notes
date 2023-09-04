import {
    GetTopLeft, GetTopRight, GetBottomLeft, GetBottomRight,
    GetTopMiddle, GetBottomMiddle, GetMiddleLeft, GetMiddleRight,
} from '../../../../plugins/utils/bounds/GetBounds.js';
import UpdateBoundRectangle from './boundsrectangle/UpdateBoundRectangle.js';
import UpdateControlPoints from './controlpoints/UpdateControlPoints.js';
import { RotationPointAngle } from './Const.js';

const DegToRad = Phaser.Math.DegToRad;

var Layout = function () {
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
            rotation: {},
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

    var rotation = DegToRad(parent.angle + RotationPointAngle);
    GlobalPoints.rotation.x = parent.x + (30) * Math.cos(rotation);
    GlobalPoints.rotation.y = parent.y + (30) * Math.sin(rotation);

    return GlobalPoints;
}

var GlobalPoints;

export default Layout;