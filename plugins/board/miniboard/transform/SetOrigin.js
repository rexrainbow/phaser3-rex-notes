import Linear from '../../../utils/math/Linear.js';
import OffsetTransfer from './transferfunctions/Offset.js';
import ResetChessTileXYZ from './ResetChessTileXYZ.js';

const SetOriginBase = Phaser.GameObjects.Components.Origin.setOrigin;

var SetOrigin = function (originX, originY) {
    switch (originX) {
        case 'center':
            originX = 0.5;
            originY = 0.5;
            break;
        case 'top-left':
        case 'left-top':
            originX = 0;
            originY = 0;
            break;
    }
    if (originX === undefined) {
        originX = 0.5;
    }
    if (originY === undefined) {
        originY = originX;
    }

    SetOriginBase.call(this, originX, originY);

    var bounds = this.getBounds(true);
    var offsetX = -Math.floor(Linear(bounds.left, bounds.right, originX));
    var offsetY = -Math.floor(Linear(bounds.top, bounds.bottom, originY));

    if ((offsetX !== 0) || (offsetY !== 0)) {
        var newTileXYZMap = OffsetTransfer.call(this, offsetX, offsetY);
        ResetChessTileXYZ.call(this, newTileXYZMap);
        var worldOffsetXY = this.board.tileXYToWorldXY(offsetX, offsetY);
        var world0 = this.board.tileXYToWorldXY(0, 0);
        this.setPosition(
            (this.x + (world0.x - worldOffsetXY.x)),
            (this.y + (world0.y - worldOffsetXY.y))
        );
    }

    return this;
}

export default SetOrigin;