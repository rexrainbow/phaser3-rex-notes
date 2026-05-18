import ObjectFactory from './ObjectFactory';

import NinePatchFactory from './ninepatch/Factory';
import NinePatch2Factory from './ninepatch2/Factory';
import RoundRectangleFactory from './roundrectangle/Factory';
import RoundRectangleCanvasFactory from './roundrectanglecanvas/Factory';
import QuadShapeFactory from './quadshape/Factory';
import BBCodeTextFactory from './bbcodetext/Factory';
import TagTextFactory from './tagtext/Factory';
import DynamicTextFactory from './dynamictext/Factory';
import TextPlayerFactory from './textplayer/Factory';
import CanvasInputFactory from './canvasinput/Factory';
import HiddenEditFactory from './hiddenedit/Factory';
import CheckboxFactory from './checkbox/Factory';
import ToggleSwitchFactory from './toggleswitch/Factory';
import CanvasFactory from './canvas/Factory';
import CircleMaskImageFactory from './circlemaskimage/Factory';
import AlphaMaskImageFactory from './alphamaskimage/Factory';
import CircularProgressFactory from './circularprogress/Factory';
import CircularProgressCanvasFactory from './circularprogresscanvas/Factory';
import LineProgressFactory from './lineprogress/Factory';
import RoundRectangleProgressFactory from './roundrectangleprogress/Factory';
import LineProgressCanvasFactory from './lineprogresscanvas/Factory';
import TriangleFactory from './triangle/Factory';
import KnobFactory from './knob/Factory';
import CustomShapesFactory from './customshapes/Factory';
import CustomProgressFactory from './customprogress/Factory';
import AIOSpinnerFactory from './aiospinner/Factory';
// import TransitionImageFactory from './transitionimage/Factory';
// import TransitionImagePackFactory from './transitionimagepack/Factory';
import ImageBoxFactory from './imagebox/Factory';
import LazyLoadImageBoxFactory from '../lazyloadimagebox/Factory';
import FullWindowRectangleFactory from './fullwindowrectangle/Factory';
import FullWindowZoneFactory from './fullwindowzone/Factory';
import CoverFactory from './cover/Factory';
import InputTextFactory from './inputtext/Factory';
import FileChooserFactory from './filechooser/Factory';
import FileDropZoneFactory from './filedropzone/Factory';
import ImageInputLabelFactory from './imageinputlabel/Factory';
import StatesImageFactory from './statesimage/Factory';
import StatesRoundRectangleFactory from './statesroundrectangle/Factory';
import StatesNineSliceFactory from './statesnineslice/Factory';
import StatesNinePatchFactory from './statesninepatch/Factory';
import StatesTextFactory from './statestext/Factory';
import StatesBitmapTextFactory from './statesbitmaptext/Factory';
import StatesBarRectangleFactory from './statesbarrectangle/Factory';
import ChartFactory from './chart/Factory';

import ContainerFactory from './container/Factory';
import SizerFactory from './sizer/Factory';
import GridSizerFactory from './gridsizer/Factory';
import FixWidthSizerFactory from './fixwidthsizer/Factory';
import OverlapSizerFactory from './overlapsizer/Factory';

import SpaceFactory from './space/Factory';
import LabelFactory from './label/Factory';
import SimpleLabelFactory from './simplelabel/Factory';
import TitleLabelFactory from './titlelabel/Factory';
import SimpleTitleLabelFactory from './simpletitlelabel/Factory';
import NameValueLabelFactory from './namevaluelabel/Factory';
import ExpBarFactory from './expbar/Factory';
import ButtonsFactory from './buttons/Factory';
import GridButtonsFactory from './gridbuttons/Factory';
import FixWidthButtonsFactory from './fixwidthbuttons/Factory';
import FileSelectorButtonFactory from './fileselectorbutton/Factory';
import DialogFactory from './dialog/Factory';
import ConfirmDialogFactory from './confirmdialog/Factory';
import ConfirmActionButtonFactory from './confirmactionbutton/Factory';
import NameInputDialogFactory from './nameinputdialog/Factory';
import HolyGrailFactory from './holygrail/Factory';
import TabsFactory from './tabs/Factory';
import SliderFactory from './slider/Factory';
import GridTableFactory from './gridtable/Factory';
import MenuFactory from './menu/Factory';
import DropDownListFactory from './dropdownlist/Factory';
import SimpleDropDownListFactory from './simpledropdownlist/Factory';
import TextBoxFactory from './textbox/Factory';
import SimpleTextBoxFactory from './simpletextbox/Factory';
import NumberBarFactory from './numberbar/Factory';
import ScrollBarFactory from './scrollbar/Factory';
import BadgeLabelFactory from './badgelabel/Factory';
import PagesFactory from './pages/Factory';
import PerspectiveCardFactory from './perspectivecard/Factory';
import TabPagesFactory from './tabpages/Factory';
import FolderFactory from './folder/Factory';
import TreesFactory from './trees/Factory';
import TextAreaFactory from './textarea/Factory';
import TextAreaInputFactory from './textareainput/Factory';
import ScrollablePanelFactory from './scrollablepanel/Factory';
import ToastFactory from './toast/Factory';
import ToastQueueFactory from './toastqueue/Factory';
import ColorInputFactory from './colorinput/colorinput/Factory';
import ColorInputLiteFactory from './colorinput/colorinputbase/Factory';
import ColorPickerFactory from './colorinput/colorpicker/Factory';
import ColorComponentsFactory from './colorinput/colorcomponents/Factory';
import SplitPanelsFactory from './splitpanels/Factory';
import SidesFactory from './sides/Factory';
import TweakerFactory from './tweaker/Factory';

