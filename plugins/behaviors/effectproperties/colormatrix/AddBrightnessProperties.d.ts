export default AddBrightnessProperties;

declare namespace AddBrightnessProperties {
    interface BrightnessGameObject extends Phaser.GameObjects.GameObject {
        brightness: number | null | false;
    }
}

declare function AddBrightnessProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBrightnessProperties.BrightnessGameObject;
