import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ORIENTATIONMODE from '../utils/OrientationConst.js';
import ALIGNMODE from '../utils/AlignConst.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

class Sizer extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, orientation, config) {
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
        if (orientation === undefined) {
            orientation = 0;
        }
        super(scene, x, y, minWidth, minHeight, config);

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

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.proportion = proportion;
        config.align = align;
        config.padding = GetBoundsConfig(paddingConfig);
        config.expand = expand;
        this.sizerChildren.push(gameObject);
        return this;
    }

    insert(index, gameObject, proportion, align, paddingConfig, expand) {
        this.add(gameObject, proportion, align, paddingConfig, expand);
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
        for (var i = 0, cnt = this.sizerChildren.length; i < cnt; i++) {
            this.getSizerConfig(this.sizerChildren[i]).parent = undefined;
        }
        this.sizerChildren.length = 0;
        super.clear(destroyChild);
        return this;
    }

    get childrenProportion() {
        if (this._childrenProportion === undefined) {
            this._childrenProportion = this.getChildrenProportion();
        }
        return this._childrenProportion;
    }
}

Object.assign(
    Sizer.prototype,
    Methods
);

const PROPORTIONMODE = {
    min: 0,
    full: -1,
}
export default Sizer;