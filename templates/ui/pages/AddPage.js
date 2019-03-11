import ALIGNMODE from '../utils/AlignConst.js';
import ParsePaddingConfig from '../utils/ParsePaddingConfig.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var AddPage = function (gameObject, key, align, paddingConfig, expand) {
    // Game-object Won't be added to container until swap to this page

    if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key', 0);
        align = GetValue(config, 'align', ALIGN_CENTER);
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
        expand = false;
    }

    var config = this.getSizerConfig(gameObject);
    config.parent = this;
    config.align = align;
    config.padding = ParsePaddingConfig(paddingConfig);
    config.expand = expand;
    if (this.sizerChildren.has(key)) {
        this.sizerChildren.get(key).destroy();
    }
    this.sizerChildren.set(key, gameObject);
    gameObject.setVisible(false); // Default is invisible
    return this;
}
export default AddPage;