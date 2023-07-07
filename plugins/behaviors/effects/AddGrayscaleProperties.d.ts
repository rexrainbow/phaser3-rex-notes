export default AddGrayscaleProperties;

declare namespace AddGrayscaleProperties {
    interface GrayscaleGameObject extends Phaser.GameObjects.GameObject {
        grayscale: number | null | false;
    }
}

declare function AddGrayscaleProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddGrayscaleProperties.GrayscaleGameObject;
