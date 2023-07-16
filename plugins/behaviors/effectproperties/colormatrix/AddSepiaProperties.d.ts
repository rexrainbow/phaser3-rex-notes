export default AddSepiaProperties;

declare namespace AddSepiaProperties {
    interface Sepia {
        sepia: null | boolean;
    }

    interface SepiaGameObject extends Sepia, Phaser.GameObjects.GameObject {
    }

    interface SepiaCamera extends Sepia, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddSepiaProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddSepiaProperties.SepiaGameObject;

declare function AddSepiaProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddSepiaProperties.SepiaCamera;