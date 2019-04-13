import ObjectFactory from './ObjectFactory.js';

import RoundRectangleFactory from './roundrectangle/RoundRectangleFactory.js';
import BBCodeTextFactory from './bbcodetext/BBCodeTextFactory.js';
import TagTextFactory from './tagtext/TagTextFactory.js';
import ContainerFactory from './container/ContainerFactory.js';

import SizerFactory from './sizer/SizerFactory.js';
import GridSizerFactory from './gridsizer/GridSizerFactory.js';
import FixWidthSizerFactory from './fixwidthsizer/FixWidthSizerFactory.js';

import LabelFactory from './label/LabelFactory.js';
import ButtonsFactory from './buttons/ButtonsFactory.js';
import DialogFactory from './dialog/DialogFactory.js';
import TabsFactory from './tabs/TabsFactory.js';
import SliderFactory from './slider/SliderFactory.js';
import GridTableFactory from './gridtable/GridTableFactory.js';
import MenuFactory from './menu/MenuFactory.js';
import TextBoxFactory from './textbox/TextboxFactory.js';
import NumberBarFactory from './numberbar/NumberBarFactory.js';
import PagesFactory from './pages/PagesFactory.js';
import TextBlockFactory from './textblock/TextBlockFactory.js';
import TextAreaFactory from './textarea/TextAreaFactory.js';
import ScrollableBlockFactory from './scrollableblock/ScrollableBlockFactory.js';
import ScrollablePanelFactory from './scrollablepanel/ScrollablePanelFactory.js';
import ChartFactory from './chart/ChartFactory.js';

import Hide from './utils/Hide.js';
import Show from './utils/Show.js';

class UIPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }
}

var methods = {
    hide: Hide,
    show: Show,
}

Object.assign(
    UIPlugin.prototype,
    methods
);


export default UIPlugin;