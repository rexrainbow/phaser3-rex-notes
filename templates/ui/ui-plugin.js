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
import ToastFactory from './toast/ToastFactory.js';
import ChartFactory from './chart/ChartFactory.js';
import VideoFactory from './video/VideoFactory.js';
import VideoCanvasFactory from './video/VideoCanvasFactory.js';
import YoutubePlayerFactory from './youtubeplayer/YoutubePlayerFactory.js';

import TapFactory from './tap/TapFactory.js';
import PressFactory from './press/PressFactory.js';
import SwipeFactory from './swipe/SwipeFactory.js';
import PanFactory from './pan/PanFactory.js';
import PinchFactory from './pinch/PinchFactory.js';
import RotateFactory from './rotate/RotateFactory.js';

import {
    Show,
    Hide,
    IsShown,
} from './utils/Hide.js';
import Edit from '../../plugins/behaviors/textedit/Edit.js';

class UIPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }
}

var methods = {
    hide: Hide,
    show: Show,
    isShown: IsShown,
    edit: Edit,
}

Object.assign(
    UIPlugin.prototype,
    methods
);


export default UIPlugin;