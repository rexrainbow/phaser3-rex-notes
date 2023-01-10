import AddChild from '../basesizer/utils/AddChild.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ALIGNMODE from '../utils/AlignConst.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var Add = function (gameObject, indexes, align, paddingConfig, proportionX, proportionY, childKey) {
    AddChild.call(this, gameObject);
    if (IsPlainObject(columnIndex)) {
        var config = columnIndex;
        indexesString = GetValue(config, 'indexes', undefined);
        align = GetValue(config, 'align', ALIGN_CENTER);
        paddingConfig = GetValue(config, 'padding', 0);
        proportionX = GetValue(config, 'proportionX', 0);
        proportionY = GetValue(config, 'proportionY', 0);
        childKey = GetValue(config, 'key', undefined);
    }

    indexesString = indexesString.split('|');
    var indexes = [], x, y, i;
    for (var i = 0, cnt = indexesString.length; i < cnt; i++) {
        [x, y] = indexesString[i].split(',');
        i = y * this.columnCount + x;
        indexes.push(i);
    }

    if (typeof (align) === 'string') {
        align = ALIGNMODE[align];
    }
    if (align === undefined) {
        align = ALIGN_CENTER;
    }
    if (paddingConfig === undefined) {
        paddingConfig = 0;
    }
    if (proportionX === undefined) {
        proportionX = 0;
    }
    if (proportionY === undefined) {
        proportionY = 0;
    }

    var config = this.getSizerConfig(gameObject);
    config.align = align;
    config.padding = GetBoundsConfig(paddingConfig);
    config.proportionX = proportionX;
    config.proportionY = proportionY;
    config.indexes = indexes;

    this.sizerChildren.push(gameObject);

    for (var i = 0, cnt = indexes.length; i < cnt; i++) {
        this.indexesChildren[indexes[i]] = gameObject;
    }

    if (childKey !== undefined) {
        this.addChildrenMap(childKey, gameObject)
    }
    return this;
}

export default {
    add: Add
}