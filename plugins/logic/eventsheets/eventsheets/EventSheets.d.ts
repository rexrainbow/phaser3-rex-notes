import EventSheetManager from '../eventsheetmanager/EventSheetManager';

export default EventSheets;

declare namespace EventSheets {
    /**
     * Configuration options for creating an EventSheets instance.
     */
    interface IConfig extends EventSheetManager.IConfig {

    }
}

/**
 * Event sheet manager bound to a Phaser Scene lifecycle.
 */
declare class EventSheets extends EventSheetManager {
    /**
     * Create EventSheets with scene and config.
     *
     * @param scene - Scene object.
     * @param config - Configuration options.
     */
    constructor(scene: unknown, config?: EventSheets.IConfig);
    /**
     * Create EventSheets with config only.
     *
     * @param config - Configuration options.
     */
    constructor(config?: EventSheets.IConfig);

    /**
     * Scene object passed to the constructor.
     */
    scene: unknown;

    /**
     * Bind scene lifecycle events.
     */
    boot(): void;

    /**
     * Shutdown the manager and unbind scene lifecycle events.
     *
     * @param fromScene - Whether shutdown was triggered from a Scene.
     * @returns This EventSheets instance.
     */
    shutdown(fromScene?: boolean): this;
}
