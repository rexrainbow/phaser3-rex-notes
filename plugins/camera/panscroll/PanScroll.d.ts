import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace PanScroll {
    /**
     * Configuration options for drag-to-pan camera control.
     */
    interface IConfig {
        /**
         * Target camera, camera index, or camera name.
         */
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        /**
         * Set to true to enable pan scrolling.
         */
        enable?: boolean,

        /**
         * Input source used for drag events.
         */
        inputTarget?: Phaser.Scene | Phaser.GameObjects.GameObject,
    }
}

/**
 * Camera controller that pans camera by pointer dragging.
 */
declare class PanScroll extends ComponentBase {
    /**
     * Create a pan scroll controller.
     *
     * @param scene - Scene that owns this controller.
     * @param config - Optional controller configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: PanScroll.IConfig
    );

    /**
     * Enable or disable pan scrolling.
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
     * True while pointer dragging is actively panning camera.
     */
    readonly isPanning: boolean;
}

export default PanScroll;
