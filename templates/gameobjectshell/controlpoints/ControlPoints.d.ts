import ContainerLite from '../../../plugins/containerlite.js';

export default ControlPoints;

declare namespace ControlPoints {
    /**
     * Callback used to create a control-point visual game object.
     */
    type CreateGameObjectCallbackType = (
        /**
         * Scene that owns the created game object.
         */
        scene: Phaser.Scene
    ) => Phaser.GameObjects.GameObject;

    /**
     * Visual configuration of the bounds rectangle.
     */
    interface IBoundsRectangleConfig {
        /**
         * Fill color.
         */
        color?: number,
        /**
         * Fill alpha.
         */
        alpha?: number,
        /**
         * Stroke color.
         */
        strokeColor?: number,
        /**
         * Stroke width.
         */
        strokeWidth?: number,
    }

    /**
     * Visual configuration of a control point.
     */
    interface IPointConfig {
        /**
         * Fill color.
         */
        color?: number,
        /**
         * Fill alpha.
         */
        alpha?: number,
        /**
         * Stroke color.
         */
        strokeColor?: number,
        /**
         * Stroke width.
         */
        strokeWidth?: number,
        /**
         * Point render size.
         */
        size?: number,
        /**
         * Point shape type.
         */
        shape?: 'rectangle' | 'circle'
    }

    /**
     * Configuration options of the control-points helper.
     */
    interface IConfig {
        /**
         * Bounds rectangle config or custom factory callback.
         */
        boundsRectangle?: IBoundsRectangleConfig | CreateGameObjectCallbackType,

        /**
         * Origin point config or custom factory callback.
         */
        originPoint?: IPointConfig | CreateGameObjectCallbackType,
        /**
         * Resize handle config or custom factory callback.
         */
        resizePoint?: IPointConfig | CreateGameObjectCallbackType,
        /**
         * Rotation handle config or custom factory callback.
         */
        rotationPoint?: IPointConfig | CreateGameObjectCallbackType,
    }
}

/**
 * Interactive helper container that displays control points around a target.
 */
declare class ControlPoints extends ContainerLite {
    /**
     * Create control points helper.
     *
     * @param scene - Scene that owns this helper.
     * @param config - Optional helper configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ControlPoints.IConfig
    );

    /**
     * Recalculate and apply control-points layout.
     *
     * @returns This helper instance.
     */
    layout(): this;

    /**
     * Bind this helper to a target game object.
     *
     * @param target - Target game object to control.
     * @returns This helper instance.
     */
    setBindingTarget(target?: Phaser.GameObjects.GameObject): this;

    /**
     * Get an internal element by mapped name.
     *
     * @param mapNameList - Element map name.
     * @returns Matched game object element.
     */
    getElement(mapNameList: string): Phaser.GameObjects.GameObject;
}
