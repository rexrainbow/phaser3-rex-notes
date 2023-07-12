export default AddVintagePinholeProperties;

declare namespace AddVintagePinholeProperties {
    interface VintagePinholeGameObject extends Phaser.GameObjects.GameObject {
        vintagePinhole: null | boolean;
    }
}

declare function AddVintagePinholeProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddVintagePinholeProperties.VintagePinholeGameObject;
