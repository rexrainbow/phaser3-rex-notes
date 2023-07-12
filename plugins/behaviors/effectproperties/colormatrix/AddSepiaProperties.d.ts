export default AddSepiaProperties;

declare namespace AddSepiaProperties {
    interface SepiaGameObject extends Phaser.GameObjects.GameObject {
        sepia: null | boolean;
    }
}

declare function AddSepiaProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddSepiaProperties.SepiaGameObject;
