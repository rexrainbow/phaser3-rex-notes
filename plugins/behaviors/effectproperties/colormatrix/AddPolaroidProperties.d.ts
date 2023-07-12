export default AddPolaroidProperties;

declare namespace AddPolaroidProperties {
    interface PolaroidGameObject extends Phaser.GameObjects.GameObject {
        polaroid: null | boolean;
    }
}

declare function AddPolaroidProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddPolaroidProperties.PolaroidGameObject;
