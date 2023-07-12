export default AddDesaturateLuminanceProperties;

declare namespace AddDesaturateLuminanceProperties {
    interface DesaturateLuminanceGameObject extends Phaser.GameObjects.GameObject {
        desaturateLuminance: null | boolean;
    }
}

declare function AddDesaturateLuminanceProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddDesaturateLuminanceProperties.DesaturateLuminanceGameObject;
