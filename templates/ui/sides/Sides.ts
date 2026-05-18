import OverlapSizer from '../overlapsizer/OverlapSizer';
import IsFunction from '../../../plugins/utils/object/IsFunction';
import GetDefaultCallbacks from './defaultcallbacks/GetDefaultCallbacks';
import ShowChildMethods from './ShowChildMethods';
import ChildBehaviorMethods from './childbehaviors/index';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Sides extends OverlapSizer {
    add: any;
    addBackground: any;
    childrenMap: any;
    currentChildKey: any;
    hideChild: any;
    on: any;
    previousChildKey: any;
    showChild: any;
    sizerChildren: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSides';
        this.childrenMap = this.sizerChildren;
        this.previousChildKey = undefined;
        this.currentChildKey = undefined;

        // Callbacks
        var showChildCallback = GetValue(config, 'showChildCallback', undefined);
        if (showChildCallback?: any) { // Has showChildCallback, and hideChildCallback
            if (IsFunction(showChildCallback)) { // Custom callbacks
                var showChildCallbackScope = GetValue(config, 'showChildCallbackScope', undefined);
                this.on('showchild', showChildCallback, showChildCallbackScope);

                var hideChildCallback = GetValue(config, 'hideChildCallback', undefined);
                var hideChildCallbackScope = GetValue(config, 'hideChildCallbackScope', undefined);
                this.on('hidechild', hideChildCallback, hideChildCallbackScope);
            } else { // Default callbacks
                var defaultCallbacks = GetDefaultCallbacks(showChildCallback);
                this.on('showchild', defaultCallbacks.show);
                this.on('hidechild', defaultCallbacks.hide);
            }
        }

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftSide = GetValue(config, 'leftSide', undefined);
        var rightSide = GetValue(config, 'rightSide', undefined);
        var topSide = GetValue(config, 'topSide', undefined);
        var bottomSide = GetValue(config, 'bottomSide', undefined);

        if (background?: any) {
            this.addBackground(background);
        }
        if (panel?: any) {
            this.add(panel, 'panel', 'center', 0, true);
        }
        if (leftSide?: any) {
            var expand = GetValue(config, 'expand.left', true);
            this.add(leftSide, 'leftSide', 'left-top', 0, { height: expand });
        }
        if (rightSide?: any) {
            var expand = GetValue(config, 'expand.right', true);
            this.add(rightSide, 'rightSide', 'right-top', 0, { height: expand });
        }
        if (topSide?: any) {
            var expand = GetValue(config, 'expand.top', true);
            this.add(topSide, 'topSide', 'left-top', 0, { width: expand });
        }
        if (bottomSide?: any) {
            var expand = GetValue(config, 'expand.bottom', true);
            this.add(bottomSide, 'bottomSide', 'left-bottom', 0, { width: expand });
        }
    }

    reset() {
        this.previousChildKey = undefined;
        this.currentChildKey = 'panel';
        this.showChild('panel', true);
        this.hideChild('leftSide', true);
        this.hideChild('rightSide', true);
        this.hideChild('topSide', true);
        this.hideChild('bottomSide', true);
        return this;
    }
}

Object.assign(
    Sides.prototype,
    ShowChildMethods,
    ChildBehaviorMethods
);

export default Sides;