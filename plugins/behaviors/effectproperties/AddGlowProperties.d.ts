export default AddGlowProperties;

declare namespace AddGlowProperties {
    interface Glow {
        glowColor: number | null | false;
        glowOuterStrength: number;
        glowInnerStrength: number;
    }

    interface GlowGameObject extends Glow, Phaser.GameObjects.GameObject {
    }

    interface GlowCamera extends Glow, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddGlowProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddGlowProperties.GlowGameObject;

declare function AddGlowProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddGlowProperties.GlowCamera;