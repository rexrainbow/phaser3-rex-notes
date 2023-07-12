export default AddContrastProperties;

declare namespace AddContrastProperties {
    interface ContrastGameObject extends Phaser.GameObjects.GameObject {
        contrast: number | null | false;
    }
}

declare function AddContrastProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddContrastProperties.ContrastGameObject;
