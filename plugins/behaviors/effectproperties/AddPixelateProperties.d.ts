export default AddPixelateProperties;

declare namespace AddPixelateProperties {
    interface PixelateGameObject extends Phaser.GameObjects.GameObject {
        pixelate: number | null | false;
    }
}

declare function AddPixelateProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddPixelateProperties.PixelateGameObject;
