// import * as Phaser from 'phaser';

import AnchorFactory from './anchor/Factory.js';
import BadgeLabelFactory from './badgelabel/Factory';
import BBCodeTextFactory from './bbcodetext/Factory';
import ButtonsFactory from './buttons/Factory';
import CanvasFactory from './canvas/Factory';
import CircleMaskImageFactory from './circlemaskimage/Factory';
import CircularProgressCanvasFactory from './circularprogresscanvas/Factory';
import CircularProgressFactory from './circularprogress/Factory';
import ClickFactory from './click/Factory';
import ContainerFactory from './container/Factory';
import CustomProgressFactory from './customprogress/Factory';
import CustomShapesFactory from './customshapes/Factory';
import DialogFactory from './dialog/Factory';
import DynamicTextFactory from './dynamictext/Factory';
import FlipFactory from './flip/Factory';
import FixWidthButtonsFactory from './fixwidthbuttons/Factory';
import FixWidthSizerFactory from './fixwidthsizer/Factory';
import GridButtonsFactory from './gridbuttons/Factory';
import GridSizerFactory from './gridsizer/Factory';
import GridTableFactory from './gridtable/Factory';
import KnobFactory from './knob/Factory';
import LabelFactory from './label/Factory';
import MenuFactory from './menu/Factory';
import NinePatchFactory from './ninepatch/Factory';
import NumberBarFactory from './numberbar/Factory';
import OverlapSizerFactory from './overlapsizer/Factory';
import PagesFactory from './pages/Factory';
import PanFactory from './pan/Factory';
import PerspectiveFactory from './perspective/Factory';
import PinchFactory from './pinch/Factory';
import PressFactory from './press/Factory';
import RotateFactory from './rotate/Factory';
import RoundRectangleCanvasFactory from './roundrectanglecanvas/Factory';
import RoundRectangleFactory from './roundrectangle/Factory';
import ScrollablePanelFactory from './scrollablepanel/Factory';
import SizerFactory from './sizer/Factory';
import SliderFactory from './slider/Factory';
import SwipeFactory from './swipe/Factory';
import TabsFactory from './tabs/Factory';
import TagTextFactory from './tagtext/Factory';
import TapFactory from './tap/Factory';
import TextAreaFactory from './textarea/Factory';
import TextBoxFactory from './textbox/Factory';
import TextPlayerFactory from './textplayer/Factory';
import ToastFactory from './toast/Factory';

import { Edit } from '../../plugins/textedit';
import { GetParentSizer, GetTopmostSizer } from './utils/GetParentSizer';
import { Show, Hide, IsShown, } from './utils/Hide';
import SetChildrenInteractive from './utils/setchildreninteractive/SetChildrenInteractive';
import { WaitEvent, WaitComplete } from './utils/WaitEvent';
import WrapExpandText from './utils/wrapexpandtext/WrapExpandText';

export default UIPlugins;

declare class Factories {
    anchor: typeof AnchorFactory;
    badgeLabel: typeof BadgeLabelFactory;
    BBCodeText: typeof BBCodeTextFactory;
    buttons: typeof ButtonsFactory;
    canvas: typeof CanvasFactory;
    circleMaskImage: typeof CircleMaskImageFactory;
    circularProgressCanvas: typeof CircularProgressCanvasFactory;
    circularProgress: typeof CircularProgressFactory;
    clickFactory: typeof ClickFactory;
    container: typeof ContainerFactory;
    customProgress: typeof CustomProgressFactory;
    customShapes: typeof CustomShapesFactory;
    dialog: typeof DialogFactory;
    dynamicTextFactory: typeof DynamicTextFactory;
    flip: typeof FlipFactory;
    fixWidthButtons: typeof FixWidthButtonsFactory;
    fixWidthSizer: typeof FixWidthSizerFactory;
    gridButtons: typeof GridButtonsFactory;
    gridSizer: typeof GridSizerFactory;
    gridTable: typeof GridTableFactory;
    knob: typeof KnobFactory;
    label: typeof LabelFactory;
    menu: typeof MenuFactory;
    ninePatch: typeof NinePatchFactory;
    numberBar: typeof NumberBarFactory;
    overlapSizer: typeof OverlapSizerFactory;
    pages: typeof PagesFactory;
    pan: typeof PanFactory;
    perspective: typeof PerspectiveFactory;
    pinch: typeof PinchFactory;
    press: typeof PressFactory;
    rotate: typeof RotateFactory;
    roundRectangleCanvas: typeof RoundRectangleCanvasFactory;
    roundRectangle: typeof RoundRectangleFactory;
    scrollablePanel: typeof ScrollablePanelFactory;
    sizer: typeof SizerFactory;
    slider: typeof SliderFactory;
    swipe: typeof SwipeFactory;
    tabs: typeof TabsFactory;
    tagText: typeof TagTextFactory;
    tap: typeof TapFactory;
    textArea: typeof TextAreaFactory;
    textBox: typeof TextBoxFactory;
    textPlayer: typeof TextPlayerFactory;
    toast: typeof ToastFactory;
}

