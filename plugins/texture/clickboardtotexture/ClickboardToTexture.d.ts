import ComponentBase from '../../utils/componentbase/ComponentBase';

export default ClickboardToTexture;

declare namespace ClickboardToTexture {
    interface IConfig {
        key?: string,
    }
}

declare class ClickboardToTexture extends ComponentBase {
    constructor(scene: Phaser.Scene, config?: ClickboardToTexture.IConfig);

    destroy(): void;

    setKey(key: string): this;

}