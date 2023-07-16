export default AddPolaroidProperties;

declare namespace AddPolaroidProperties {
    interface Polaroid {
        polaroid: null | boolean;
    }

    interface PolaroidGameObject extends Polaroid, Phaser.GameObjects.GameObject {
    }

    interface PolaroidCamera extends Polaroid, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddPolaroidProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddPolaroidProperties.PolaroidGameObject;

declare function AddPolaroidProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddPolaroidProperties.PolaroidCamera;