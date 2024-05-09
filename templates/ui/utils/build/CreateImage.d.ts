import StatesImage from '../../statesimage/StatesImage';

export default CreateImage;

declare namespace CreateImage {
    interface IConfig extends StatesImage.IConfig {
        alpha?: number,
        tint?: number,
        flipX?: boolean, flipY?: boolean,
        origin?: number, originX?: number, originY?: number,
    }
}

declare function CreateImage(
    scene: Phaser.Scene,
    config?: CreateImage.IConfig,
): StatesImage;