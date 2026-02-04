import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace BoundsScroll {
    /**
     * Configuration options for bounds-based camera scrolling.
     */
    interface IConfig {
        /**
         * Target camera, camera index, or camera name.
         */
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        /**
         * Set to true to enable bounds scrolling.
         */
        enable?: boolean,
    }
}

/**
 * Camera controller that keeps camera scrolling inside scene bounds.
 */
declare class BoundsScroll extends ComponentBase {
    /**
     * Create a bounds scroll controller.
     *
     * @param scene - Scene that owns this controller.
     * @param config - Optional controller configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: BoundsScroll.IConfig
    );

    /**
     * Enable or disable bounds scrolling.
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

}

export default BoundsScroll;
