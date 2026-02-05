import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace MouseWheelZoom {
    /**
     * Configuration options for mouse-wheel zoom control.
     */
    interface IConfig {
        /**
         * Target camera, camera index, or camera name.
         */
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        /**
         * Zoom delta applied per mouse-wheel step.
         */
        zoomStep?: number,
        /**
         * Zoom easing duration in milliseconds.
         */
        easeDuration?: number,

        /**
         * Minimum allowed zoom value.
         */
        minZoom?: number,
        /**
         * Maximum allowed zoom value.
         */
        maxZoom?: number,

        /**
         * Set to true to enable mouse-wheel zoom.
         */
        enable?: boolean,
    }
}

/**
 * Camera controller that zooms camera by mouse wheel input.
 */
declare class MouseWheelZoom extends ComponentBase {
    /**
     * Create a mouse-wheel zoom controller.
     *
     * @param scene - Scene that owns this controller.
     * @param config - Optional controller configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: MouseWheelZoom.IConfig
    );

    /**
     * Enable or disable mouse-wheel zoom.
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
     * Reset camera zoom to default level.
     *
     * @returns This controller instance.
     */
    resetZoomLevel(): this;

    /**
     * Set minimum zoom constraint.
     *
     * @param value - Minimum zoom value.
     * @returns This controller instance.
     */
    setMinZoom(value?: number): this;
    /**
     * Minimum zoom constraint.
     */
    minZoom: number;

    /**
     * Set maximum zoom constraint.
     *
     * @param value - Maximum zoom value.
     * @returns This controller instance.
     */
    setMaxZoom(value?: number): this;
    /**
     * Maximum zoom constraint.
     */
    maxZoom: number;

}

export default MouseWheelZoom;
