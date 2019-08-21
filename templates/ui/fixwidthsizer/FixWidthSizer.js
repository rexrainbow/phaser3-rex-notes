import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ORIENTATIONMODE from '../utils/OrientationConst.js';
import GetMaxChildWidth from './GetMaxChildWidth.js';
import GetMaxChildHeight from './GetMaxChildHeight.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

class FixWidthSizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, orientation, space) {
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
        } else if (IsPlainObject(space)) {
            config = space;
        }

        if (config !== undefined) {
            orientation = GetValue(config, 'orientation', 0);
            space = GetValue(config, 'space', config);
        }
        if (orientation === undefined) {
            orientation = 0;
        }
        if (space === undefined) {
            space = 0;
        }
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexFixWidthSizer';
        this.sizerChildren = [];
        this.setOrientation(orientation);
        this.setPadding(space);
        this.setItemSpacing(GetValue(space, 'item', 0));
        this.setLineSpacing(GetValue(space, 'line', 0));
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

    setPadding(paddingConfig) {
        this.padding = GetBoundsConfig(paddingConfig, this.padding);
        return this;
    }

    setItemSpacing(space) {
        this.itemSpacing = space;
        return this;
    }

    setLineSpacing(space) {
        this.lineSpacing = space;
        return this;
    }

    add(gameObject, paddingConfig) {
        if (gameObject === '\n') {
            this.addNewLine();
            return this;
        }

        super.add(gameObject);
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.align = ALIGN_CENTER;
        config.padding = GetBoundsConfig(paddingConfig);
        this.sizerChildren.push(gameObject);
        return this;
    }

    addNewLine() {
        this.sizerChildren.push('\n');
        return this;
    }

    insert(index, gameObject, paddingConfig, expand) {
        this.add(gameObject, paddingConfig, expand);
        this.moveTo(gameObject, index);
        return this;
    }

    remove(gameObject) {
        var config = this.getSizerConfig(gameObject);
        if (config.parent !== this) {
            return this;
        }
        config.parent = undefined;
        RemoveItem(this.sizerChildren, gameObject);
        super.remove(gameObject);
        return this;
    }

    clear(destroyChild) {
        var children = this.sizerChildren, child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child === '\n') {
                continue;
            }
            this.getSizerConfig(child).parent = undefined;
        }
        children.length = 0;
        super.clear(destroyChild);
        return this;
    }

    get maxChildWidth() {
        if (this._maxChildWidth === undefined) {
            this._maxChildWidth = GetMaxChildWidth.call(this);
        }
        return this._maxChildWidth;
    }

    get maxChildHeight() {
        if (this._maxChildHeight === undefined) {
            this._maxChildHeight = GetMaxChildHeight.call(this);
        }
        return this._maxChildHeight;
    }
}

Object.assign(
    FixWidthSizer.prototype,
    Methods
);

export default FixWidthSizer;