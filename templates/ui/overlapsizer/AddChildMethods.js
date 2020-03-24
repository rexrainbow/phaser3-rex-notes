import ALIGNMODE from '../utils/AlignConst.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

export default {    
    add(gameObject, key, align, padding, expand) {
        this.pin(gameObject);

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