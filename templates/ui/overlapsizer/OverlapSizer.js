import BaseSizer from '../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import Clear from '../../../plugins/utils/object/Clear.js';
import ALIGNMODE from '../utils/AlignConst.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

class OverlapSizer extends BaseSizer {
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

        this.type = 'rexOverlapSizer';
        this.sizerChildren = {};
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        Clear(this.sizerChildren);
        super.destroy(fromScene);
    }

    add(gameObject, key, align, padding, expand) {
        super.add(gameObject);

        if (IsPlainObject(key)) {
            var config = key;
            key = GetValue(config, 'key', undefined);
            align = GetValue(config, 'align', ALIGN_LEFTTOP);
            padding = GetValue(config, 'padding', 0);
            expand = GetValue(config, 'expand', true);
        }

        if (key === undefined) {
            return this;
        }

        if (typeof (align) === 'string') {
            align = ALIGNMODE[align];
        }

        if (align === undefined) {
            align = ALIGN_CENTER;
        }
        if (padding === undefined) {
            padding = 0;
        }
        var defaultExpand = (typeof (expand) === "boolean") ? expand : false;

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.align = align;
        config.padding = GetBoundsConfig(padding);
        config.expandWidth = GetValue(expand, 'width', defaultExpand);
        config.expandHeight = GetValue(expand, 'height', defaultExpand);
        if (this.sizerChildren.hasOwnProperty(key)) {
            this.sizerChildren[key].destroy();
        }
        this.sizerChildren[key] = gameObject;
        return this;
    }
}

Object.assign(
    OverlapSizer.prototype,
    Methods
);

export default OverlapSizer;