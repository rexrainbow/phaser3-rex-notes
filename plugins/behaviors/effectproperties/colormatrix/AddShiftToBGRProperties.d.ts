export default AddShiftToBGRProperties;

declare namespace AddShiftToBGRProperties {
    interface ShiftToBGR {
        shiftToBGR: null | boolean;
    }

    interface ShiftToBGRGameObject extends Phaser.GameObjects.GameObject {
    }

    interface ShiftToBGRCamera extends Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddShiftToBGRProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddShiftToBGRProperties.ShiftToBGRGameObject;

declare function AddShiftToBGRProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddShiftToBGRProperties.ShiftToBGRCamera;