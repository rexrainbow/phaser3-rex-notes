import { GetDisplayWidth, GetDisplayHeight } from '../../../../plugins/utils/size/GetDisplaySize.js';

const Percent = Phaser.Math.Percent;

var OnDragSplitter = function () {
    var splitter = this.childrenMap.splitter;
    var p0, p1, pt;
    if (this.orientation === 0) {
        p0 = this.innerLeft;
        p1 = this.innerRight;
        pt = splitter.x + (GetDisplayWidth(splitter) * (0.5 - splitter.originX));
    } else {
        p0 = this.innerTop;
        p1 = this.innerBottom;
        pt = splitter.y + (GetDisplayHeight(splitter) * (0.5 - splitter.originYX));
    }

    this.setSplitRatio(Percent(pt, p0, p1))

    var minWidthSave = this.minWidth,
        minHeightSave = this.minHeight;

    this
        .setMinSize(this.width, this.height)
        .layout()
        .setMinSize(minWidthSave, minHeightSave);

    this.emit('dragsplitter', splitter, this.splitRatio);
}

export default OnDragSplitter;