import Container from '../container/Container.js';
import Anchor from '../../../plugins/behaviors/anchor/Anchor.js';
import GetSizerConfig from '../utils/GetSizerConfig.js';
import PushIntoBounds from './PushIntoBounds.js';
import DrawBounds from './DrawBounds.js';
import AddChildrenMap from './AddChildrenMap.js';
import GetElement from './GetElement.js';
import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetAllChildrenSizers from './GetAllChildrenSizers.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import Layout from './Layout.js';
import LayoutInit from './LayoutInit.js';
import _layoutInit from './_layoutInit.js';
import PopUp from './PopUp.js';
import ScaleDownDestroy from './ScaleDownDestroy.js';
import FadeIn from './FadeIn.js';
import FadeOutDestroy from './FadeOutDestroy.js';
import IsInTouching from './IsInTouching.js';
import GetTopmostSizer from './GetTopmostSizer.js';
import LayoutBackgrounds from './LayoutBackgrounds.js';
import SetDraggable from './SetDraggable.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Base extends Container {
    constructor(scene, x, y, minWidth, minHeight, config) {
        var anchorX, anchorY;
        if (typeof (x) === 'string') {
            anchorX = x;
            anchorY = y;
            x = 0;
            y = 0;
        }

        super(scene, x, y, 2, 2);

        this.isRexSizer = true;
        this.setMinWidth(minWidth);
        this.setMinHeight(minHeight);
        this.setName(GetValue(config, 'name', ''));
        this.rexSizer = {};
        this.backgroundChildren = undefined;

        if (anchorX !== undefined) {
            this._anchor = new Anchor(this, {
                x: anchorX,
                y: anchorY,
            });;
        }

        this.setDraggable(GetValue(config, 'draggable', false));
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        if (this.backgroundChildren !== undefined) {
            this.backgroundChildren.length = 0;
        }
        super.destroy(fromScene);
    }

    setMinWidth(minWidth) {
        if (minWidth == null) {
            minWidth = 0;
        }
        this.minWidth = minWidth;
        return this;
    }

    setMinHeight(minHeight) {
        if (minHeight == null) {
            minHeight = 0;
        }
        this.minHeight = minHeight;
        return this;
    }

    get childrenWidth() {
        if (this._childrenWidth === undefined) {
            this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth;
    }

    get childrenHeight() {
        if (this._childrenHeight === undefined) {
            this._childrenHeight = this.getChildrenHeight();
        }
        return this._childrenHeight;
    }

    get left() {
        return this.x - (this.displayWidth * this.originX);
    }

    set left(value) {
        this.x += (value - this.left);
    }

    alignLeft(value) {
        this.left = value;
        return this;
    }

    get right() {
        return (this.x - (this.displayWidth * this.originX)) + this.displayWidth;
    }

    set right(value) {
        this.x += (value - this.right);
    }

    alignRight(value) {
        this.right = value;
        return this;
    }

    get centerX() {
        return (this.left + this.right) / 2;
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }

    alignCenterX(value) {
        this.centerX = value;
        return this;
    }

    get top() {
        return this.y - (this.displayHeight * this.originY);
    }

    set top(value) {
        this.y += (value - this.top);
    }

    alignTop(value) {
        this.top = value;
        return this;
    }

    get bottom() {
        return (this.y - (this.displayHeight * this.originY)) + this.displayHeight;
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }

    alignBottom(value) {
        this.bottom = value;
        return this;
    }

    get centerY() {
        return (this.top + this.bottom) / 2;
    }

    set centerY(value) {
        this.y += (value - this.centerY);
    }

    alignCenterY(value) {
        this.centerY = value;
        return this;
    }

    pin(gameObject) {
        super.add(gameObject);
        return this;
    }

    addBackground(gameObject) {
        if (this.backgroundChildren === undefined) {
            this.backgroundChildren = [];
        }

        super.add(gameObject);

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        this.backgroundChildren.push(gameObject);
        return this;
    }
}

var methods = {
    getSizerConfig: GetSizerConfig,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    addChildrenMap: AddChildrenMap,
    getElement: GetElement,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers,
    layout: Layout,
    layoutBackgrounds: LayoutBackgrounds,
    layoutInit: LayoutInit,
    _layoutInit: _layoutInit,
    popUp: PopUp,
    scaleDownDestroy: ScaleDownDestroy,
    fadeIn: FadeIn,
    fadeOutDestroy: FadeOutDestroy,
    isInTouching: IsInTouching,
    getTopmostSizer: GetTopmostSizer,
    setDraggable: SetDraggable,
}

Object.assign(
    Base.prototype,
    methods
);

export default Base;