import ClickFactory from './click/Factory';
import ClickOutsideFactory from './clickoutside/Factory';
import InTouchingFactory from './intouching/Factory';
import TapFactory from './tap/Factory';
import PressFactory from './press/Factory';
import SwipeFactory from './swipe/Factory';
import PanFactory from './pan/Factory';
import DragFactory from './drag/Factory';
import PinchFactory from './pinch/Factory';
import RotateFactory from './rotate/Factory';
import FlipFactory from './flip/Factory';
import ShakeFactory from './shake/Factory';
import TouchEventStopFactory from './toucheventstop/Factory';
import PerspectiveFactory from './perspective/Factory';
import SkewFactory from './skew/Factory';
import AnchorFactory from './anchor/Factory';
import TextTypingFactory from './texttyping/Factory';
import TextPageFactory from './textpage/Factory';
import TextEditFactory from './textedit/Factory';
import FullscreenButtonFactory from './fullscreenbutton/Factory';

import LayerManagerFactory from './layermanager/Factory';

import { GetParentSizer, GetTopmostSizer } from './utils/GetParentSizer';
import RemoveFromParent from './utils/RemoveFromParent';
import IsPointerInBounds from '../../plugins/utils/input/IsPointerInBounds';
import { Show, Hide, IsShown, } from './utils/Hide';
import ConfirmAction from './confirmdialog/ConfirmAction';
import ConfirmActionPromise from './confirmdialog/ConfirmActionPromise';
import Edit from './textedit/Edit';
import WrapExpandText from './utils/wrapexpandtext/WrapExpandText';
import FontSizeExpandText from './utils/fontsizeexpandtext/FontSizeExpandText';
import SetFontSizeToFitWidth from '../../plugins/utils/text/fontsizefit/FontSizeFit';
import { WaitEvent, WaitComplete } from './utils/WaitEvent';
import Delay from '../../plugins/utils/promise/Delay';
import GetViewport from '../../plugins/utils/system/GetViewport';
import SetChildrenInteractive from './utils/setchildreninteractive/SetChildrenInteractive';
import { FadeIn, FadeOutDestroy } from './fade/Fade';
import { EaseMoveTo, EaseMoveFrom } from './easemove/EaseMove'
import { Modal, ModalPromise, ModalClose } from './modal/Modal';
import RequestDrag from '../../plugins/utils/input/RequestDrag';
import { OpenFileChooser } from './filechooser/FileChooser';


import { Plugins as PhaserPlugins } from 'phaser';
class UIPlugin extends PhaserPlugins.ScenePlugin {
    add: any;
    scene: any;

    constructor(scene?: any, pluginManager?: any) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }

    boot() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.add.destroy();
        super.destroy();
    }

    isInTouching(gameObject?: any, pointer?: any, preTest?: any, postTest?: any) {
        if (!gameObject.visible) {
            return false;
        }
        return IsPointerInBounds(gameObject, pointer, preTest, postTest);
    }

    get viewport() {
        return GetViewport(this.scene, this.scene.cameras.main, true);
    }

}

var methods = {
    getParentSizer: GetParentSizer,
    getTopmostSizer: GetTopmostSizer,
    removeFromParent: RemoveFromParent,
    hide: Hide,
    show: Show,
    isShown: IsShown,
    confirmAction: ConfirmAction,
    confirmActionPromise: ConfirmActionPromise,
    edit: Edit,
    wrapExpandText: WrapExpandText,
    fontSizeExpandText: FontSizeExpandText,
    fontSizeResize: SetFontSizeToFitWidth,  // Backward compatibility
    setFontSizeToFitWidth: SetFontSizeToFitWidth,
    waitEvent: WaitEvent,
    waitComplete: WaitComplete,
    delayPromise: Delay,
    setChildrenInteractive: SetChildrenInteractive,
    fadeIn: FadeIn,
    fadeOutDestroy: FadeOutDestroy,
    easeMoveTo: EaseMoveTo,
    easeMoveFrom: EaseMoveFrom,
    modal: Modal,
    modalPromise: ModalPromise,
    modalClose: ModalClose,
    requestDrag: RequestDrag,
    openFileChooser: OpenFileChooser,
}

Object.assign(
    UIPlugin.prototype,
    methods
);


export default UIPlugin;