import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import ShowChildMethods from './ShowChildMethods.js';
import ChildBehaviorMethods from './ChildBehaviorMethods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Sides extends OverlapSizer {
    constructor(scene, x, y, minWidth, minHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        }
        super(scene, x, y, minWidth, minHeight, config);
        this.type = 'rexSides';
        this.childrenMap = this.sizerChildren;
        this.currentChildKey = undefined;

        // Callbacks
        var showChildCallback = GetValue(config, 'showChildCallback', undefined);
        var showChildCallbackScope = GetValue(config, 'showChildCallbackScope', undefined);
        var hideChildCallback = GetValue(config, 'hideChildCallback', undefined);
        var hideChildCallbackScope = GetValue(config, 'hideChildCallbackScope', undefined);
        if (showChildCallback) {
            this.on('showchild', showChildCallback, showChildCallbackScope);
        }
        if (hideChildCallback) {
            this.on('hidechild', hideChildCallback, hideChildCallbackScope);
        }

        // Add elements        
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftSide = GetValue(config, 'left', undefined);
        var rightSide = GetValue(config, 'right', undefined);
        var topSide = GetValue(config, 'top', undefined);
        var bottomSide = GetValue(config, 'bottom', undefined);
        // Mask all children
        var maskEnable = GetValue(config, 'mask', false);

        if (background) {
            this.addBackground(background);
        }
        if (panel) {
            this.add(panel, 'panel', 'center', 0, true);
            this.showChild('panel');
            this.currentChildKey = 'panel';
        }
        if (leftSide) {
            var expand = GetValue(config, 'expand.left', true);
            this.add(leftSide, 'leftSide', 'left-top', 0, { height: expand });
            this.hideChild('leftSide');
        }
        if (rightSide) {
            var expand = GetValue(config, 'expand.right', true);
            this.add(rightSide, 'rightSide', 'right-top', 0, { height: expand });
            this.hideChild('rightSide');
        }
        if (topSide) {
            var expand = GetValue(config, 'expand.top', true);
            this.add(topSide, 'topSide', 'left-top', 0, { width: expand });
            this.hideChild('topSide');
        }
        if (bottomSide) {
            var expand = GetValue(config, 'expand.bottom', true);
            this.add(bottomSide, 'bottomSide', 'left-bottom', 0, { width: expand });
            this.hideChild('bottomSide');
        }

        // Create mask of text object
        if (maskEnable) {
            this.childrenMask = new DefaultMask(this);
            var mask = this.childrenMask.createGeometryMask();
            if (panel) {
                panel.setMask(mask);
            }
            if (leftSide) {
                leftSide.setMask(mask);
            }
            if (rightSide) {
                rightSide.setMask(mask);
            }
            if (topSide) {
                topSide.setMask(mask);
            }
            if (bottomSide) {
                bottomSide.setMask(mask);
            }
            this.pin(this.childrenMask);
        }
    }
}

Object.assign(
    Sides.prototype,
    ShowChildMethods,
    ChildBehaviorMethods
);

export default Sides;