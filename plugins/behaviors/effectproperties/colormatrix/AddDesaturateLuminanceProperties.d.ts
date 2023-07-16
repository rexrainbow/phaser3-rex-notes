export default AddDesaturateLuminanceProperties;

declare namespace AddDesaturateLuminanceProperties {
    interface DesaturateLuminance {
        desaturateLuminance: null | boolean;
    }

    interface DesaturateLuminanceGameObject extends DesaturateLuminance, Phaser.GameObjects.GameObject {
    }

    interface DesaturateCamera extends DesaturateLuminance, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddDesaturateLuminanceProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddDesaturateLuminanceProperties.DesaturateLuminanceGameObject;

declare function AddDesaturateLuminanceProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddDesaturateLuminanceProperties.DesaturateCamera;