import * as Phaser from 'phaser';

import BadgeLabelFactory from './badgelabel/Factory';
import BBCodeTextFactory from './bbcodetext/Factory';
import ButtonsFactory from './buttons/Factory';
import CanvasFactory from './canvas/Factory';
import CircleMaskImageFactory from './circlemaskimage/Factory';
import CircularProgressCanvasFactory from './circularprogresscanvas/Factory';
import CircularProgressFactory from './circularprogress/Factory';
import ContainerFactory from './container/Factory';
import DialogFactory from './dialog/Factory';
import FixWidthButtonsFactory from './fixwidthbuttons/Factory';
import FixWidthSizerFactory from './fixwidthsizer/Factory';
import KnobFactory from './knob/Factory';
import LabelFactory from './label/Factory';
import MenuFactory from './menu/Factory';
import NinePatchFactory from './ninepatch/Factory';
import NumberBarFactory from './numberbar/Factory';
import OverlapSizerFactory from './overlapsizer/Factory';
import PageFactory from './pages/Factory';
import RoundRectangleCanvasFactory from './roundrectanglecanvas/Factory';
import RoundRectangleFactory from './roundrectangle/Factory';
import SizerFactory from './sizer/Factory';
import TagTextFactory from './tagtext/Factory';
import TextBoxFactory from './textbox/Factory';
import ToastFactory from './toast/Factory';

export default class UIFactories {
    constructor(scene: Phaser.Scene);

    add: {
        badgeLabel: BadgeLabelFactory,
        BBCodeText: BBCodeTextFactory,
        buttons: ButtonsFactory,
        canvas: CanvasFactory,
        circleMaskImage: CircleMaskImageFactory,
        circularProgressCanvas: CircularProgressCanvasFactory,
        circularProgress: CircularProgressFactory,
        container: ContainerFactory,
        dialog: DialogFactory,
        fixWidthButtons: FixWidthButtonsFactory,
        fixWidthSizer: FixWidthSizerFactory,
        knob: KnobFactory,
        label: LabelFactory,
        menu: MenuFactory,
        ninePatch: NinePatchFactory,
        numberBar: NumberBarFactory,
        overlapSizer: OverlapSizerFactory,
        page: PageFactory,
        roundRectangleCanvas: RoundRectangleCanvasFactory,
        roundRectangle: RoundRectangleFactory,
        sizer: SizerFactory,
        tagText: TagTextFactory,
        textBox: TextBoxFactory,
        toast: ToastFactory,
    }
}