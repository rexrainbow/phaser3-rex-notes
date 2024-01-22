import { GetDisplayWidth, GetDisplayHeight } from '../../../../plugins/utils/size/GetDisplaySize.js';

var OnDragSplitter = function () {
    var firstChild = this.sizerChildren[0];
    var splitter = this.sizerChildren[1];
    var secondChild = this.sizerChildren[2];

    var firstChildSizerPadding = this.getSizerConfig(firstChild).padding,
        splitterSizerPadding = this.getSizerConfig(splitter).padding,
        secondChildSizerPadding = this.getSizerConfig(secondChild).padding;

    if (this.orientation === 0) {
        var firstChildInnerLeft = this.innerLeft + firstChildSizerPadding.left;
        var secondChildInnerRight = this.innerRight - secondChildSizerPadding.right;

        var splitterWidth = GetDisplayWidth(splitter);
        var splitterLeft = splitter.x + (splitterWidth * (0 - splitter.originX));
        var splitterRight = splitter.x + (splitterWidth * (1 - splitter.originX));
        var firstChildInnerRight = splitterLeft - splitterSizerPadding.left - this.space.item - firstChildSizerPadding.right;
        var secondChildInnerLeft = splitterRight + splitterSizerPadding.right + this.space.item + secondChildSizerPadding.left;

        var firstChildInnerWidth = firstChildInnerRight - firstChildInnerLeft;
        var secondChildInnerWidth = secondChildInnerRight - secondChildInnerLeft;
        var totalChildrenInnerWidth = firstChildInnerWidth + secondChildInnerWidth;

        if ((this.minFirstChildSize > 0) && (firstChildInnerWidth < this.minFirstChildSize)) {
            firstChildInnerWidth = this.minFirstChildSize;
            secondChildInnerWidth = totalChildrenInnerWidth - firstChildInnerWidth;
        }

        if ((this.minSecondChildSize > 0) && (secondChildInnerWidth < this.minSecondChildSize)) {
            secondChildInnerWidth = this.minSecondChildSize;
            firstChildInnerWidth = totalChildrenInnerWidth - secondChildInnerWidth;
        }

        this.setSplitRatio(firstChildInnerWidth / totalChildrenInnerWidth);

    } else {
        var firstChildInnerTop = this.innerTop + firstChildSizerPadding.top;
        var secondChildInnerBottom = this.innerBottom - secondChildSizerPadding.bottom;

        var splitterHeight = GetDisplayHeight(splitter);
        var splitterTop = splitter.y + (splitterHeight * (0 - splitter.originY));
        var splitterBottom = splitter.y + (splitterHeight * (1 - splitter.originY));
        var firstChildInnerBottom = splitterTop - splitterSizerPadding.top - this.space.item - firstChildSizerPadding.bottom;
        var secondChildInnerTop = splitterBottom + splitterSizerPadding.bottom + this.space.item + secondChildSizerPadding.top;

        var firstChildInnerHeight = firstChildInnerBottom - firstChildInnerTop;
        var secondChildInnerHeight = secondChildInnerBottom - secondChildInnerTop;
        var totalChildrenInnerHeight = firstChildInnerHeight + secondChildInnerHeight;

        if ((this.minFirstChildSize > 0) && (firstChildInnerHeight < this.minFirstChildSize)) {
            firstChildInnerHeight = this.minFirstChildSize;
            secondChildInnerHeight = totalChildrenInnerHeight - firstChildInnerHeight;
        }

        if ((this.minSecondChildSize > 0) && (secondChildInnerHeight < this.minSecondChildSize)) {
            secondChildInnerHeight = this.minSecondChildSize;
            firstChildInnerHeight = totalChildrenInnerHeight - secondChildInnerHeight;
        }

        this.setSplitRatio(firstChildInnerHeight / totalChildrenInnerHeight);
    }

    var minWidthSave = this.minWidth,
        minHeightSave = this.minHeight;

    this
        .setMinSize(this.width, this.height)
        .layout()
        .setMinSize(minWidthSave, minHeightSave);
}

export default OnDragSplitter;