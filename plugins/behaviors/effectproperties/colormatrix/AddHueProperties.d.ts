export default AddHueProperties;

declare namespace AddHueProperties {
    interface HueGameObject extends Phaser.GameObjects.GameObject {
        hue: number | null | false;
    }
}

declare function AddHueProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddHueProperties.HueGameObject;
