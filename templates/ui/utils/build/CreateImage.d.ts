import StatesImage from '../../statesimage/StatesImage';

export default CreateImage;

declare namespace CreateImage {
    interface IConfig extends StatesImage.IConfig {

    }
}

declare function CreateImage(
    scene: Phaser.Scene,
    config?: CreateImage.IConfig,
): StatesImage;