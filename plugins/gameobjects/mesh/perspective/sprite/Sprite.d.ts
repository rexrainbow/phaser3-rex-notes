// import * as Phaser from 'phaser';
import RenderTexture from '../rendertexture/RenderTexture';

export default Sprite;

declare namespace Sprite {

    interface IConfig extends RenderTexture.IConfig {
    }

}

declare class Sprite extends RenderTexture {
    constructor(
        scene: Phaser.Scene,
        x?: number | Sprite.IConfig,
        y?: number,
        key?: string,
        frame?: string | null,
        config?: Sprite.IConfig
    )
}
