import RoundRectangle from '../../roundrectangle/RoundRectangle';
import NinePatch from '../../ninepatch/NinePatch';
import NinePatch2 from '../../ninepatch2/NinePatch';

import Sizer from '../../sizer/Sizer';
import FixWidthSizer from '../../fixwidthsizer/FixWidthSizer';

import Label from '../../label/Label';
import Dialog from '../../dialog/Dialog';
import Buttons from '../../buttons/Buttons';
import Slider from '../../slider/Slider';

export default Builders;

declare namespace Builders {
    type BuilderTypeCommon<T> = (
        scene: Phaser.Scene,
        data: Object,
        view: Object,
        styles: Object,
        customBuilders: { [name: string]: BuilderType }
    ) => T;

    type BuilderType = BuilderTypeCommon<Phaser.GameObjects.GameObject>;
}

declare var Builders: {
    Image: Builders.BuilderTypeCommon<Phaser.GameObjects.Image>,
    Text: Builders.BuilderTypeCommon<Phaser.GameObjects.Text>,
    RoundRectangle: Builders.BuilderTypeCommon<RoundRectangle>,
    Ninepatch: Builders.BuilderTypeCommon<NinePatch>,
    Ninepatch2: Builders.BuilderTypeCommon<NinePatch2>,

    Sizer: Builders.BuilderTypeCommon<Sizer>,
    FixWidthSizer: Builders.BuilderTypeCommon<FixWidthSizer>,

    Label: Builders.BuilderTypeCommon<Label>,
    Dialog: Builders.BuilderTypeCommon<Dialog>,
    Buttons: Builders.BuilderTypeCommon<Buttons>,
    Slider: Builders.BuilderTypeCommon<Slider>,
}