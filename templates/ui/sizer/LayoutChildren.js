import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import PreLayoutChild from '../basesizer/utils/PreLayoutChild.js';
import LayoutChild from '../basesizer/utils/LayoutChild.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';
import CheckSize from '../basesizer/utils/CheckSize.js';

const Wrap = Phaser.Math.Wrap;

var LayoutChildren = function () {
    var children = this.sizerChildren;
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth;
    var innerHeight = this.innerHeight;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height, alignOffsetX, alignOffsetY; // Align zone
    var childWidth, childHeight;
    var childIndex, startChildIndex = this.startChildIndex;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        if (startChildIndex === 0) {
            childIndex = i;
        } else {
            childIndex = Wrap((i + startChildIndex), 0, cnt);
        }

        if (this.rtl) {
            childIndex = cnt - childIndex - 1;
        }

        child = children[childIndex];
        if (child.rexSizer.hidden) {
            continue;
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;

        PreLayoutChild.call(this, child);

        // Set size
        if (child.isRexSpace) {
            childWidth = 0;
            childHeight = 0;
        } else {
            childWidth = this.getExpandedChildWidth(child);
            childHeight = this.getExpandedChildHeight(child);
        }
        if (child.isRexSizer) {
            child.runLayout(this, childWidth, childHeight);
            CheckSize(child, this);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        if (childWidth === undefined) {
            childWidth = GetDisplayWidth(child);
        }
        if (childHeight === undefined) {
            childHeight = GetDisplayHeight(child);
        }

        // Set position
        if (this.orientation === 0) { // x
            x = itemX + (padding.left * this.scaleX);
            if ((childConfig.proportion === 0) || (this.proportionLength === 0)) {
                width = childWidth;
            } else {
                width = (childConfig.proportion * this.proportionLength);
            }

            y = itemY + (padding.top * this.scaleY);
            height = innerHeight - ((padding.top + padding.bottom) * this.scaleY);
        } else { // y
            x = itemX + (padding.left * this.scaleX);
            width = innerWidth - ((padding.left + padding.right) * this.scaleX);

            y = itemY + (padding.top * this.scaleY);
            if ((childConfig.proportion === 0) || (this.proportionLength === 0)) {
                height = childHeight;
            } else {
                height = (childConfig.proportion * this.proportionLength);
            }
        }

        if (childWidth === undefined) {
            childWidth = GetDisplayWidth(child);
        }
        if (childHeight === undefined) {
            childHeight = GetDisplayHeight(child);
        }
        alignOffsetX = (childConfig.alignOffsetX + (childConfig.alignOffsetOriginX * childWidth)) * this.scaleX;
        alignOffsetY = (childConfig.alignOffsetY + (childConfig.alignOffsetOriginY * childHeight)) * this.scaleY;

        LayoutChild.call(this,
            child, x, y, width, height, childConfig.align,
            alignOffsetX, alignOffsetY
        );

        if (this.orientation === 0) { // x
            itemX += (width + ((padding.left + padding.right) * this.scaleX) + (this.space.item * this.scaleX));
        } else { // y
            itemY += (height + ((padding.top + padding.bottom) * this.scaleY) + (this.space.item * this.scaleY));
        }
    }

}

export default LayoutChildren;