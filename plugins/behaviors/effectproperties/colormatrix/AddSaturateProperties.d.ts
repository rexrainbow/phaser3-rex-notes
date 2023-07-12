export default AddSaturateProperties;

declare namespace AddSaturateProperties {
    interface SaturateGameObject extends Phaser.GameObjects.GameObject {
        saturate: number | null | false;
    }
}

declare function AddSaturateProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddSaturateProperties.SaturateGameObject;
