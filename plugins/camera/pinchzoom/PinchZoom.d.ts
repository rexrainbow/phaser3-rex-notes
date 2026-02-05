import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace PinchZoom {
    /**
     * Configuration options for pinch-to-zoom camera control.
     */
    interface IConfig {
        /**
         * Target camera, camera index, or camera name.
         */
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        /**
         * Set to true to enable pinch zoom.
         */
        enable?: boolean,
        /**
         * Minimum allowed zoom value.
         */
        minZoom?: number,
        /**
         * Maximum allowed zoom value.
         */
        maxZoom?: number,

        /**
         * Set to true to focus zoom around pinch center.
         */
        focusEnable?: boolean,

        /**
         * Input source used for pinch detection.
         */
        inputTarget?: Phaser.Scene | Phaser.GameObjects.GameObject,
    }
}

/**
 * Camera controller that zooms camera by multi-touch pinch gestures.
 */
declare class PinchZoom extends ComponentBase {
    /**
     * Create a pinch zoom controller.
     *
     * @param scene - Scene that owns this controller.
     * @param config - Optional controller configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: PinchZoom.IConfig
    );

    /**
     * Enable or disable pinch zoom.
     *
     * @param enable - True to enable, false to disable.
     * @returns This controller instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Current enabled state.
     */
    enable: boolean;

    /**
     * Set target camera instance.
     *
     * @param camera - Camera to control.
     * @returns This controller instance.
     */
    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    /**
     * Current target camera.
     */
    camera?: Phaser.Cameras.Scene2D.Camera;

    /**
     * True while a pinch gesture is active.
     */
    readonly isPinching: boolean;
}

export default PinchZoom;
