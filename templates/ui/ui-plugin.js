import ObjectFactory from './ObjectFactory.js';

import RoundRectangleFactory from './roundrectangle/Factory.js';
import BBCodeTextFactory from './bbcodetext/Factory.js';
import TagTextFactory from './tagtext/Factory.js';
import ContainerFactory from './container/Factory.js';
import ChartFactory from './chart/Factory.js';
import CircleMaskImageFactory from './circlemaskimage/Factory.js';
import NinePatchFactory from './ninepatch/Factory.js';
import VideoFactory from './video/Factory.js';
import VideoCanvasFactory from './video/Factory.js';
import YoutubePlayerFactory from './youtubeplayer/Factory.js';

import SizerFactory from './sizer/Factory.js';
import GridSizerFactory from './gridsizer/Factory.js';
import FixWidthSizerFactory from './fixwidthsizer/Factory.js';

import LabelFactory from './label/Factory.js';
import ButtonsFactory from './buttons/Factory.js';
import DialogFactory from './dialog/Factory.js';
import TabsFactory from './tabs/Factory.js';
import SliderFactory from './slider/Factory.js';
import GridTableFactory from './gridtable/Factory.js';
import MenuFactory from './menu/Factory.js';
import TextBoxFactory from './textbox/Factory.js';
import NumberBarFactory from './numberbar/Factory.js';
import PagesFactory from './pages/Factory.js';
import TextBlockFactory from './textblock/Factory.js';
import TextAreaFactory from './textarea/Factory.js';
import ScrollableBlockFactory from './scrollableblock/Factory.js';
import ScrollablePanelFactory from './scrollablepanel/Factory.js';
import ToastFactory from './toast/Factory.js';

import TapFactory from './tap/Factory.js';
import PressFactory from './press/Factory.js';
import SwipeFactory from './swipe/Factory.js';
import PanFactory from './pan/Factory.js';
import PinchFactory from './pinch/Factory.js';
import RotateFactory from './rotate/Factory.js';
import FlipFactory from './flip/Factory.js';

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