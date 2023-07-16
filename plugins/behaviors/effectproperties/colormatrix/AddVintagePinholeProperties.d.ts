export default AddVintagePinholeProperties;

declare namespace AddVintagePinholeProperties {
    interface VintagePinhole {
        vintagePinhole: null | boolean;
    }

    interface VintagePinholeGameObject extends VintagePinhole, Phaser.GameObjects.GameObject {
    }

    interface VintagePinholeCamera extends VintagePinhole, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddVintagePinholeProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddVintagePinholeProperties.VintagePinholeGameObject;

declare function AddVintagePinholeProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddVintagePinholeProperties.VintagePinholeCamera;