import ContainerLite from 'rexPlugins/gameobjects/containerlite/ContainerLite.js';
import PushIntoBounds from './PushIntoBounds.js';
import DrawBounds from '../utils/DrawBounds.js';
import GetElement from './GetElement.js';
import PopUp from './PopUp.js';
import ScaleDownDestroy from './ScaleDownDestroy.js';
import FadeIn from './FadeIn.js';
import FadeOutDestroy from './FadeOutDestroy.js';

const Container = ContainerLite;
const GetValue = Phaser.Utils.Objects.GetValue;

class Base extends Container {
    constructor(scene, x, y, minWidth, minHeight, config) {
        super(scene, x, y, 2, 2);

        this.isRexSizer = true;
        this.setMinWidth(minWidth);
        this.setMinHeight(minHeight);
        this.setName(GetValue(config, 'name', ''));
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

    getSizerConfig(gameObject) {
        if (!gameObject.hasOwnProperty('rexSizer')) {
            gameObject.rexSizer = {};
        }
        return gameObject.rexSizer;
    }

    get childrenWidth() {
        if (this._childrenWidth === undefined) {
            this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth
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
}

var methods = {
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    getElement: GetElement,
    popUp: PopUp,
    scaleDownDestroy: ScaleDownDestroy,
    fadeIn: FadeIn,
    fadeOutDestroy: FadeOutDestroy,
}

Object.assign(
    Base.prototype,
    methods
);

export default Base;