export default AddPixelateProperties;

declare namespace AddPixelateProperties {
    interface Pixelate {
        pixelate: number | null | false;
    }

    interface PixelateGameObject extends Pixelate, Phaser.GameObjects.GameObject {
    }

    interface PixelateCamera extends Pixelate, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddPixelateProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddPixelateProperties.PixelateGameObject;

declare function AddPixelateProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddPixelateProperties.PixelateCamera;