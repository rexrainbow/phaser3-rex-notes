export default AddBrightnessProperties;

declare namespace AddBrightnessProperties {
    interface Brightness {
        brightness: number | null | false;
    }

    interface BrightnessGameObject extends Brightness, Phaser.GameObjects.GameObject {
    }

    interface BrightnessCamera extends Brightness, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddBrightnessProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBrightnessProperties.BrightnessGameObject;

declare function AddBrightnessProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera,
): AddBrightnessProperties.BrightnessCamera;