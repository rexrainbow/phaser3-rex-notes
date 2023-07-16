export default AddSaturateProperties;

declare namespace AddSaturateProperties {
    interface Saturate {
        saturate: number | null | false;
    }

    interface SaturateGameObject extends Saturate, Phaser.GameObjects.GameObject {
    }

    interface SaturateCamera extends Saturate, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddSaturateProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddSaturateProperties.SaturateGameObject;

declare function AddSaturateProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddSaturateProperties.SaturateCamera;