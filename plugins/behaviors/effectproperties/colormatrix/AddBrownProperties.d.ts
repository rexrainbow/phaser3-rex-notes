export default AddBrownProperties;

declare namespace AddBrownProperties {
    interface BrownGameObject extends Phaser.GameObjects.GameObject {
        brown: null | boolean;
    }
}

declare function AddBrownProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBrownProperties.BrownGameObject;
