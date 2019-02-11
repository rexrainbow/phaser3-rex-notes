import ObjectFactory from './ObjectFactory.js';
import RoundRectangleFactory from './roundrectangle/RoundRectangleFactory.js';

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

class UIPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }
}

export default UIPlugin;