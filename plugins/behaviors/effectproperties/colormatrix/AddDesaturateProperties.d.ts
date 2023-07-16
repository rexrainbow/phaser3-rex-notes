export default AddDesaturateProperties;

declare namespace AddDesaturateProperties {
    interface Desaturate {
        desaturate: number | null | false;
    }

    interface DesaturateGameObject extends Desaturate, Phaser.GameObjects.GameObject {
    }

    interface DesaturateCamera extends Desaturate, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddDesaturateProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddDesaturateProperties.DesaturateGameObject;

declare function AddDesaturateProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddDesaturateProperties.DesaturateCamera;