export default AddContrastProperties;

declare namespace AddContrastProperties {
    interface Contrast {
        contrast: number | null | false;
    }

    interface ContrastGameObject extends Contrast, Phaser.GameObjects.GameObject {
    }

    interface ContrastCamera extends Contrast, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddContrastProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddContrastProperties.ContrastGameObject;

declare function AddContrastProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddContrastProperties.ContrastCamera;