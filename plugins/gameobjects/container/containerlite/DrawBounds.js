import {
    GetTopLeft,
    GetTopRight,
    GetBottomLeft,
    GetBottomRight,
} from '../../../utils/bounds/GetBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DrawBounds = function (graphics, config) {
    var color, drawContainer;
    if (typeof (config) === 'number') {
        color = config;
    } else {
        color = GetValue(config, 'color');
        drawContainer = GetValue(config, 'drawContainer');
    }

    if (color === undefined) {
        color = 0xffffff;
    }
    if (drawContainer === undefined) {
        drawContainer = true;
    }

    var children = this.getAllVisibleChildren([this]), child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (!drawContainer && child.isRexContainerLite) {
            continue;
        }

        if (child.getBounds ||
            ((child.width !== undefined) && (child.height !== undefined))
        ) {
            Points[0] = GetTopLeft(child, Points[0]);
            Points[1] = GetTopRight(child, Points[1]);
            Points[2] = GetBottomRight(child, Points[2]);
            Points[3] = GetBottomLeft(child, Points[3]);
        } else {
            continue;
        }

        graphics
            .lineStyle(1, color)
            .strokePoints(Points, true, true)

    }
    return this;
}

var Points = [undefined, undefined, undefined, undefined];

export default DrawBounds;