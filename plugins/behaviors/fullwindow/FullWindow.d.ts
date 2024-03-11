import ComponentBase from '../../utils/componentbase/ComponentBase';

export default FullWindow;

declare namespace FullWindow {
    interface IConfig {

    }
}

declare class FullWindow extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: FullWindow.IConfig
    );
}