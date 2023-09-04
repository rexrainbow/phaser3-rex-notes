import {
    TopLeft, TopRight, BottomLeft, BottomRight,
    TopMiddle, BottomMiddle, MiddleLeft, MiddleRight,
    Origin, Rotation,
} from '../Const.js';

const CornerPointsData = [
    { name: TopLeft, originX: 0, originY: 0 },
    { name: TopRight, originX: 1, originY: 0 },
    { name: BottomRight, originX: 1, originY: 1 },
    { name: BottomLeft, originX: 0, originY: 1 },

    { name: TopMiddle, originX: 0.5, originY: 0 },
    { name: BottomMiddle, originX: 0.5, originY: 1 },
    { name: MiddleLeft, originX: 0, originY: 0.5 },
    { name: MiddleRight, originX: 1, originY: 0.5 },
]

var UpdateControlPoints = function (parent) {
    var childrenMap = parent.childrenMap;

    var width = parent.width,
        height = parent.height,
        originX = parent.originX,
        originY = parent.originY;
    var localX, localY;
    for (var i = 0, cnt = CornerPointsData.length; i < cnt; i++) {
        var pointData = CornerPointsData[i];
        localX = (pointData.originX - originX) * width;
        localY = (pointData.originY - originY) * height;
        parent.setChildLocalPosition(childrenMap[pointData.name], localX, localY);
    }

    parent.setChildLocalPosition(childrenMap[Origin], 0, 0);

    parent.setChildLocalPosition(childrenMap[Rotation], ((1 - originX) * width) + 40, 0);
}

export default UpdateControlPoints