export default AddVignetteProperties;

declare namespace AddVignetteProperties {
    interface Vignette {
        vignetteRadius: number | null | false;
        vignetteX: number;
        vignetteY: number;
        vignetteStrength: number;
    }

    interface VignetteGameObject extends Vignette, Phaser.GameObjects.GameObject {
    }

    interface VignetteCamera extends Vignette, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddVignetteProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddVignetteProperties.VignetteGameObject;

declare function AddVignetteProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddVignetteProperties.VignetteCamera;