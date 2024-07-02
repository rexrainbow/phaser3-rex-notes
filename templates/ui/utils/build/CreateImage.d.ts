import StatesImage from '../../statesimage/StatesImage';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice';
import StatesNinePatch from '../../statesninepatch/StatesNinePatch';
import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle';

export default CreateImage;

declare namespace CreateImage {

    interface IImage extends StatesImage.IConfig {
        alpha?: number,
        tint?: number,
        flipX?: boolean, flipY?: boolean,
        origin?: number, originX?: number, originY?: number,
    }

    interface INineSlice extends StatesNineSlice.IConfig {
        alpha?: number,
        tint?: number,
        origin?: number, originX?: number, originY?: number,
    }

    interface IRoundRectangle extends StatesRoundRectangle.IConfig {
        alpha?: number,
        origin?: number, originX?: number, originY?: number,
    }

    interface INinePatch extends StatesNinePatch.IConfig {
        alpha?: number,
        tint?: number,
        origin?: number, originX?: number, originY?: number,
    }

    type IConfig = IImage | INineSlice | IRoundRectangle | INinePatch;
}

declare function CreateImage(
    scene: Phaser.Scene,
    config?: CreateImage.IConfig,
): StatesImage;