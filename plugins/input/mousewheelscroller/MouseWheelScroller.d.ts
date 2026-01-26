import ComponentBase from '../../utils/componentbase/ComponentBase';

export default MouseWheelScroller;

declare namespace MouseWheelScroller {
    /**
     * MouseWheelScroller configuration.
     */
    interface IConfig {
        /**
         * Focus mode or target.
         */
        focus?: boolean | 0 | 1 | 2,
        /**
         * Scroll speed.
         */
        speed?: number,
        /**
         * True to enable.
         */
        enable?: boolean
    }

    namespace Events {
        /**
         * Scroll callback.
         */
        type ScrollCallbackType = (
            /**
             * Scroll increment.
             */
            inc: number,
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
            /**
             * MouseWheelScroller component.
             */
            scroller: MouseWheelScroller
        ) => void;
    }
}

/**
 * Mouse wheel scrolling component.
 */
declare class MouseWheelScroller extends ComponentBase {
    /**
     * Create a MouseWheelScroller component.
     * @param scene - The Scene to which this component belongs.
     * @param config - MouseWheelScroller configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: MouseWheelScroller.IConfig
    );

    /**
     * Set scroll speed.
     * @param speed - Speed value.
     * @returns This instance.
     */
    setSpeed(speed: number): this;
    /**
     * Scroll speed value.
     */
    speed: number;

    /**
     * Enable or disable scrolling.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * True if enabled.
     */
    enable: boolean;

    /**
     * Scroll by delta.
     * @param dy - Scroll delta.
     * @returns This instance.
     */
    scroll(dy: number): this;

}
