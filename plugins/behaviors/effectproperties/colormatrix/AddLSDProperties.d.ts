export default AddLSDProperties;

declare namespace AddLSDProperties {
    interface LSD {
        lsd: null | boolean;
    }

    interface LSDGameObject extends LSD, Phaser.GameObjects.GameObject {
    }

    interface LSDCamera extends LSD, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddLSDProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddLSDProperties.LSDGameObject;

declare function AddLSDProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddLSDProperties.LSDCamera;