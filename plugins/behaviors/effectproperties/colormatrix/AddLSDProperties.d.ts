export default AddLSDProperties;

declare namespace AddLSDProperties {
    interface LSDGameObject extends Phaser.GameObjects.GameObject {
        lsd: null | boolean;
    }
}

declare function AddLSDProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddLSDProperties.LSDGameObject;
