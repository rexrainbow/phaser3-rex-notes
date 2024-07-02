import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice';
import StatesImage from '../../statesimage/StatesImage';
import StatesNinePatch from '../../statesninepatch/StatesNinePatch';

export default CreateBackground;

declare namespace CreateBackground {
    interface IRoundRectangle extends StatesRoundRectangle.IConfig {
        alpha?: number,
        origin?: number, originX?: number, originY?: number,
    }

    interface INineSlice extends StatesNineSlice.IConfig {
        alpha?: number,
        tint?: number,
        origin?: number, originX?: number, originY?: number,
    }

    interface IImage extends StatesImage.IConfig {
        alpha?: number,
        tint?: number,
        flipX?: boolean, flipY?: boolean,
        origin?: number, originX?: number, originY?: number,
    }

    interface INinePatch extends StatesNinePatch.IConfig {
        alpha?: number,
        tint?: number,
        origin?: number, originX?: number, originY?: number,
    }

    type IConfig = IRoundRectangle | INineSlice | IImage | INinePatch;
}

declare function CreateBackground(
    scene: Phaser.Scene,
    config?: CreateBackground.IConfig
): StatesRoundRectangle