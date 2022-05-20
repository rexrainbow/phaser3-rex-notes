import RoundRectangle from '../../roundrectangle/RoundRectangle';
import NinePatch from '../../ninepatch/NinePatch';
import NinePatch2 from '../../ninepatch2/NinePatch';

import Sizer from '../../sizer/Sizer';
import Label from '../../label/Label';
import Slider from '../../slider/Slider';

export default Builders;

declare namespace Builders {
    type BuilderTypeCommon<T> = (
        scene: Phaser.Scene,
        config: Object | string,
        styles: Object | string,
        customBuilders: { [name: string]: BuilderType }
    ) => T;

    type BuilderType = BuilderTypeCommon<Phaser.GameObjects.GameObject>;
}

declare var Builders: {
    image: Builders.BuilderTypeCommon<Phaser.GameObjects.Image>,
    text: Builders.BuilderTypeCommon<Phaser.GameObjects.Text>,
    roundrectangle: Builders.BuilderTypeCommon<RoundRectangle>,
    ninepatch: Builders.BuilderTypeCommon<NinePatch>,
    ninepatch2: Builders.BuilderTypeCommon<NinePatch2>,

    sizer: Builders.BuilderTypeCommon<Sizer>,
    label: Builders.BuilderTypeCommon<Label>,
    slider: Builders.BuilderTypeCommon<Slider>,
}