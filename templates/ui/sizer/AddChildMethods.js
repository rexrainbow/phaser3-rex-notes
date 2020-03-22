import Container from '../container/Container.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import ALIGNMODE from '../utils/AlignConst.js';
import Space from '../utils/Space.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;
const PROPORTIONMODE = {
    min: 0,
    full: -1,
}

export default {
    add(gameObject, proportion, align, paddingConfig, expand, childKey) {
        this.pin(gameObject);

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
            childKey = GetValue(config, 'key', undefined);
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

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject)
        }
        return this;
    },

    addSpace(proportion) {
        if (proportion === undefined) {
            proportion = 1;
        }
        this.add(Space(this.scene), proportion);
        return this;
    },

    insert(index, gameObject, proportion, align, paddingConfig, expand) {
        this.add(gameObject, proportion, align, paddingConfig, expand);
        Container.prototype.moveTo.call(this, gameObject, index);
        return this;
    }
}