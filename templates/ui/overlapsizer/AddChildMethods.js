import ALIGNMODE from '../utils/AlignConst.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

export default {
    add(gameObject, key, align, padding, expand) {
        this.pin(gameObject);

        if (IsPlainObject(key)) {
            var config = key;
            key = GetValue(config, 'key', undefined);
            align = GetValue(config, 'align', ALIGN_CENTER);
            padding = GetValue(config, 'padding', 0);
            expand = GetValue(config, 'expand', true);
        }

        if (key === undefined) {
            key = Date.now();
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

        if (this.sizerChildren.hasOwnProperty(key)) {
            this.sizerChildren[key].destroy();
        }
        this.sizerChildren[key] = gameObject;
        return this;
    }
}