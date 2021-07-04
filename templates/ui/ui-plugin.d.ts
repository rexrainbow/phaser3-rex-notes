import * as Phaser from 'phaser';

import BadgeLabelFactory from './badgelabel/Factory';
import BBCodeTextFactory from './bbcodetext/Factory';
import ButtonsFactory from './buttons/Factory';
import CanvasFactory from './canvas/Factory';
import CircleMaskImageFactory from './circlemaskimage/Factory';
import CircularProgressCanvasFactory from './circularprogresscanvas/Factory';
import CircularProgressFactory from './circularprogress/Factory';
import ClickFactory from './click/Factory';
import ContainerFactory from './container/Factory';
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

import Edit from '../../plugins/behaviors/textedit/Edit';
import { GetParentSizer, GetTopmostSizer } from './utils/GetParentSizer';
import { Show, Hide, IsShown, } from './utils/Hide';
import SetChildrenInteractive from './utils/setchildreninteractive/SetChildrenInteractive';
import { WaitEvent, WaitComplete } from './utils/WaitEvent';
import WrapExpandText from './utils/wrapexpandtext/WrapExpandText';

declare class Factories {
    badgeLabel: typeof BadgeLabelFactory;
    BBCodeText: typeof BBCodeTextFactory;
    buttons: typeof ButtonsFactory;
    canvas: typeof CanvasFactory;
    circleMaskImage: typeof CircleMaskImageFactory;
    circularProgressCanvas: typeof CircularProgressCanvasFactory;
    circularProgress: typeof CircularProgressFactory;
    clickFactory: typeof ClickFactory;
    container: typeof ContainerFactory;
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

export default class UIPlugin extends Phaser.Plugins.ScenePlugin {
    add: Factories;

    edit: Edit;
    getParentSizer: typeof GetParentSizer;
    getTopmostSizer: typeof GetTopmostSizer;
    hide: typeof Hide;
    show: typeof Show;
    isShown: typeof IsShown;
    setChildrenInteractive: SetChildrenInteractive;
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

// Export class definitions
import RoundRectangle from './roundrectangle/RoundRectangle';
import RoundRectangleCanvas from './roundrectanglecanvas/RoundRectangleCanvas';
import BBCodeText from './bbcodetext/BBCodeText';
import TagText from './tagtext/TagText';
import Container from './container/Container';
import Canvas from './canvas/Canvas';
import CircleMaskImage from './circlemaskimage/CircleMaskImage';
import DynamicText from './dynamictext/DynamicText';
import TextPlayer from './textplayer/TextPlayer';
import CircularProgressCanvas from './circularprogresscanvas/CircularProgressCanvas';
import CircularProgress from './circularprogress/CircularProgress';
import Knob from './knob/Knob';
import CustomShapes from './customshapes/CustomShapes';
import Chart from './chart/Chart';
import NinePatch from './ninepatch/NinePatch';

import Sizer from './sizer/Sizer';
import GridSizer from './gridsizer/GridSizer';
import FixWidthSizer from './fixwidthsizer/FixWidthSizer';
import OverlapSizer from './overlapsizer/OverlapSizer';

import Label from './label/Label';
import Buttons from './buttons/Buttons';
import GridButtons from './gridbuttons/GridButtons';
import FixWidthButtons from './fixwidthbuttons/FixWidthButtons';
import Dialog from './dialog/Dialog';
import Tabs from './tabs/Tabs';
import Slider from './slider/Slider';
import GridTable from './gridtable/GridTable';
import Menu from './menu/Menu';
import TextBox from './textbox/TextBox';
import NumberBar from './numberbar/NumberBar';
import BadgeLabel from './badgelabel/BadgeLabel';
import Pages from './pages/Pages';
import TextArea from './textarea/TextArea';
import ScrollablePanel from './scrollablepanel/ScrollablePanel';
import Toast from './toast/Toast';
import Sides from './sides/Sides';

import Click from './click/Click';
import Tap from './tap/Tap';
import Press from './press/Press';
import Swipe from './swipe/Swipe';
import Pan from './pan/Pan';
import Pinch from './pinch/Pinch';
import Rotate from './rotate/Rotate';
import Flip from './flip/Flip';
import Perspective from './perspective/Perspective';
import IsPointerInBounds from '../../plugins/utils/input/IsPointerInBounds';
import GetViewport from '../../plugins/utils/system/GetViewport';

export {
    RoundRectangle,
    RoundRectangleCanvas,
    BBCodeText,
    TagText,
    Container,
    Canvas,
    CircleMaskImage,
    DynamicText,
    TextPlayer,
    Chart,
    CircularProgressCanvas,
    CircularProgress,
    Knob,
    CustomShapes,
    NinePatch,

    Sizer,
    GridSizer,
    FixWidthSizer,
    OverlapSizer,

    Label,
    Buttons,
    GridButtons,
    FixWidthButtons,
    Dialog,
    Tabs,
    Slider,
    GridTable,
    Menu,
    TextBox,
    NumberBar,
    BadgeLabel,
    Pages,
    TextArea,
    ScrollablePanel,
    Toast,
    Sides,

    Click,
    Tap,
    Press,
    Swipe,
    Pan,
    Pinch,
    Rotate,
    Flip,
    Perspective,

    GetParentSizer,
    GetTopmostSizer,
    IsPointerInBounds,
    Show,
    Hide,
    IsShown,
    Edit,
    WrapExpandText,
    WaitEvent,
    WaitComplete,
    GetViewport,
    SetChildrenInteractive
}

import { GeomTypes as CustomShapesGeomTypes } from '../../plugins/customshapes';
export { CustomShapesGeomTypes };