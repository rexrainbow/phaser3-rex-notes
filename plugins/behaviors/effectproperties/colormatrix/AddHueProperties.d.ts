export default AddHueProperties;

declare namespace AddHueProperties {
    interface Hue {
        hue: number | null | false;
    }

    interface HueGameObject extends Hue, Phaser.GameObjects.GameObject {
    }

    interface HueCamera extends Hue, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddHueProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddHueProperties.HueGameObject;

declare function AddHueProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddHueProperties.HueCamera;