declare class UIPlugins extends Phaser.Plugins.ScenePlugin {
    add: Factories;

    edit: typeof Edit;
    getParentSizer: typeof GetParentSizer;
    getTopmostSizer: typeof GetTopmostSizer;
    hide: typeof Hide;
    show: typeof Show;
    isShown: typeof IsShown;
    setChildrenInteractive: typeof SetChildrenInteractive;
    waitEvent: typeof WaitEvent;
    waitComplete: typeof WaitComplete;
    wrapExpandText: typeof WrapExpandText;

    isInTouching(
        gameObject: Phaser.GameObjects.GameObject,
        pointer?: Phaser.Input.Pointer,
        preTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
        postTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
    ): boolean;

    readonly viewport: Phaser.Geom.Rectangle;
}


import BadgeLabelClass from './badgelabel/BadgeLabel';
import BBCodeTextClass from './bbcodetext/BBCodeText';
import ButtonsClass from './buttons/Buttons';
import CanvasClass from './canvas/Canvas';
import CircleMaskImageClass from './circlemaskimage/CircleMaskImage';
import CircularProgressCanvasClass from './circularprogresscanvas/CircularProgressCanvas';
import CircularProgressClass from './circularprogress/CircularProgress';
import ClickClass from './click/Click';
import ContainerClass from './container/Container';
import CustomProgressClass from './customprogress/CustomProgress';
import CustomShapesClass from './customshapes/CustomShapes';
import DialogClass from './dialog/Dialog';
import DynamicTextClass from './dynamictext/DynamicText';
import FlipClass from './flip/Flip';
import FixWidthButtonsClass from './fixwidthbuttons/FixWidthButtons';
import FixWidthSizerClass from './fixwidthsizer/FixWidthSizer';
import GridButtonsClass from './gridbuttons/GridButtons';
import GridSizerClass from './gridsizer/GridSizer';
import GridTableClass from './gridtable/GridTable';
import KnobClass from './knob/Knob';
import LabelClass from './label/Label';
import MenuClass from './menu/Menu';
import NinePatchClass from './ninepatch/NinePatch';
import NumberBarClass from './numberbar/NumberBar';
import OverlapSizerClass from './overlapsizer/OverlapSizer';
import PagesClass from './pages/Pages';
import PanClass from './pan/Pan';
import PerspectiveClass from './perspective/Perspective';
import PinchClass from './pinch/Pinch';
import PressClass from './press/Press';
import RotateClass from './rotate/Rotate';
import RoundRectangleCanvasClass from './roundrectanglecanvas/RoundRectangleCanvas';
import RoundRectangleClass from './roundrectangle/RoundRectangle';
import ScrollablePanelClass from './scrollablepanel/ScrollablePanel';
import SizerClass from './sizer/Sizer';
import SliderClass from './slider/Slider';
import SwipeClass from './swipe/Swipe';
import TabsClass from './tabs/Tabs';
import TagTextClass from './tagtext/TagText';
import TapClass from './tap/Tap';
import TextAreaClass from './textarea/TextArea';
import TextBoxClass from './textbox/TextBox';
import TextPlayerClass from './textplayer/TextPlayer';
import ToastClass from './toast/Toast';

declare namespace UIPlugins {
    type BadgeLabel = BadgeLabelClass;
    type BBCodeText = BBCodeTextClass;
    type Buttons = ButtonsClass;
    type Canvas = CanvasClass;
    type CircleMaskImage = CircleMaskImageClass;
    type CircularProgressCanvas = CircularProgressCanvasClass;
    type CircularProgress = CircularProgressClass;
    type Click = ClickClass;
    type Container = ContainerClass;
    type CustomProgress = CustomProgressClass;
    type CustomShapes = CustomShapesClass;
    type Dialog = DialogClass;
    type DynamicText = DynamicTextClass;
    type Flip = FlipClass;
    type FixWidthButtons = FixWidthButtonsClass;
    type FixWidthSizer = FixWidthSizerClass;
    type GridButtons = GridButtonsClass;
    type GridSizer = GridSizerClass;
    type GridTable = GridTableClass;
    type Knob = KnobClass;
    type Label = LabelClass;
    type Menu = MenuClass;
    type NinePatch = NinePatchClass;
    type NumberBar = NumberBarClass;
    type OverlapSizer = OverlapSizerClass;
    type Pages = PagesClass;
    type Pan = PanClass;
    type Perspective = PerspectiveClass;
    type Pinch = PinchClass;
    type Press = PressClass;
    type Rotate = RotateClass;
    type RoundRectangleCanvas = RoundRectangleCanvasClass;
    type RoundRectangle = RoundRectangleClass;
    type ScrollablePanel = ScrollablePanelClass;
    type Sizer = SizerClass;
    type Slider = SliderClass;
    type Swipe = SwipeClass;
    type Tabs = TabsClass;
    type TagText = TagTextClass;
    type Tap = TapClass;
    type TextArea = TextAreaClass;
    type TextBox = TextBoxClass;
    type TextPlayer = TextPlayerClass;
    type Toast = ToastClass;
}