import ALIGNMODE from '../utils/AlignConst.js';
import GetBoundsConfig from '../utils/GetBoundsConfig.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

var AddPage = function (gameObject, key, align, paddingConfig, expand) {
    if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key', 0);
        align = GetValue(config, 'align', ALIGN_LEFTTOP);
        paddingConfig = GetValue(config, 'padding', 0);
        expand = GetValue(config, 'expand', false);
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
    if (expand === undefined) {
        expand = true;
    }

    var config = this.getSizerConfig(gameObject);
    config.parent = this;
    config.align = align;
    config.padding = GetBoundsConfig(paddingConfig);
    config.expand = expand;
    if (this.sizerChildren.has(key)) {
        this.sizerChildren.get(key).destroy();
    }
    this.sizerChildren.set(key, gameObject);
    gameObject.setVisible(false); // Default is invisible
    this.add(gameObject);
    return this;
}
export default AddPage;