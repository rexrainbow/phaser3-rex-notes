import ComponentBase from '../../utils/componentbase/ComponentBase';
import PinchZoom from '../pinchzoom/PinchZoom';
import PanScroll from '../panscroll/PanScroll';
import BoundsScroll from '../boundsscroll/BoundsScroll';
import MouseWheelZoom from '../mousewheelzoom/MouseWheelZoom';

declare namespace ControllerPack {
    /**
     * Combined configuration options for all camera controllers.
     */
    interface IConfig extends PinchZoom.IConfig, PanScroll.IConfig, BoundsScroll.IConfig, MouseWheelZoom.IConfig {
        /**
         * Shared minimum zoom value.
         */
        minZoom?: number,
        /**
         * Shared maximum zoom value.
         */
        maxZoom?: number,

        /**
         * Set to true to create the pan scroll controller.
         */
        panScroll?: boolean,
        /**
         * Initial enabled state of pan scroll controller.
         */
        panScrollEnable?: boolean,

        /**
         * Set to true to create the pinch zoom controller.
         */
        pinchZoom?: boolean,
        /**
         * Initial enabled state of pinch zoom controller.
         */
        pinchZoomEnable?: boolean,
        /**
         * Minimum zoom of pinch zoom controller.
         */
        pinchZoomMin?: number,
        /**
         * Maximum zoom of pinch zoom controller.
         */
        pinchZoomMax?: number,
        /**
         * Focus mode of pinch zoom controller.
         */
        pinchZoomFocusEnable?: boolean,

        /**
         * Set to true to create the bounds scroll controller.
         */
        boundsScroll?: boolean,
        /**
         * Initial enabled state of bounds scroll controller.
         */
        boundsScrollEnable?: boolean,

        /**
         * Set to true to create the mouse wheel zoom controller.
         */
        mouseWheelZoom?: boolean,
        /**
         * Initial enabled state of mouse wheel zoom controller.
         */
        mouseWheelZoomEnable?: boolean,
        /**
         * Zoom step used by mouse wheel zoom controller.
         */
        mouseWheelZoomStep?: number,
        /**
         * Minimum zoom of mouse wheel zoom controller.
         */
        mouseWheelZoomMin?: number,
        /**
         * Maximum zoom of mouse wheel zoom controller.
         */
        mouseWheelZoomMax?: number,

        /**
         * Set to true to enable the whole controller pack.
         */
        enable?: boolean,

    }
}

/**
 * Aggregates pan, pinch, bounds, and wheel camera controllers.
 */
declare class ControllerPack extends ComponentBase {
    /**
     * Create a camera controller pack.
     *
     * @param scene - Scene that owns this controller pack.
     * @param config - Optional combined configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ControllerPack.IConfig
    );

    /**
     * Enable or disable all enabled sub-controllers.
     *
     * @param enable - True to enable, false to disable.
     * @returns This controller pack.
     */
    setEnable(enable?: boolean): this;
    /**
     * Toggle global enabled state.
     *
     * @returns This controller pack.
     */
    toggleEnable(): this;
    /**
     * Current global enabled state.
     */
    enable: boolean;

    /**
     * Set target camera instance for all sub-controllers.
     *
     * @param camera - Camera to control.
     * @returns This controller pack.
     */
    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    /**
     * Current target camera.
     */
    camera?: Phaser.Cameras.Scene2D.Camera;

    /**
     * Enable or disable bounds scroll controller.
     *
     * @param enable - True to enable, false to disable.
     * @returns This controller pack.
     */
    setBoundsScrollEnable(enable?: boolean): this;
    /**
     * Bounds scroll enabled state.
     */
    boundsScrollEnable: boolean;

    /**
     * Enable or disable mouse wheel zoom controller.
     *
     * @param enable - True to enable, false to disable.
     * @returns This controller pack.
     */
    setMouseWheelZoomEnable(enable?: boolean): this;
    /**
     * Mouse wheel zoom enabled state.
     */
    mouseWheelZoomEnable: boolean;

    /**
     * Enable or disable pinch zoom controller.
     *
     * @param enable - True to enable, false to disable.
     * @returns This controller pack.
     */
    setPinchZoomEnable(enable?: boolean): this;
    /**
     * Pinch zoom enabled state.
     */
    pinchZoomEnable: boolean;
    /**
     * True while pinch gesture is active.
     */
    readonly isPinching: boolean;

    /**
     * Enable or disable pan scroll controller.
     *
     * @param enable - True to enable, false to disable.
     * @returns This controller pack.
     */
    setPanScrollEnable(enable?: boolean): this;
    /**
     * Pan scroll enabled state.
     */
    panScrollEnable: boolean;
    /**
     * True while pan gesture is active.
     */
    readonly isPanning: boolean;

}

export default ControllerPack;
