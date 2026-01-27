import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Anchor;

declare namespace Anchor {
    /**
     * Callback when the anchor resizes.
     */
    type OnResizeCallbackType = (
        /**
         * New width.
         */
        width: number,
        /**
         * New height.
         */
        height: number,
        /**
         * Target game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Anchor component.
         */
        anchor: Anchor
    ) => void;

    /**
     * Callback when viewport updates.
     */
    type OnUpdateViewportCallbackType = (
        /**
         * Viewport rectangle.
         */
        viewport: Phaser.Geom.Rectangle,
        /**
         * Target game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Anchor component.
         */
        anchor: Anchor
    ) => void;

    /**
     * Anchor configuration.
     */
    interface IConfig {
        /**
         * Left offset expression.
         */
        left?: string,
        /**
         * Right offset expression.
         */
        right?: string,
        /**
         * Center X expression.
         */
        centerX?: string,
        /**
         * X position expression.
         */
        x?: string,
        /**
         * Top offset expression.
         */
        top?: string,
        /**
         * Bottom offset expression.
         */
        bottom?: string,
        /**
         * Center Y expression.
         */
        centerY?: string,
        /**
         * Y position expression.
         */
        y?: string,

        /**
         * Width expression.
         */
        width?: string,
        /**
         * Height expression.
         */
        height?: string,
        /**
         * Aspect ratio setting.
         */
        aspectRatio?: boolean | number;

        /**
         * Resize callback.
         */
        onResizeCallback?: OnResizeCallbackType,
        /**
         * Resize callback scope.
         */
        onResizeCallbackScope?: unknown,

        /**
         * Viewport update callback.
         */
        onUpdateViewportCallback?: OnUpdateViewportCallbackType,
        /**
         * Viewport update callback scope.
         */
        onUpdateViewportCallbackScope?: unknown,

        /**
         * True to enable.
         */
        enable?: boolean
    }
}

/**
 * Anchor component for layouting a game object.
 */
declare class Anchor extends ComponentBase {
    /**
     * Create an Anchor component.
     * @param gameObject - Target game object.
     * @param config - Anchor configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Anchor.IConfig
    );

    /**
     * Reset from config.
     * @param config - Anchor configuration.
     * @returns This instance.
     */
    resetFromJSON(config: Anchor.IConfig): this;

    /**
     * Set viewport update callback.
     * @param callback - Viewport update callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    setUpdateViewportCallback(
        callback?: Anchor.OnUpdateViewportCallbackType,
        scope?: object
    ): this;

    /**
     * Apply anchoring immediately.
     * @returns This instance.
     */
    anchor(): this;

    /**
     * Enable or disable auto anchor.
     * @param enable - True to enable.
     * @returns This instance.
     */
    autoAnchor(enable?: boolean): this;
}
