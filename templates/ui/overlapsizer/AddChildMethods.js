import AddChild from '../basesizer/utils/AddChild.js';
import ALIGNMODE from '../utils/AlignConst.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;
const UUID = Phaser.Utils.String.UUID;

var Add = function (gameObject, key, align, padding, expand, minWidth, minHeight) {
    AddChild.call(this, gameObject);

    if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key', undefined);
        align = GetValue(config, 'align', ALIGN_CENTER);
        padding = GetValue(config, 'padding', 0);
        expand = GetValue(config, 'expand', true);

        if (!gameObject.isRexSizer) {
            // Get minWidth,minHeight from config
            minWidth = GetValue(config, 'minWidth', gameObject._minWidth);
            minHeight = GetValue(config, 'minHeight', gameObject._minHeighted);
        }
    }

    if (key === undefined) {
        key = UUID();
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
    if (expand === undefined) {
        expand = true;
    }
    if (!gameObject.isRexSizer) {
        // Get minWidth,minHeight from game object
        if (minWidth === undefined) {
            minWidth = gameObject._minWidth;
        }
        if (minHeight === undefined) {
            minHeight = gameObject._minHeight;
        }
    }

    var config = this.getSizerConfig(gameObject);
    config.align = align;
    config.padding = GetBoundsConfig(padding);

    if (IsPlainObject(expand)) {
        config.expandWidth = GetValue(expand, 'width', false);
        config.expandHeight = GetValue(expand, 'height', false);
    } else {
        config.expandWidth = expand;
        config.expandHeight = expand;
    }

    if (!gameObject.isRexSizer) {  // Expand normal game object
        if (config.expandWidth) {
            // minWidth is still undefined, uses current display width
            gameObject.minWidth = (minWidth === undefined) ? GetDisplayWidth(gameObject) : minWidth;
        } else {
            gameObject.minWidth = undefined;
        }
        if (config.expandHeight) {
            // minHeight is still undefined, uses current display height
            gameObject.minHeight = (minHeight === undefined) ? GetDisplayHeight(gameObject) : minHeight;
        } else {
            gameObject.minHeight = undefined;
        }
    }

    if (this.sizerChildren.hasOwnProperty(key)) {
        this.sizerChildren[key].destroy();
    }
    this.sizerChildren[key] = gameObject;
    return this;
}

export default {
    add: Add
}