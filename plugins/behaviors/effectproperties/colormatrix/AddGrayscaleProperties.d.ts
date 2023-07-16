export default AddGrayscaleProperties;

declare namespace AddGrayscaleProperties {
    interface Grayscale {
        grayscale: number | null | false;
    }

    interface GrayscaleGameObject extends Grayscale, Phaser.GameObjects.GameObject {
        grayscale: number | null | false;
    }

    interface GrayscaleCamera extends Grayscale, Phaser.Cameras.Scene2D.BaseCamera {
        grayscale: number | null | false;
    }
}

declare function AddGrayscaleProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddGrayscaleProperties.GrayscaleGameObject;

declare function AddGrayscaleProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddGrayscaleProperties.GrayscaleCamera;