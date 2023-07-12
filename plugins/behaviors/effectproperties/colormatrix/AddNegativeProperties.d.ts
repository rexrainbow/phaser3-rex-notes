export default AddNegativeProperties;

declare namespace AddNegativeProperties {
    interface NegativeGameObject extends Phaser.GameObjects.GameObject {
        negative: null | boolean;
    }
}

declare function AddNegativeProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddNegativeProperties.NegativeGameObject;
