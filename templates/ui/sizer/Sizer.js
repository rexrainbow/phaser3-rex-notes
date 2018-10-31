import ContainerLite from 'rexPlugins/gameobjects/containerlite/ContainerLite.js';
import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenProportion from './GetChildrenProportion.js';
import GetAllChildrenSizer from './GetAllChildrenSizer.js';
import Layout from './Layout.js';
import DrawBounds from './DrawBounds.js';
import ORIENTATIONMODE from '../utils/OrientationConst.js';

const Container = ContainerLite;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

class Sizer extends Container {
    constructor(scene, x, y, minWidth, minHeight, orientation) {
        var config;
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
        } else if (IsPlainObject(orientation)) {
            config = orientation;
        }
        if (config !== undefined) {
            orientation = GetValue(config, 'orientation', 0);
        }

        super(scene, x, y, 2, 2);
        this.type = 'rexSizer';
        this.isRexSizer = true;
        this.sizerChildren = [];
        this.setOrientation(orientation);
        this.setMinWidth(minWidth);
        this.setMinHeight(minHeight);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.sizerChildren.length = 0;
        super.destroy(fromScene);
    }

    setOrientation(orientation) {
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    setExtendFlag(expandFlag) {
        if (expandFlag === undefined) {
            expandFlag = true;
        }
        this.expandFlag = expandFlag;
        return this;
    }

    add(gameObject, proportion, align, paddingConfig, expand) {
        super.add(gameObject);

        var proportionType = typeof (proportion);
        if (proportion === null) {
            return this;
        } else if (proportionType === 'number') {

        } else if (proportionType === 'string') {
            proportion = PROPORTIONMODE[proportion];
        } else if (IsPlainObject(proportion)) {
            var config = proportion;
            proportion = GetValue(config, 'proportion', 0);
            align = GetValue(config, 'align', ALIGN_CENTER);
            paddingConfig = GetValue(config, 'padding', 0);
            expand = GetValue(config, 'expand', false);
        }

        if (typeof (align) === 'string') {
            align = ALIGNMODE[align];
        }

        if (proportion === undefined) {
            proportion = 0;
        }
        if (align === undefined) {
            align = ALIGN_CENTER;
        }
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }
        if (expand === undefined) {
            expand = false;
        }

        var padding = {};
        if (typeof (paddingConfig) === 'number') {
            padding.left = paddingConfig;
            padding.right = paddingConfig;
            padding.top = paddingConfig;
            padding.bottom = paddingConfig;
        } else {
            padding.left = GetValue(paddingConfig, 'left', 0);
            padding.right = GetValue(paddingConfig, 'right', 0);
            padding.top = GetValue(paddingConfig, 'top', 0);
            padding.bottom = GetValue(paddingConfig, 'bottom', 0);
        }

        var config = this.getSizerConfig(gameObject);
        config.proportion = proportion;
        config.align = align;
        config.padding = padding;
        config.expand = expand;
        this.sizerChildren.push(gameObject);
        return this;
    }

    remove(gameObject) {
        RemoveItem(this.sizerChildren, gameObject);
        super.remove(gameObject);
        return this;
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

    resize(width, height) {
        this.setSize(width, height);
        this.updateDisplayOrigin(); // Remove this line until it has merged in `zone.setSize()` function
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

    get childrenProportion() {
        if (this._childrenProportion === undefined) {
            this._childrenProportion = this.getChildrenProportion();
        }
        return this._childrenProportion;
    }
}

var methods = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenProportion: GetChildrenProportion,
    getAllChildrenSizer: GetAllChildrenSizer,
    layout: Layout,
    drawBounds: DrawBounds,
}
Object.assign(
    Sizer.prototype,
    methods
);

const ALIGNMODE = {
    center: Phaser.Display.Align.CENTER,
    left: Phaser.Display.Align.LEFT_CENTER,
    right: Phaser.Display.Align.RIGHT_CENTER,
    top: Phaser.Display.Align.TOP_CENTER,
    bottom: Phaser.Display.Align.BOTTOM_CENTER,
}

const PROPORTIONMODE = {
    min: 0,
    full: -1,
}
export default Sizer;