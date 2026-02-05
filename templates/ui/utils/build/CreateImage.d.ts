import StatesImage from '../../statesimage/StatesImage';
import StatesNineSlice from '../../statesnineslice/StatesNineSlice';
import StatesNinePatch from '../../statesninepatch/StatesNinePatch';
import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle';

export default CreateImage;

declare namespace CreateImage {
    /**
     * Configuration for creating a state-aware image object.
     */
    interface IImage extends StatesImage.IConfig {
        /** Alpha value of the image. */
        alpha?: number,
        /** Tint color applied to the image. */
        tint?: number,
        /** Set to true to flip the image horizontally. */
        flipX?: boolean,
        /** Set to true to flip the image vertically. */
        flipY?: boolean,
        /** Uniform origin applied to both X and Y axes. */
        origin?: number,
        /** Origin value on the X axis. */
        originX?: number,
        /** Origin value on the Y axis. */
        originY?: number,
    }

    /**
     * Configuration for creating a state-aware nine-slice object.
     */
    interface INineSlice extends StatesNineSlice.IConfig {
        /** Alpha value of the nine-slice object. */
        alpha?: number,
        /** Tint color applied to the nine-slice object. */
        tint?: number,
        /** Uniform origin applied to both X and Y axes. */
        origin?: number,
        /** Origin value on the X axis. */
        originX?: number,
        /** Origin value on the Y axis. */
        originY?: number,
    }

    /**
     * Configuration for creating a state-aware round rectangle object.
     */
    interface IRoundRectangle extends StatesRoundRectangle.IConfig {
        /** Alpha value of the round rectangle object. */
        alpha?: number,
        /** Uniform origin applied to both X and Y axes. */
        origin?: number,
        /** Origin value on the X axis. */
        originX?: number,
        /** Origin value on the Y axis. */
        originY?: number,
    }

    /**
     * Configuration for creating a state-aware nine-patch object.
     */
    interface INinePatch extends StatesNinePatch.IConfig {
        /** Alpha value of the nine-patch object. */
        alpha?: number,
        /** Tint color applied to the nine-patch object. */
        tint?: number,
        /** Uniform origin applied to both X and Y axes. */
        origin?: number,
        /** Origin value on the X axis. */
        originX?: number,
        /** Origin value on the Y axis. */
        originY?: number,
    }

    /**
     * Supported configuration variants for creating an image-like object.
     */
    type IConfig = IImage | INineSlice | IRoundRectangle | INinePatch;
}

/**
 * Create an image-like game object from the provided configuration.
 *
 * @param scene - The Phaser scene that owns the created object.
 * @param config - Optional image configuration variant.
 * @returns The created state-aware image object.
 */
declare function CreateImage(
    scene: Phaser.Scene,
    config?: CreateImage.IConfig,
): StatesImage;
