import ComponentBase from '../../utils/componentbase/ComponentBase';

export default FullWindow;

declare namespace FullWindow {
    /**
     * FullWindow configuration.
     */
    interface IConfig {

    }
}

/**
 * Full window layout component.
 */
declare class FullWindow extends ComponentBase {
    /**
     * Create a FullWindow component.
     * @param gameObject - Target game object.
     * @param config - FullWindow configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: FullWindow.IConfig
    );
}
