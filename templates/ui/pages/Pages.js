import BaseSizer from '../basesizer/BaseSizer.js';
import AddPage from './AddPage.js';
import GetPage from './GetPage.js';
import SwapPage from './SwapPage.js';
import ParsePaddingConfig from '../utils/ParsePaddingConfig.js'
import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import Layout from './Layout.js';
import _layoutInit from './_layoutInit.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Map = Phaser.Structs.Map;
const ALIGN_CENTER = Phaser.Display.Align.CENTER;

class Pages extends BaseSizer {
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

        this.type = 'rexPages';
        this.previousKey = undefined;
        this.currentKey = undefined;
        this.sizerChildren = new Map();
        this.backgroundChildren = [];
        this.setSwapMode(GetValue(config, 'swapMode', 0));

        this.childrenMap = {};
        this.childrenMap.pages = this.sizerChildren.entries;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.sizerChildren.clear();
        this.backgroundChildren.length = 0;
        super.destroy(fromScene);
    }

    setSwapMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SWAPMODE[mode];
        }
        this.swapMode = mode;
        return this;
    }

    addBackground(gameObject, paddingConfig) {
        super.add(gameObject);
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        config.align = ALIGN_CENTER;
        config.padding = ParsePaddingConfig(paddingConfig);
        config.expand = true;
        this.backgroundChildren.push(gameObject);
        return this;
    }

    get currentPage() {
        return this.getPage(this.currentKey);
    }

    get previousPage() {
        return this.getPage(this.previousKey);
    }

    get keys() {
        return this.sizerChildren.keys();
    }
}

var methods = {
    addPage: AddPage,
    getPage: GetPage,
    swapPage: SwapPage,
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenSizers: GetChildrenSizers,
    layout: Layout,
    _layoutInit: _layoutInit,
}
Object.assign(
    Pages.prototype,
    methods
);

const SWAPMODE = {
    invisible: 0,
    destroy: 1
};

export default Pages;