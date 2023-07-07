export default AddGlowProperties;

declare namespace AddGlowProperties {
    interface GlowGameObject extends Phaser.GameObjects.GameObject {
        glowColor: number | null | false;
        glowOuterStrength: number;
        glowInnerStrength: number;
    }
}

declare function AddGlowProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddGlowProperties.GlowGameObject;
