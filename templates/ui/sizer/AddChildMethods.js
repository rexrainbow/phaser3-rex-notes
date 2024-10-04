import AddChild from '../basesizer/utils/AddChild.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ALIGNMODE from '../utils/AlignConst.js';
import Space from '../space/Space.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';
import GetNearestChildIndex from './GetNearestChildIndex.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;
const PROPORTIONMODE = {
    min: 0,
    full: -1,
}

var Add = function (
    gameObject,
    proportion, align, paddingConfig, expand,
    childKey, index,
    minWidth, minHeight,
    fitRatio
) {
    var offsetX, offsetY;
    var offsetOriginX, offsetOriginY;

    AddChild.call(this, gameObject);

    var isRexSpace = gameObject.isRexSpace;
    var proportionType = typeof (proportion);
    if (proportion === null) {
        return this;
    } else if (proportionType === 'number') {

    } else if (proportionType === 'string') {
        proportion = PROPORTIONMODE[proportion];
    } else if (IsPlainObject(proportion)) {
        var config = proportion;
        proportion = GetValue(config, 'proportion', undefined);
        align = GetValue(config, 'align', ALIGN_CENTER);
        paddingConfig = GetValue(config, 'padding', 0);
        expand = GetValue(config, 'expand', false);
        childKey = GetValue(config, 'key', undefined);
        index = GetValue(config, 'index', undefined);

        if (!gameObject.isRexSizer) {
            minWidth = GetValue(config, 'minWidth', undefined);
            minHeight = GetValue(config, 'minHeight', undefined);
        }

        fitRatio = GetValue(config, 'fitRatio', 0);  // width/height

        offsetX = GetValue(config, 'offsetX', 0);
        offsetY = GetValue(config, 'offsetY', 0);
        offsetOriginX = GetValue(config, 'offsetOriginX', 0);
        offsetOriginY = GetValue(config, 'offsetOriginY', 0);
    }

    if (typeof (align) === 'string') {
        align = ALIGNMODE[align];
    }

    if (proportion === undefined) {
        proportion = (isRexSpace) ? 1 : 0;
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

    if (minWidth === undefined) {
        if (isRexSpace) {
            minWidth = 0;
        } else if (!gameObject.isRexSizer) {
            minWidth = gameObject._minWidth;
        }
    }
    if (minHeight === undefined) {
        if (isRexSpace) {
            minHeight = 0;
        } else if (!gameObject.isRexSizer) {
            minHeight = gameObject._minHeight;
        }
    }

    if ((fitRatio === undefined) || (fitRatio === false)) {
        fitRatio = 0;
    } else if (fitRatio === true) {
        fitRatio = GetDisplayWidth(gameObject) / GetDisplayHeight(gameObject);
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

    var config = this.getSizerConfig(gameObject);
    config.proportion = proportion;
    config.align = align;
    config.padding = GetBoundsConfig(paddingConfig);
    config.expand = expand;
    config.fitRatio = (proportion === 0) ? fitRatio : 0;
    config.alignOffsetX = offsetX;
    config.alignOffsetY = offsetY;
    config.alignOffsetOriginX = offsetOriginX;
    config.alignOffsetOriginY = offsetOriginY;

    if ((index === undefined) || (index >= this.sizerChildren.length)) {
        this.sizerChildren.push(gameObject);
    } else {
        this.sizerChildren.splice(index, 0, gameObject);
    }

    if (!gameObject.isRexSizer) { // Expand normal game object
        if (proportion > 0) {
            if (this.orientation === 0) { // x
                // minWidth is still undefined, uses current display width
                gameObject.minWidth = (minWidth === undefined) ? GetDisplayWidth(gameObject) : minWidth;
            } else {
                // minHeight is still undefined, uses current display height
                gameObject.minHeight = (minHeight === undefined) ? GetDisplayHeight(gameObject) : minHeight;
            }
        }
        if (expand) {
            if (this.orientation === 0) { // x
                // Might have minHeight value, or still undefined
                gameObject.minHeight = minHeight;
            } else {
                // Might have minWidth value, or still undefined
                gameObject.minWidth = minWidth;
            }
        }
    }

    if (childKey !== undefined) {
        this.addChildrenMap(childKey, gameObject)
    }

    return this;
};

export default {
    add: Add, // sizer.add could be override

    addSpace(proportion) {
        this.insertSpace(undefined, proportion);
        return this;
    },

    insertSpace(index, proportion) {
        if (proportion === undefined) {
            proportion = 1;
        }
        Add.call(this, new Space(this.scene),
            {
                proportion: proportion,
                minWidth: 0,
                minHeight: 0,
                index: index
            }
        );
        // No problem if sizer.add is override
        return this;
    },

    insert(index, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
        if (IsPlainObject(proportion)) {
            proportion.index = index;
        }

        Add.call(this, gameObject, proportion, align, paddingConfig, expand, childKey, index, minSize);
        // No problem if sizer.add is override
        return this;
    },

    insertAtPosition(x, y, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
        var index = GetNearestChildIndex.call(this, x, y);
        if (index === -1) {
            index = undefined;
        }
        this.insert(index, gameObject, proportion, align, paddingConfig, expand, childKey, minSize);
        return this;
    }
}