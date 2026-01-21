import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle';
import StatesBarRectangle from '../../statesbarrectangle/StatesBarRectangle';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice';
import StatesImage from '../../statesimage/StatesImage';
import StatesNinePatch from '../../statesninepatch/StatesNinePatch';

export default CreateBackground;

declare namespace CreateBackground {
    interface IRoundRectangle extends StatesRoundRectangle.IConfig {
        /**
         * Alpha value.
         */
        alpha?: number,
        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,
    }

    interface IBarRectangle extends StatesBarRectangle.IConfig {
        /**
         * Type tag for bar rectangles.
         */
        $type?: 'bar',
        /**
         * Alpha value.
         */
        alpha?: number,
        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,
    }

    interface INineSlice extends StatesNineSlice.IConfig {
        /**
         * Type tag for nine-slice.
         */
        $type?: 'nineSlice'
        /**
         * Alpha value.
         */
        alpha?: number,
        /**
         * Tint color.
         */
        tint?: number,
        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,
    }

    interface IImage extends StatesImage.IConfig {
        /**
         * Type tag for images.
         */
        $type?: 'image',
        /**
         * Alpha value.
         */
        alpha?: number,
        /**
         * Tint color.
         */
        tint?: number,
        /**
         * Flip horizontally.
         */
        flipX?: boolean,
        /**
         * Flip vertically.
         */
        flipY?: boolean,
        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,
    }

    interface INinePatch extends StatesNinePatch.IConfig {
        /**
         * Type tag for nine-patch.
         */
        $type?: 'nineSlice',
        /**
         * Alpha value.
         */
        alpha?: number,
        /**
         * Tint color.
         */
        tint?: number,
        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,
    }

    type IConfig = IRoundRectangle | IBarRectangle | INineSlice | IImage | INinePatch;
}

/**
 * Create a background game object based on config.
 * @param scene - The Scene to which this object belongs.
 * @param config - Background configuration.
 * @returns The created background object.
 */
declare function CreateBackground(
    scene: Phaser.Scene,
    config?: CreateBackground.IConfig
): StatesRoundRectangle
