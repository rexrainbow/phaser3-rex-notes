import BaseSizer from '../basesizer/BaseSizer.js';
import ParsePaddingConfig from '../utils/ParsePaddingConfig.js'
import Layout from './Layout.js';
import ORIENTATIONMODE from '../utils/OrientationConst.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;

class FixWidthSizer extends BaseSizer {
    constructor(scene, x, y, width, height, orientation) {
        var config;
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(orientation)) {
            config = orientation;
        }

        if (config !== undefined) {
            orientation = GetValue(config, 'orientation', 0);
        }
        if (orientation === undefined) {
            orientation = 0;
        }
        super(scene, x, y, width, height, config);

        this.type = 'rexSizer';
        this.sizerChildren = [];
        this.setOrientation(orientation);
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

    add(gameObject, paddingConfig, expand) {
        super.add(gameObject);

        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }
        if (expand === undefined) {
            expand = false;
        }

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.padding = ParsePaddingConfig(paddingConfig);
        config.expand = expand;
        this.sizerChildren.push(gameObject);
        return this;
    }

    insert(index, gameObject, paddingConfig, expand) {
        this.add(gameObject, paddingConfig, expand);
        this.moveTo(gameObject, index);
        return this;
    }

    remove(gameObject) {
        var config = this.getSizerConfig(gameObject);
        config.parent = undefined;
        RemoveItem(this.sizerChildren, gameObject);
        super.remove(gameObject);
        return this;
    }
}

var methods = {
    layout: Layout,
}
Object.assign(
    FixWidthSizer.prototype,
    methods
);

const PROPORTIONMODE = {
    min: 0,
    full: -1,
}
export default FixWidthSizer;