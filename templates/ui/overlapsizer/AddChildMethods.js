import AddChild from '../basesizer/utils/AddChild.js';
import ALIGNMODE from '../utils/AlignConst.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

import { Display as PhaserDisplay, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const ALIGN_CENTER = PhaserDisplay.Align.CENTER;
const UUID = PhaserUtils.String.UUID;

var NormalizeExpand = function (value) {
    var expandRatio;
    if (value === true) {
        expandRatio = 1;
    } else if ((typeof (value) === 'number') && isFinite(value) && (value > 0)) {
        expandRatio = value;
    } else {
        expandRatio = 0;
    }

    return expandRatio;
}

var Add = function (gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY, aspectRatio) {
    var offsetOriginX, offsetOriginY;

    AddChild.call(this, gameObject);

    if (IsPlainObject(childKey)) {
        var config = childKey;
        childKey = GetValue(config, 'key', undefined);
        align = GetValue(config, 'align', ALIGN_CENTER);
        padding = GetValue(config, 'padding', 0);
        expand = GetValue(config, 'expand', true);

        if (!gameObject.isRexSizer) {
            // Get minWidth,minHeight from config
            minWidth = GetValue(config, 'minWidth', gameObject._minWidth);
            minHeight = GetValue(config, 'minHeight', gameObject._minHeighted);
        }

        offsetX = GetValue(config, 'offsetX', 0);
        offsetY = GetValue(config, 'offsetY', 0);
        offsetOriginX = GetValue(config, 'offsetOriginX', 0);
        offsetOriginY = GetValue(config, 'offsetOriginY', 0);

        aspectRatio = GetValue(config, 'aspectRatio', 0);
    }

    var hasValidKey = (childKey !== undefined);
    if (!hasValidKey) {
        childKey = UUID();
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

    if (offsetX === undefined) {
        offsetX = 0;
    }
    if (offsetY === undefined) {
        offsetY = 0;
    }
    if (offsetOriginX === undefined) {
        offsetOriginX = 0;
    }
    if (offsetOriginY === undefined) {
        offsetOriginY = 0;
    }

    if (aspectRatio === undefined) {
        aspectRatio = 0;
    } else if (aspectRatio === true) {
        aspectRatio = GetDisplayWidth(gameObject) / GetDisplayHeight(gameObject);
    }
    if (aspectRatio > 0) {
        expand = true;

        if (minWidth === undefined) {
            minWidth = 0;
        }
        if (minHeight === undefined) {
            minHeight = 0;
        }
    }

    var config = this.getSizerConfig(gameObject);

    config.align = align;

    config.padding = GetBoundsConfig(padding);

    if (IsPlainObject(expand)) {
        config.expandWidth = NormalizeExpand(GetValue(expand, 'width', false));
        config.expandHeight = NormalizeExpand(GetValue(expand, 'height', false));
    } else {
        expand = NormalizeExpand(expand);
        config.expandWidth = expand;
        config.expandHeight = expand;
    }

    if (!gameObject.isRexSizer) {  // Expand normal game object
        if (config.expandWidth) {
            // minWidth is still undefined, uses current display width
            gameObject.minWidth = (minWidth === undefined) ? GetDisplayWidth(gameObject) : minWidth;
        }
        if (config.expandHeight) {
            // minHeight is still undefined, uses current display height
            gameObject.minHeight = (minHeight === undefined) ? GetDisplayHeight(gameObject) : minHeight;
        }
    }

    config.alignOffsetX = offsetX;
    config.alignOffsetY = offsetY;
    config.alignOffsetOriginX = offsetOriginX;
    config.alignOffsetOriginY = offsetOriginY;

    config.aspectRatio = aspectRatio;

    if (this.sizerChildren.hasOwnProperty(childKey)) {
        this.sizerChildren[childKey].destroy();
    }
    this.sizerChildren[childKey] = gameObject;

    if (hasValidKey) {
        this.addChildrenMap(childKey, gameObject)
    }
    return this;
}

export default {
    add: Add
}
