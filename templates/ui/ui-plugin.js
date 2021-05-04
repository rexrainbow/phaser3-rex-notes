import ObjectFactory from './ObjectFactory.js';

import RoundRectangleFactory from './roundrectangle/Factory.js';
import RoundRectangleCanvasFactory from './roundrectanglecanvas/Factory.js';
import BBCodeTextFactory from './bbcodetext/Factory.js';
import TagTextFactory from './tagtext/Factory.js';
import ContainerFactory from './container/Factory.js';
import CanvasFactory from './canvas/Factory.js';
import CircleMaskImageFactory from './circlemaskimage/Factory.js';
import DynamicTextFactory from './dynamictext/Factory.js';
import CircularProgressCanvasFactory from './circularprogresscanvas/Factory.js';
import CircularProgressFactory from './circularprogress/Factory.js';
import KnobFactory from './knob/Factory.js';
import CustomShapesFactory from './customshapes/Factory.js';
import ChartFactory from './chart/Factory.js';
import NinePatchFactory from './ninepatch/Factory.js';

import SizerFactory from './sizer/Factory.js';
import GridSizerFactory from './gridsizer/Factory.js';
import FixWidthSizerFactory from './fixwidthsizer/Factory.js';
import OverlapSizerFactory from './overlapsizer/Factory.js';

import LabelFactory from './label/Factory.js';
import ButtonsFactory from './buttons/Factory.js';
import GridButtonsFactory from './gridbuttons/Factory.js';
import FixWidthButtons from './fixwidthbuttons/Factory.js';
import DialogFactory from './dialog/Factory.js';
import TabsFactory from './tabs/Factory.js';
import SliderFactory from './slider/Factory.js';
import GridTableFactory from './gridtable/Factory.js';
import MenuFactory from './menu/Factory.js';
import TextBoxFactory from './textbox/Factory.js';
import NumberBarFactory from './numberbar/Factory.js';
import PagesFactory from './pages/Factory.js';
import TextAreaFactory from './textarea/Factory.js';
import ScrollablePanelFactory from './scrollablepanel/Factory.js';
import ToastFactory from './toast/Factory.js';
import SidesFactory from './sides/Factory.js';

import ClickFactory from './click/Factory.js';
import TapFactory from './tap/Factory.js';
import PressFactory from './press/Factory.js';
import SwipeFactory from './swipe/Factory.js';
import PanFactory from './pan/Factory.js';
import PinchFactory from './pinch/Factory.js';
import RotateFactory from './rotate/Factory.js';
import FlipFactory from './flip/Factory.js';
import PerspectiveFactory from './perspective/Factory.js';

import { GetParentSizer, GetTopmostSizer } from './utils/GetParentSizer.js';
import IsPointerInBounds from '../../plugins/utils/input/IsPointerInBounds.js';
import {
    Show,
    Hide,
    IsShown,
} from './utils/Hide.js';
import Edit from '../../plugins/behaviors/textedit/Edit.js';
import WrapExpandText from './utils/wrapexpandtext/WrapExpandText.js';
import { WaitEvent, WaitComplete } from './utils/WaitEvent.js';
import GetViewport from '../../plugins/utils/system/GetViewport.js';
import SetChildrenInteractive from './utils/setchildreninteractive/SetChildrenInteractive.js';


class UIPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }

    start() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    isInTouching(gameObject, pointer, preTest, postTest) {
        if (!gameObject.visible) {
            return false;
        }
        return IsPointerInBounds(gameObject, pointer, preTest, postTest);
    }

    get viewport() {
        return GetViewport(this.scene, true);
    }

}

var methods = {
    getParentSizer: GetParentSizer,
    getTopmostSizer: GetTopmostSizer,
    hide: Hide,
    show: Show,
    isShown: IsShown,
    edit: Edit,
    wrapExpandText: WrapExpandText,
    waitEvent: WaitEvent,
    waitComplete: WaitComplete,
    setChildrenInteractive: SetChildrenInteractive,
}

Object.assign(
    UIPlugin.prototype,
    methods
);


export default UIPlugin;