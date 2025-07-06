import ComponentBase from '../../utils/componentbase/ComponentBase';

export default ClickboardToTexture;

declare namespace ClickboardToTexture {
}

declare class ClickboardToTexture extends ComponentBase {
    constructor(scene: Phaser.Scene);

    destroy(): void;

    saveTexture(
        key: string,
        onComplete?: () => void
    ): this;

    saveTexturePromise(
        key: string
    ): Promise<void>;

    releaseFile(): this;
}