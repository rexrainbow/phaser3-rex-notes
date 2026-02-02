// import * as Phaser from 'phaser';
import FaceContainer from '../utils/FaceContainer';
import Image from '../image/Image';
import RenderTexture from '../rendertexture/RenderTexture';

export default Card;

declare namespace Card {

    /**
     * Face selection type.
     */
    type FaceTypes = 0 | 1 | 'front' | 'back';

    /**
     * Face source definition.
     */
    type FaceDefType = {
        /**
         * Texture key.
         */
        key: string,
        /**
         * Optional texture frame key.
         */
        frame?: string
    } |
    {
        /**
         * Render texture width.
         */
        width: number,
        /**
         * Render texture height.
         */
        height: number
    } |
        Image |
        RenderTexture;

    /**
     * Card orientation type.
     */
    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'horizontal' | 'vertical';

    /**
     * Flip direction type.
     */
    type FlipDirTypes = 0 | 1 | 'right' | 'left' | 'left-to-right' | 'right-to-left';
    /**
     * Flip behavior configuration.
     */
    interface IConfigFlip {
        /**
         * Direction used when flipping from front to back.
         */
        frontToBack?: FlipDirTypes,
        /**
         * Direction used when flipping from back to front.
         */
        backToFront?: FlipDirTypes,
        /**
         * Flip duration in milliseconds.
         */
        duration?: number,
        /**
         * Easing function name.
         */
        ease?: string,
        /**
         * Delay before flip starts, in milliseconds.
         */
        delay?: number,
    }

    /**
     * Configuration for creating a perspective card.
     */
    interface IConfig {
        /**
         * World x position.
         */
        x?: number,
        /**
         * World y position.
         */
        y?: number,
        /**
         * Card width.
         */
        width?: number,
        /**
         * Card height.
         */
        height?: number,

        /**
         * Initial visible face.
         */
        face?: FaceTypes,
        /**
         * Back face definition.
         */
        back?: FaceDefType,
        /**
         * Front face definition.
         */
        front?: FaceDefType,

        /**
         * Flip orientation axis.
         */
        orientation?: OrientationTypes,

        /**
         * Flip configuration, or false to disable flip helper.
         */
        flip?: IConfigFlip | false,
    }

    namespace Events {
        /**
         * Callback fired when flip animation completes.
         */
        type FlipCompleteCallbackType = () => void;
    }

    /**
     * Flip animation helper of a Card instance.
     */
    class Flip extends Phaser.Events.EventEmitter {
        /**
         * Flip to the other face.
         *
         * @param duration - Flip duration in milliseconds.
         * @param repeat - Number of extra repeat flips.
         * @returns This flip helper instance.
         */
        flip(
            duration?: number,
            repeat?: number
        ): this;

        /**
         * Flip toward right direction.
         *
         * @param duration - Flip duration in milliseconds.
         * @param repeat - Number of extra repeat flips.
         * @returns This flip helper instance.
         */
        flipRight(
            duration?: number,
            repeat?: number
        ): this;

        /**
         * Flip toward left direction.
         *
         * @param duration - Flip duration in milliseconds.
         * @param repeat - Number of extra repeat flips.
         * @returns This flip helper instance.
         */
        flipLeft(
            duration?: number,
            repeat?: number
        ): this;

        /**
         * Stop current flip animation.
         *
         * @returns This flip helper instance.
         */
        stop(): this;

        /**
         * Set default flip duration.
         *
         * @param duration - Duration in milliseconds.
         * @returns This flip helper instance.
         */
        setDuration(duration: number): this;
        /**
         * Default flip duration in milliseconds.
         */
        duration: number;

        /**
         * Set easing function name.
         *
         * @param ease - Easing function name.
         * @returns This flip helper instance.
         */
        setEase(ease: string): this;
        /**
         * Easing function name.
         */
        ease: string;

        /**
         * Whether a flip animation is currently running.
         */
        readonly isRunning: boolean;
    }

}

/**
 * Perspective card game object with front and back faces.
 */
declare class Card extends FaceContainer {
    /**
     * Create a perspective card.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional card configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Card.IConfig
    );
    /**
     * Create a perspective card.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position or configuration object.
     * @param y - World y position.
     * @param config - Optional card configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number | Card.IConfig,
        y?: number,
        config?: Card.IConfig
    );

    /**
     * Set current visible face.
     *
     * @param face - Face to show.
     * @returns This card instance.
     */
    setFace(face: Card.FaceTypes): this;
    /**
     * Toggle current visible face.
     *
     * @returns This card instance.
     */
    toggleFace(): this;
    /**
     * Current face index.
     */
    face: number;

    /**
     * Front face object.
     */
    frontFace: Image | RenderTexture;
    /**
     * Back face object.
     */
    backFace: Image | RenderTexture;
    /**
     * Face map.
     */
    faces: {
        /**
         * Front face object.
         */
        front: Image | RenderTexture,
        /**
         * Back face object.
         */
        back: Image | RenderTexture,
    };

    /**
     * Optional flip animation helper.
     */
    flip: Card.Flip | undefined;
}
