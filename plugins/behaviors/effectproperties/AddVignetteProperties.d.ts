export default AddVignetteProperties;

declare namespace AddVignetteProperties {
    interface VignetteGameObject extends Phaser.GameObjects.GameObject {
        vignetteRadius: number | null | false;
        vignetteX: number;
        vignetteY: number;
        vignetteStrength: number;
    }
}

declare function AddVignetteProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddVignetteProperties.VignetteGameObject;
